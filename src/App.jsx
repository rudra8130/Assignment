import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Solutions from "./Components/Solutions";
import HelpBanner from "./Components/HelpBanner";
import PopularProducts from "./Components/Popularproducts";
import Projects from "./Components/Projects";
import WhyChoose from "./Components/Whychoose";
import LightingFooter from "./Components/Footer";

export default function App() {
  return (
    <>
      <Navbar active="Solutions" />
      <main>
        <Hero />
        <Solutions />
        <HelpBanner />
        <PopularProducts />
        <WhyChoose />
        <Projects />
      </main>

      <LightingFooter />
    </>
  );
}