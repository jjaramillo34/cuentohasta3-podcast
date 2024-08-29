import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const BlogCard = ({ image, title, excerpt }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h5 className="text-xl font-bold mb-2 text-[#F96303]">{title}</h5>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <a
        href="#"
        className="inline-flex items-center font-bold text-[#0bafe1] hover:text-[#FB640B] transition-colors"
      >
        LEER MÁS <ArrowRight size={16} className="ml-2" />
      </a>
    </div>
  </motion.div>
);

BlogCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string,
};

const OurBlog = () => {
  const blogPosts = [
    {
      image: "https://placehold.co/600x400.png",
      title: "Goodsound: ¿Qué es un Podcast? Aquí está...",
      excerpt:
        "Explora el mundo de los podcasts y descubre cómo esta forma de medio está revolucionando la manera en que consumimos contenido audio.",
    },
    {
      image: "https://placehold.co/600x400.png",
      title: "Moundy Rose: El estado del emprendimiento...",
      excerpt:
        "Un vistazo profundo al panorama actual del emprendimiento y cómo los podcasts están jugando un papel crucial en la educación empresarial.",
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          <motion.div
            className="lg:w-7/12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="lg:w-5/12 lg:pl-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col justify-center h-full">
              <span className="text-xl font-semibold text-[#0bafe1] mb-2">
                Nuestro Blog
              </span>
              <h3 className="text-4xl font-bold mb-4 text-[#F96303]">
                <span className="text-[#FB640B]">Últimas</span> Noticias Para Ti
              </h3>
              <p className="text-gray-600 mb-6">
                En nuestro blog, exploramos las últimas tendencias en el mundo
                de los podcasts educativos. Desde técnicas innovadoras de
                narración hasta consejos para mejorar la producción de audio,
                nuestros artículos están diseñados para inspirar y educar.
                <br />
                <br />
                Descubre cómo los podcasts están transformando la educación
                infantil y aprende estrategias para incorporar el aprendizaje
                auditivo en la vida diaria de los niños.
              </p>
              <motion.a
                href="#"
                className="inline-block bg-[#FB640B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#F96303] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                TODOS LOS BLOGS
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurBlog;
