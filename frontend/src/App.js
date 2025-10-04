import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ArtisticCreations from "./components/ArtisticCreations";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Sustainability from "./components/Sustainability";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App smooth-scroll">
      <Header />
      <Hero />
      <About />
      <Services />
      <ArtisticCreations />
      <Portfolio />
      <Testimonials />
      <Sustainability />
      <OurCompanies />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;