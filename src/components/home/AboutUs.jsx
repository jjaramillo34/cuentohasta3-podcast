"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Mic,
  Headphones,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import VideoModal from "../common/VideoModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const features = [
  { id: 1, icon: <Mic className="w-8 h-8" />, text: "Episodios Semanales" },
  {
    id: 2,
    icon: <Headphones className="w-8 h-8" />,
    text: "Variedad de Temas",
  },
  { id: 3, icon: <Users className="w-8 h-8" />, text: "Invitados Especiales" },
  { id: 4, icon: <Sparkles className="w-8 h-8" />, text: "Contenido Original" },
];

const timeline = [
  { id: 1, year: 2019, event: "Lanzamiento del podcast" },
  { id: 2, year: 2020, event: "Alcanzamos 10,000 oyentes" },
  { id: 3, year: 2021, event: "Primer episodio en vivo" },
  { id: 4, year: 2022, event: "Colaboración con expertos internacionales" },
  { id: 5, year: 2023, event: "Celebramos nuestro episodio #200" },
];

const descriptions = [
  "CuentaHasta3 es tu podcast semanal que explora una amplia gama de temas fascinantes.",
  "Desde ciencia y tecnología hasta arte y cultura, nuestro objetivo es satisfacer tu curiosidad.",
  "Expandimos tus horizontes con cada episodio, ofreciendo perspectivas únicas y entretenidas.",
  "Únete a nosotros en un viaje de descubrimiento, risa y aprendizaje cada semana.",
];

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      // Description text replacement animation
      const textAnimation = gsap.to(descriptionRef.current, {
        duration: 2,
        text: {
          value: descriptions[0],
          delimiter: " ",
        },
        ease: "none",
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
      });

      // Features animation
      gsap.from(featuresRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      });

      // Timeline animation
      const timelineItems = timelineRef.current.children;
      gsap.from(timelineItems, {
        opacity: 0,
        scale: 0.5,
        y: 50,
        stagger: 0.3,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
        onComplete: () => animateTimelineText(),
      });
    });

    return () => ctx.revert();
  }, []);

  const animateTimelineText = () => {
    timeline.forEach((item, index) => {
      const yearElement =
        timelineRef.current.children[index].querySelector(".year");
      const eventElement =
        timelineRef.current.children[index].querySelector(".event");

      gsap.to(yearElement, {
        duration: 0.5,
        text: item.year,
        ease: "none",
      });

      gsap.to(eventElement, {
        duration: 1,
        text: item.event,
        ease: "none",
        delay: 0.5,
      });
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-[#F96303] mb-12 text-center"
        >
          Sobre CuentaHasta3
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p
              ref={descriptionRef}
              className="text-xl mb-8 text-gray-700 leading-relaxed h-24"
            >
              {/* Text will be replaced by GSAP animation */}
            </p>
            <div className="grid grid-cols-2 gap-6" ref={featuresRef}>
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="bg-white border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <div className="text-[#F96303] mb-4">{feature.icon}</div>
                    <p className="text-center text-gray-700 font-semibold">
                      {feature.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative group">
            <img
              src="https://placehold.co/600x400@3x.png"
              alt="CuentaHasta3 Podcast"
              className="rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <Button
                className="bg-[#F96303] hover:bg-[#FB640B] text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" /> Ver Trailer
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-[#F96303] mb-12">
            Nuestra Trayectoria
          </h3>
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0"
            ref={timelineRef}
          >
            {timeline.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-20 h-20 rounded-full bg-[#FB640B] flex items-center justify-center text-white font-bold mb-4 shadow-lg">
                  <span className="year text-2xl"></span>
                </div>
                <p className="text-sm text-gray-600 event h-16 max-w-[150px]"></p>
                {index < timeline.length - 1 && (
                  <ArrowRight
                    className="hidden md:block absolute top-8 -right-4 text-[#FB640B]"
                    size={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-4xl font-bold text-[#F96303] mb-6">
            Únete a Nuestra Comunidad
          </h3>
          <p className="text-xl text-gray-700 mb-8">
            Descubre nuevas ideas, amplía tus conocimientos y forma parte de una
            comunidad de mentes curiosas.
          </p>
          <Button className="bg-[#F96303] hover:bg-[#FB640B] text-white text-lg py-6 px-8">
            Escucha Ahora
          </Button>
        </div>
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
