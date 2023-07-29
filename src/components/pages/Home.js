import React from "react";
import "../../App.css";
import Navbar from "../Navbar";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Services from "../Services";
import AboutUs from "../AboutUs";
import Comments from "../Comments";
import PhotoGallery from "../PhotoGallery";
import ContactUs from "../ContactUs";
import Footer from "../Footer";
import Category from "../CategoryButton";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Cards />
      <Category />
      <PhotoGallery />
      <Services />
      <AboutUs />
      <Comments />
      <ContactUs />
      <Footer />
    </>
  );
}
export default Home;
