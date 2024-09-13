"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const partners = [
  {
    name: "EduTech Solutions",
    logo: "logo-ipsum-1.png",
    description:
      "Líderes en tecnología educativa, proporcionando herramientas innovadoras para el aprendizaje digital.",
    website: "https://www.edutechsolutions.com",
  },
  {
    name: "MathWizards",
    logo: "logo-ipsum-2.png",
    description:
      "Expertos en hacer que las matemáticas sean divertidas y accesibles para niños de todas las edades.",
    website: "https://www.mathwizards.com",
  },
  {
    name: "KidsTech",
    logo: "logo-ipsum-3.png",
    description:
      "Desarrolladores de aplicaciones educativas interactivas diseñadas específicamente para niños.",
    website: "https://www.kidstech.com",
  },
  {
    name: "LearnPlay Foundation",
    logo: "logo-ipsum-4.png",
    description:
      "Organización sin fines de lucro dedicada a promover el aprendizaje a través del juego.",
    website: "https://www.learnplayfoundation.org",
  },
  {
    name: "SmartStart Publishing",
    logo: "logo-ipsum-5.png",
    description:
      "Editores de libros educativos y materiales de aprendizaje innovadores para niños.",
    website: "https://www.smartstartpublishing.com",
  },
  {
    name: "BrainBoost Academy",
    logo: "logo-ipsum-6.png",
    description:
      "Plataforma de tutoría en línea que conecta a estudiantes con los mejores educadores.",
    website: "https://www.brainboostacademy.com",
  },
];

const PartnerSpotlight = ({ partner }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    gsap.from(spotlightRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: spotlightRef.current,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-6 flex items-center justify-center bg-gray-100">
          <img
            className="h-32 w-32 object-contain"
            src={`/img/${partner.logo}`}
            alt={partner.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-[#0bafe1] font-semibold">
            Socio Destacado
          </div>
          <a
            href={partner.website}
            className="block mt-1 text-2xl leading-tight font-bold text-[#F96303] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {partner.name}
          </a>
          <p className="mt-2 text-gray-600">{partner.description}</p>
          <div className="mt-4">
            <Button variant="outline" asChild>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visitar Sitio Web
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurPartners = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredPartner, setHoveredPartner] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const swiperRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const swiper = swiperRef.current;
    const cta = ctaRef.current;

    gsap.from(section, {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(title, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: title,
        start: "top bottom-=50",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(description, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: description,
        start: "top bottom-=50",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(swiper, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.4,
      ease: "elastic.out(1, 0.75)",
      scrollTrigger: {
        trigger: swiper,
        start: "top bottom-=50",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(cta, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: cta,
        start: "top bottom-=50",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section className="py-16 bg-gray-400" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <span className="text-xl font-semibold text-[#0bafe1]">
            Nuestros Colaboradores
          </span>
          <h3 className="text-3xl font-bold text-[#F96303]" ref={titleRef}>
            En <span className="text-[#FB640B]">Colaboración</span> Con
          </h3>
          <p className="mx-auto text-gray-600 max-w-2xl" ref={descriptionRef}>
            En Cuentohasta3, nos enorgullece trabajar con partners que comparten
            nuestra pasión por la educación infantil y las matemáticas. Juntos,
            creamos contenido innovador que inspira a los niños a amar el
            aprendizaje.
          </p>
        </div>

        <PartnerSpotlight partner={partners[0]} />

        <div className="mt-12" ref={swiperRef}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
            className="partner-swiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredPartner(partner)}
                  onHoverEnd={() => setHoveredPartner(null)}
                >
                  <img
                    src={`/img/${partner.logo}`}
                    alt={`${partner.name} logo`}
                    className="mx-auto h-16 object-contain"
                  />
                  <AnimatePresence>
                    {hoveredPartner === partner && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-2 text-center"
                      >
                        <p className="text-sm">{partner.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>

        <div className="mt-12 text-center" ref={ctaRef}>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#FB640B] text-white hover:bg-[#F96303]">
                Conviértete en Socio <Star className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Conviértete en Socio de Cuentohasta3</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <p>
                  Estamos siempre buscando nuevos socios que compartan nuestra
                  pasión por la educación infantil y las matemáticas. Si estás
                  interesado en colaborar con nosotros, por favor contáctanos a
                  través de:
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Email: partners@cuentohasta3.com</li>
                  <li>Teléfono: +34 123 456 789</li>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
