import CakeLayersReveal from "@/components/CakeLayersReveal";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-black">
      <HeroScrollAnimation />
      <CakeLayersReveal
        labels={[
          { title: "Porcelain plate", description: "The quiet foundation everything rests on." },
          { title: "Sponge cake", description: "A light crumb with a hint of dark roast." },
          { title: "Vanilla cream", description: "Whipped until it barely holds its shape." },
          { title: "Cherry topping", description: "The last thing you see, the first to lift." },
        ]}
      />  
      <section
        id="story"
        className="flex min-h-[50vh] scroll-mt-[var(--header-height)] flex-col items-center justify-center px-6 py-24 text-center text-stone-200"
      >
        <p className="text-xs tracking-[0.35em] uppercase text-amber-100/70">
          Our story
        </p>
        <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Roasted in small batches since the first pour.
        </h2>
      </section>
      <section
        id="visit"
        className="flex min-h-[50vh] scroll-mt-[var(--header-height)] flex-col items-center justify-center px-6 py-24 text-center text-stone-200"
      >
        <p className="text-xs tracking-[0.35em] uppercase text-amber-100/70">
          Visit
        </p>
        <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Come sit with the roast.
        </h2>
      </section>
    </div>
  );
}
