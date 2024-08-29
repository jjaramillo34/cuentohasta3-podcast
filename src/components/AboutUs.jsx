import React, { useState } from "react";
import { Play } from "lucide-react";
import VideoModal from "./common/VideoModal";
import { motion } from "framer-motion";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-16 bg-[#f4f4f4]">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={itemVariants}
          >
            <span
              className="text-xl font-semibold"
              style={{ color: colors.secondary }}
            >
              Sobre Nosotros
            </span>
            <h3 className="text-3xl font-bold leading-tight text-[#F96303]">
              Proporcionamos los{" "}
              <span style={{ color: colors.accent }}>Últimos</span> Podcasts
              Para Ti
            </h3>
            <p className="text-gray-600">
              En Cuentohasta3, nos apasiona explorar el fascinante mundo de los
              números y las matemáticas para niños pequeños y sus padres.
              Nuestro podcast ofrece contenido educativo y entretenido que
              fomenta el amor por el aprendizaje desde una edad temprana.
              <br />
              <br />
              Cada episodio está diseñado cuidadosamente para inspirar la
              curiosidad y desarrollar habilidades de pensamiento crítico, todo
              mientras nos divertimos contando hasta 3 y más allá.
            </p>
            <h5 className="text-xl font-bold" style={{ color: colors.primary }}>
              Escucha Nuestro Podcast En
            </h5>
            <motion.div className="flex space-x-4" variants={itemVariants}>
              {["youtube", "spotify", "podcast"].map((platform, index) => (
                <motion.img
                  key={index}
                  src={`/img/${platform}.png`}
                  alt={platform}
                  className="h-12"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <motion.div
              className="absolute top-0 right-0 bg-gradient-to-r from-[#F96303] to-[#FB640B] px-6 py-4 rounded-lg shadow-lg -mt-8 z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold m-0">
                  1<sup>er</sup>
                </h2>
                <p className="text-lg m-0">Año</p>
              </div>
            </motion.div>
            <motion.div
              className="relative mr-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0bafe1] opacity-70 rounded-lg"></div>
              <motion.div
                className="absolute inset-0 flex justify-center items-center z-10"
                whileHover={{ scale: 1.1 }}
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-[#F96303] rounded-full w-16 h-16 flex items-center justify-center hover:bg-[#FB640B] hover:text-white transition-colors"
                >
                  <Play size={32} />
                </button>
              </motion.div>
              <img
                src="/img/image.jpeg"
                alt="About Us"
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId="FK2RaJ1EfA8"
      />
    </section>
  );
};

export default AboutUs;
