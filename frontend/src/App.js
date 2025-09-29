import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Sustainability from "./components/Sustainability";
import OurCompanies from "./components/OurCompanies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Sustainability />
      <OurCompanies />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;