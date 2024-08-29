import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users, Headphones, Heart } from "lucide-react";
import VideoModal from "./common/VideoModal.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types";

const Hero = () => {
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

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const wordVariantsRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const AnimatedTitle = ({ text, className, variants }) => (
    <motion.span className={className} variants={textVariants}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={index % 2 === 0 ? wordVariants : wordVariantsRight}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.span>
  );

  const StatItem = ({ icon, number, text }) => (
    <div className="flex items-center space-x-4">
      <div className="bg-white rounded-full p-3">{icon}</div>
      <div>
        <h2 className="text-3xl font-bold m-0 text-white">
          {number.split("").map((char, index) =>
            char === "+" || char === "M" || char === "K" ? (
              <sup key={index} className="text-[#FB640B]">
                {char}
              </sup>
            ) : (
              char
            )
          )}
        </h2>
        <p className="text-lg m-0 text-white">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center pb-16"
        style={{ backgroundImage: "url('/img/image.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F96303] to-[#0bafe1] opacity-75"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="lg:w-1/2 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-lg">
                  <Users className="w-5 h-5 mr-2" /> Podcast Educativo
                </Badge>
                <Badge variant="secondary" className="text-lg">
                  <Users className="w-5 h-5 mr-2" /> Para Padres y Educadores
                </Badge>
              </div>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatedTitle text="Llevando el Podcast al" />
                <br />
                <AnimatedTitle
                  text="Siguiente Nivel"
                  className="text-[#FB640B]"
                  variants={wordVariantsRight}
                />
              </motion.h1>
              <motion.p className="text-xl mb-8" variants={itemVariants}>
                Descubre historias fascinantes sobre relaciones, amistades y
                crianza de niños en cada episodio de Cuentohasta3.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#FB640B] hover:bg-[#F96303]"
                  asChild
                >
                  <motion.a
                    href="#learn-more"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    SABER MÁS
                  </motion.a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-[#21B4E2] hover:bg-gray-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Play className="mr-2 h-4 w-4" /> EMPEZAR A ESCUCHAR
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="lg:w-1/2 mt-12 lg:mt-0 lg:pl-12"
              variants={itemVariants}
            >
              <img
                src="https://placehold.co/600x400@3x.png"
                alt="Cuentohasta3 Podcast"
                className="w-full rounded-lg shadow-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 right-0 bg-gray-700 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <StatItem
              icon={<Users className="w-8 h-8 text-[#F96303]" />}
              number="20M"
              text="Nuestros Suscriptores"
            />
            <StatItem
              icon={<Headphones className="w-8 h-8 text-[#F96303]" />}
              number="150+"
              text="Episodios de Podcast"
            />
            <StatItem
              icon={<Heart className="w-8 h-8 text-[#F96303]" />}
              number="83K"
              text="Nuestros Seguidores"
            />
          </motion.div>
        </div>
      </div>
      <div className="h-32 bg-white"></div> {/* Spacer for content below */}
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

Hero.propTypes = {
  icon: PropTypes.element.isRequired,
  number: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Hero;
