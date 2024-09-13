import Layout from "../components/Layout";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import FavoritePodcasts from "@/components/home/FavoritePodcasts";
import AboutUs from "@/components/home/AboutUs";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import Subscribe from "@/components/home/Subscribe";
import OurPartners from "@/components/home/OurPartners";
import OurBlog from "@/components/home/OurBlog";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <StatsSection />

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
