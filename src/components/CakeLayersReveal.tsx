"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type CakeLayerLabel = {
  title: string;
  description: string;
};

const LAYER_FILES = [
  "plate.png",
  "cake-layer.png",
  "cream.png",
  "topping.png",
] as const;

const OFFSETS = ["0px", "-7vh", "-16vh", "-28vh"] as const;
const ROTATIONS = [0, 2.2, -3.4, 4.8] as const;
const LABEL_SIDE: Array<"left" | "right"> = ["left", "right", "left", "right"];

type CakeLayersRevealProps = {
  labels: CakeLayerLabel[];
};

export default function CakeLayersReveal({ labels }: CakeLayersRevealProps) {
  const rootRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const desktopLabelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileLabelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const layers = layerRefs.current.filter(Boolean) as HTMLImageElement[];
      const desktopLabels = desktopLabelRefs.current;
      const mobileLabels = mobileLabelRefs.current;

      gsap.set([...desktopLabels, ...mobileLabels].filter(Boolean), {
        opacity: 0,
        y: 12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=300vh",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const order = [3, 2, 1, 0];
      order.forEach((index, step) => {
        const at = step * 0.7;
        if (index !== 0) {
          tl.to(
            layers[index],
            {
              y: OFFSETS[index],
              rotation: ROTATIONS[index],
              ease: "none",
              duration: 1,
            },
            at,
          );
        }
        const fadeAt = index === 0 ? at + 0.35 : at + 0.7;
        const fade = { opacity: 1, y: 0, duration: 0.35, ease: "none" };
        if (desktopLabels[index]) tl.to(desktopLabels[index], fade, fadeAt);
        if (mobileLabels[index]) tl.to(mobileLabels[index], fade, fadeAt);
      });
    }, root);

    return () => ctx.revert();
  }, [labels]);

  return (
    <section
      ref={rootRef}
      id="story"
      className="flex min-h-[50vh] scroll-mt-[var(--header-height)] flex-col items-center justify-center px-6 py-24 text-center text-stone-200"
      aria-label="Cake layers"
    > 
        <p className="text-xs tracking-[0.35em] uppercase text-amber-100/70">our story</p>
        <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-3xl">
          for those who love coffee & cake
        </h2>
      <div className="flex h-screen flex-col items-center justify-center gap-8 px-4 md:block md:px-8">
        <div className="relative mx-auto aspect-square w-[min(78vw,420px)] md:absolute md:top-1/2 md:left-1/2 md:w-[min(52vw,440px)] md:-translate-x-1/2 md:-translate-y-1/2">
          {LAYER_FILES.map((file, index) => (
            <img
              key={file}
              ref={(el) => {
                layerRefs.current[index] = el;
              }}
              src={`/images/cake-layers/${file}`}
              alt={labels[index]?.title ?? file.replace(".png", "")}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              style={{ zIndex: index + 1 }}
            />
          ))}

          {LAYER_FILES.map((_, index) => {
            const label = labels[index];
            if (!label) return null;
            const side = LABEL_SIDE[index];
            const top = `calc(50% + ${OFFSETS[index]})`;
            const isLeft = side === "left";

            return (
              <div
                key={label.title}
                className="pointer-events-none absolute hidden w-44 -translate-y-1/2 md:flex md:items-center md:gap-3 lg:w-56"
                style={{
                  top,
                  ...(isLeft
                    ? { right: "calc(100% + 8px)", flexDirection: "row-reverse" }
                    : { left: "calc(100% + 8px)" }),
                }}
              >
                <span className="h-px w-10 shrink-0 bg-white/45 lg:w-14" />
                <div
                  ref={(el) => {
                    desktopLabelRefs.current[index] = el;
                  }}
                  className={isLeft ? "text-right" : "text-left"}
                >
                  <p className="text-sm font-semibold tracking-wide">{label.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/70">{label.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 md:hidden">
          {[3, 2, 1, 0].map((index) => {
            const label = labels[index];
            if (!label) return null;
            return (
              <div
                key={label.title}
                ref={(el) => {
                  mobileLabelRefs.current[index] = el;
                }}
                className="border-l border-white/35 pl-3"
              >
                <p className="text-sm font-semibold">{label.title}</p>
                <p className="text-xs text-white/70">{label.description}</p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
