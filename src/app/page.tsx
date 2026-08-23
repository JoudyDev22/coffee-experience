import CakeLayersReveal from "@/components/CakeLayersReveal";
import Footer from "@/components/Footer";
import HeroScrollAnimation from "@/components/HeroScrollAnimation";
import LocationContact, { type WeekdayHours } from "@/components/LocationContact";
import MenuSlider from "@/components/MenuSlider";

const MENU_ITEMS = [
  { image: "/images/menu/espresso.jpg", name: "Espresso", price: "$3.50" },
  { image: "/images/menu/latte.jpg", name: "Latte", price: "$5.00" },
  { image: "/images/menu/cappuccino.jpg", name: "Cappuccino", price: "$4.75" },
  { image: "/images/menu/iced-coffee.jpg", name: "Iced Coffee", price: "$4.50" },
  { image: "/images/menu/jucie.jpg", name: "Jucie", price: "$3.50" },
  { image: "/images/menu/cake.jpg", name: "Cake", price: "$8.50" },
];

const HOURS: WeekdayHours[] = [
  { day: "Monday", weekday: 1, open: "07:00", close: "18:00" },
  { day: "Tuesday", weekday: 2, open: "07:00", close: "18:00" },
  { day: "Wednesday", weekday: 3, open: "07:00", close: "18:00" },
  { day: "Thursday", weekday: 4, open: "07:00", close: "18:00" },
  { day: "Friday", weekday: 5, open: "07:00", close: "20:00" },
  { day: "Saturday", weekday: 6, open: "08:00", close: "20:00" },
  { day: "Sunday", weekday: 0, open: null, close: null },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
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
        className="scroll-mt-[var(--header-height)] px-6 py-24"
      >
        <LocationContact
          hours={HOURS}
          address="142 Roast Lane, Portland, OR 97209"
          phone="+1 (503) 555-0142"
          socials={SOCIALS}
        />
      </section>
      <Footer hours={HOURS} socials={SOCIALS} />
    </div>
  );
}
