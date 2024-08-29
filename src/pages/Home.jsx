import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import FavoritePodcasts from "../components/FavoritePodcasts";
import AboutUs from "../components/AboutUs";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import Subscribe from "@/components/Subscribe";
import OurPartners from "@/components/OurPartners";
import OurBlog from "@/components/OurBlog";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <FavoritePodcasts />
      <AboutUs />
      {/* Add other sections as needed */}
      <Team />
      <Testimonials />
      <Subscribe />
      <OurPartners />
      <OurBlog />
    </Layout>
  );
};

export default Home;
