import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, QuoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const TestimonialCard = ({ rating, content, image, name, role }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F96303] to-[#0bafe1]"></div>
    <QuoteIcon size={40} className="text-[#FB640B] mb-4" />
    <p className="text-gray-700 text-lg mb-6 leading-relaxed">{content}</p>
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-[#F96303]"
      />
      <div>
        <p className="font-bold text-lg text-[#F96303]">{name}</p>
        <p className="text-[#0bafe1]">{role}</p>
      </div>
    </div>
    <div className="flex mt-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={20} fill={colors.accent} color={colors.accent} />
      ))}
    </div>
  </motion.div>
);

TestimonialCard.propTypes = {
  rating: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

const TestimonialSection = () => {
  const testimonials = [
    {
      rating: 5,
      content:
        "Cuentohasta3 ha sido un salvavidas en mi relación. Sus consejos sobre comunicación efectiva han mejorado significativamente cómo mi pareja y yo resolvemos conflictos.",
      image: "https://placehold.co/600x400@2x.png",
      name: "Ana García",
      role: "Terapeuta de Pareja",
    },
    {
      rating: 5,
      content:
        "Como profesional en desarrollo personal, recomiendo Cuentohasta3 a todos mis clientes. Sus episodios sobre autoestima y crecimiento personal son verdaderamente transformadores.",
      image: "https://placehold.co/600x400@2x.png",
      name: "Carlos Rodríguez",
      role: "Coach de Vida",
    },
    {
      rating: 5,
      content:
        "Gracias a Cuentohasta3, he aprendido a manejar mejor el estrés laboral y a encontrar un equilibrio saludable entre mi trabajo y mi vida personal. ¡Es un cambio de juego!",
      image: "https://placehold.co/600x400@2x.png",
      name: "Laura Martínez",
      role: "Ejecutiva de Marketing",
    },
  ];

  return (
    <section className="py-20 bg-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xl font-semibold text-[#FB640B]">
            Testimonios
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-[#F96303]">
            Historias de <span className="text-[#0bafe1]">Transformación</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo Cuentohasta3 está ayudando a las personas a mejorar
            sus relaciones, desarrollar habilidades de comunicación y alcanzar
            un mayor bienestar personal.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="lg:w-2/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <TestimonialCard {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#F96303] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Únete a Nuestra Comunidad
              </h3>
              <p className="mb-6">
                Sé parte de una comunidad dedicada al crecimiento personal y las
                relaciones saludables. Cada semana, compartimos nuevos episodios
                llenos de consejos prácticos y perspectivas inspiradoras.
              </p>
              <Button className="bg-white text-[#F96303] hover:bg-[#FB640B] hover:text-white transition-colors duration-300">
                SUSCRÍBETE AHORA
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
