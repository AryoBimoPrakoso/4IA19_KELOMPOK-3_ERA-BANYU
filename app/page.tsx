import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Service from "./components/Service";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero/>
      <About/>
      <Service/>
      <Footer/>
    </div>
  );
}
