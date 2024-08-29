import React from "react";
import { motion } from "framer-motion";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const OurPartners = () => {
  const partners = [
    "logo-ipsum-1.png",
    "logo-ipsum-2.png",
    "logo-ipsum-3.png",
    "logo-ipsum-4.png",
    "logo-ipsum-5.png",
    "logo-ipsum-6.png",
  ];

  return (
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl font-semibold text-[#0bafe1]">
            Nuestros Colaboradores
          </span>
          <h3 className="text-3xl font-bold text-[#F96303]">
            En <span className="text-[#FB640B]">Colaboración</span> Con
          </h3>
          <p className="mx-auto text-gray-600 max-w-2xl">
            En Cuentohasta3, nos enorgullece trabajar con partners que comparten
            nuestra pasión por la educación infantil y las matemáticas. Juntos,
            creamos contenido innovador que inspira a los niños a amar el
            aprendizaje.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {partners.map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={`/img/${logo}`}
                alt={`Partner logo ${index + 1}`}
                className="mx-auto h-16 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartners;
