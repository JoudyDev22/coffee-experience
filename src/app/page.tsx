import CakeLayersReveal from "@/components/CakeLayersReveal";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";
import MenuSlider from "@/components/MenuSlider";

const MENU_ITEMS = [
  { image: "/images/menu/espresso.jpg", name: "Espresso", price: "$3.50" },
  { image: "/images/menu/latte.jpg", name: "Latte", price: "$5.00" },
  { image: "/images/menu/cappuccino.jpg", name: "Cappuccino", price: "$4.75" },
  { image: "/images/menu/iced-coffee.jpg", name: "Iced Coffee", price: "$4.50" },
  { image: "/images/menu/jucie.jpg", name: "Jucie", price: "$3.50" },
  { image: "/images/menu/cake.jpg", name: "Cake", price: "$8.50" },
];

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
       id="menu"
       className="scroll-mt-[var(--header-height)] overflow-hidden px-6 py-24 text-stone-200">
        <p className="text-center text-xs tracking-[0.35em] uppercase text-amber-100/70">
          Menu
        </p>
        <h2 className="mx-auto mt-4 max-w-lg text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          What we pour.
        </h2>
        <div className="mx-auto mt-12 max-w-6xl">
          <MenuSlider items={MENU_ITEMS} />
        </div>
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
