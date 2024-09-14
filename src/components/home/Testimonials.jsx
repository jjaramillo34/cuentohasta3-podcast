import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, QuoteIcon, Play, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactPlayer from "react-player/lazy";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const TestimonialCard = ({ rating, content, image, name, role, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.set(cardRef.current, { transformStyle: "preserve-3d" });
    gsap.set(contentRef.current, { backfaceVisibility: "hidden" });

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 20, rotationY: -180 },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: cardRef.current,
      }
    );
  }, []);

  const flipCard = () => {
    gsap.to(cardRef.current, {
      rotationY: showVideo ? 0 : 180,
      duration: 0.6,
      ease: "power1.inOut",
      onComplete: () => setShowVideo(!showVideo),
    });
  };

  return (
    <div
      ref={cardRef}
      className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden h-[400px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F96303] to-[#0bafe1]"></div>
      <div
        ref={contentRef}
        className="w-full h-full"
        style={{ backfaceVisibility: "hidden" }}
      >
        {!showVideo ? (
          <>
            <QuoteIcon size={40} className="text-[#FB640B] mb-4" />
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {content}
            </p>
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
                <Star
                  key={i}
                  size={20}
                  fill={colors.accent}
                  color={colors.accent}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ReactPlayer url={videoUrl} width="100%" height="100%" controls />
          </div>
        )}
      </div>
      {videoUrl && (
        <Button
          variant="outline"
          onClick={flipCard}
          className="absolute bottom-4 right-4 flex items-center gap-2"
        >
          <Play size={16} />
          {showVideo ? "Hide Video" : "Watch Video"}
        </Button>
      )}
    </div>
  );
};

TestimonialCard.propTypes = {
  rating: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  videoUrl: PropTypes.string,
};

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          fill={star <= rating ? colors.accent : "none"}
          color={colors.accent}
          className="cursor-pointer"
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
};

const TestimonialForm = () => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ rating, name, role, content });
    // Reset form
    setRating(0);
    setName("");
    setRole("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Nombre
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white">
          Rol
        </label>
        <Input
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="bg-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-white"
        >
          Tu Testimonio
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="bg-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">
          Calificación
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <Button
        type="submit"
        className="w-full bg-white text-[#F96303] hover:bg-white/90"
      >
        Enviar Testimonio
      </Button>
    </form>
  );
};

const FeaturedTestimonial = ({ testimonial }) => {
  const featuredRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      featuredRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={featuredRef}
      className="bg-gradient-to-r from-[#F96303] to-[#0bafe1] p-8 rounded-xl shadow-lg text-white mb-12 transform hover:scale-105 transition-transform duration-300"
    >
      <h3 className="text-2xl font-bold mb-4">Testimonio Destacado</h3>
      <div className="flex items-start gap-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white"
        />
        <div>
          <p className="text-lg mb-4 italic">"{testimonial.content}"</p>
          <p className="font-bold">{testimonial.name}</p>
          <p>{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
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
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        carouselRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5 },
        "-=0.3"
      );
  }, []);

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-100 to-gray-200"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" ref={titleRef}>
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
        </div>

        <FeaturedTestimonial testimonial={testimonials[0]} />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-2/3" ref={carouselRef}>
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
          </div>
          <div className="lg:w-1/3" ref={formRef}>
            <div className="bg-gradient-to-br from-[#F96303] to-[#FB640B] text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Comparte Tu Experiencia
              </h3>
              <p className="mb-6">
                ¿Has sido impactado por Cuentohasta3? Nos encantaría escuchar tu
                historia. Comparte tu testimonio y ayuda a inspirar a otros en
                su camino de crecimiento personal.
              </p>
              <TestimonialForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
