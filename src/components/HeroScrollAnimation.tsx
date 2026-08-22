"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 40;
const SCROLL_HEIGHT = "300vh";

function frameSrc(index: number) {
  return `/frames/ezgif-frame-${String(index).padStart(3, "0")}.png`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/** Draw an image "cover"-style so it fills the canvas without stretching. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
) {
  const dpr = window.devicePixelRatio || 1;
  const viewW = canvas.width / dpr;
  const viewH = canvas.height / dpr;
  const imgW = image.naturalWidth;
  const imgH = image.naturalHeight;

  if (!imgW || !imgH) return;

  const scale = Math.max(viewW / imgW, viewH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const dx = (viewW - drawW) / 2;
  const dy = (viewH - drawH) / 2;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, viewW, viewH);
  ctx.drawImage(image, dx, dy, drawW, drawH);
}

export default function HeroScrollAnimation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const progressPct = Math.round((loadedCount / FRAME_COUNT) * 100);

  // Size the canvas to its CSS box, accounting for devicePixelRatio.
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const { clientWidth, clientHeight } = canvas;
    const nextW = Math.max(1, Math.round(clientWidth * dpr));
    const nextH = Math.max(1, Math.round(clientHeight * dpr));

    if (canvas.width !== nextW || canvas.height !== nextH) {
      canvas.width = nextW;
      canvas.height = nextH;
    }

    const frame = framesRef.current[currentFrameRef.current];
    const ctx = canvas.getContext("2d");
    if (frame && ctx) drawCover(ctx, canvas, frame);
  };

  const drawProgress = (progress: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const frames = framesRef.current;
    if (!canvas || !ctx || frames.length === 0) return;

    const index = Math.round(
      Math.min(1, Math.max(0, progress)) * (frames.length - 1),
    );
    currentFrameRef.current = index;
    const frame = frames[index];
    if (frame) drawCover(ctx, canvas, frame);
  };

  useEffect(() => {
    let cancelled = false;

    async function preload() {
      const loaded: HTMLImageElement[] = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        try {
          const img = await loadImage(frameSrc(i));
          if (cancelled) return;
          loaded.push(img);
          setLoadedCount(loaded.length);
        } catch (err) {
          if (!cancelled) {
            setLoadError(err instanceof Error ? err.message : "Failed to load frames");
          }
          return;
        }
      }

      framesRef.current = loaded;
      setIsReady(true);
    }

    void preload();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !canvas || !overlay) return;

    resizeCanvas();
    drawProgress(0);

    const playback = { progress: 0 };

    // Scrub progress 0→1 against the tall wrapper so frames track scroll, not time.
    const tween = gsap.to(playback, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
      onUpdate: () => drawProgress(playback.progress),
    });

    // Headline / CTA fade in during the last ~25% of the sequence.
    gsap.set(overlay, { opacity: 0, y: 16 });
    const overlayTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const t = gsap.utils.clamp(0, 1, (self.progress - 0.75) / 0.25);
        gsap.set(overlay, { opacity: t, y: 16 * (1 - t) });
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(canvas);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      overlayTrigger.kill();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
    // resizeCanvas / drawProgress are stable enough for this mount cycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={wrapperRef}
      className="relative bg-black"
      style={{ height: SCROLL_HEIGHT }}
      aria-label="Product hero animation"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-hidden={!isReady}
        />

        {!isReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black text-stone-200">
            {loadError ? (
              <p className="max-w-md px-6 text-center text-sm text-red-300">
                {loadError}
              </p>
            ) : (
              <>
                <div
                  className="mb-5 h-10 w-10 animate-spin rounded-full border-2 border-stone-700 border-t-amber-200"
                  aria-hidden
                />
                <p className="text-sm tracking-widest uppercase text-stone-400">
                  Loading roast
                </p>
                <p className="mt-2 font-mono text-xs text-stone-500" aria-live="polite">
                  {progressPct}% · {loadedCount}/{FRAME_COUNT}
                </p>
              </>
            )}
          </div>
        )}

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent px-6 pb-20 text-center sm:pb-24"
          style={{ opacity: 0 }}
        >
          <p className="mb-3 text-xs tracking-[0.35em] uppercase text-amber-100/80">
            Single origin
          </p>
          <h1 className="max-w-xl font-sans text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Slow-roasted. Scroll to brew.
          </h1>
          <p className="mt-4 max-w-md text-base text-stone-300">
            Forty frames of the pour — pinned to your scroll, like an Apple product film.
          </p>
          <a
            href="#menu"
            className="pointer-events-auto mt-8 inline-flex h-12 items-center rounded-full bg-amber-100 px-7 text-sm font-medium text-stone-900 transition-colors hover:bg-white"
          >
            Explore the roast
          </a>
        </div>
      </div>
    </section>
  );
}
