import React, { useState } from "react";
import { Play, Mic, Heart, Users } from "lucide-react";
import VideoModal from "./common/VideoModal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  const features = [
    { icon: <Mic className="w-6 h-6" />, text: "Episodios Semanales" },
    { icon: <Heart className="w-6 h-6" />, text: "Consejos Prácticos" },
    { icon: <Users className="w-6 h-6" />, text: "Entrevistas con Expertos" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#f4f4f4] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={itemVariants}
          >
            <Badge variant="secondary" className="w-fit text-lg mb-2">
              Sobre Nosotros
            </Badge>
            <h2 className="text-4xl font-bold leading-tight text-[#F96303]">
              Navegando la Vida,{" "}
              <span className="text-[#FB640B]">Una Conversación</span> a la Vez
            </h2>
            <p className="text-gray-600 text-lg">
              En Cuentohasta3, nos apasiona explorar las complejidades de la
              vida moderna, las relaciones y el crecimiento personal. Nuestro
              podcast ofrece un espacio acogedor para discutir temas que
              realmente importan: desde cultivar amistades duraderas hasta
              navegar los desafíos del trabajo y el amor.
            </p>
            <p className="text-gray-600 text-lg">
              Cada episodio está diseñado cuidadosamente para inspirar, informar
              y acompañarte en tu viaje personal. Ya sea que estés buscando
              mejorar tus relaciones, desarrollar tu carrera o simplemente
              encontrar un equilibrio en la vida, Cuentohasta3 está aquí para
              apoyarte en cada paso del camino.
            </p>
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="bg-[#f4f4f4]">
                  <CardContent className="flex items-center p-4">
                    <div className="mr-4 text-[#FB640B]">{feature.icon}</div>
                    <p className="font-semibold">{feature.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <h5 className="text-xl font-bold text-[#F96303] mb-4">
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
            </div>
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <Card className="absolute top-0 right-0 bg-gradient-to-r from-[#F96303] to-[#FB640B] -mt-8 z-10">
              <CardContent className="p-6">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold m-0">
                    5<sup>to</sup>
                  </h2>
                  <p className="text-lg m-0">Año</p>
                </div>
              </CardContent>
            </Card>
            <motion.div
              className="relative mr-8 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0bafe1] opacity-70"></div>
              <motion.div
                className="absolute inset-0 flex justify-center items-center z-10"
                whileHover={{ scale: 1.1 }}
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full w-16 h-16 p-0"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Play className="w-8 h-8" />
                </Button>
              </motion.div>
              <img src="/img/image.jpeg" alt="About Us" className="w-full" />
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
