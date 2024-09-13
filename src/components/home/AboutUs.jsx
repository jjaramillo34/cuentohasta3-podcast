"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Mic,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import VideoModal from "../common/VideoModal";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip, TextPlugin);

const features = [
  { id: 1, icon: <Mic className="w-6 h-6" />, text: "Episodios Semanales" },
  { id: 2, icon: <Heart className="w-6 h-6" />, text: "Consejos Prácticos" },
  {
    id: 3,
    icon: <Users className="w-6 h-6" />,
    text: "Entrevistas con Expertos",
  },
];

const timeline = [
  { id: 1, year: 2019, event: "Lanzamiento del podcast" },
  { id: 2, year: 2020, event: "Alcanzamos 10,000 oyentes" },
  { id: 3, year: 2021, event: "Primer episodio en vivo" },
  { id: 4, year: 2022, event: "Colaboración con expertos internacionales" },
  { id: 5, year: 2023, event: "Celebramos nuestro episodio #200" },
];

const testimonials = [
  {
    id: 1,
    name: "María G.",
    text: "Cuentohasta3 ha transformado mi perspectiva sobre las relaciones. ¡Imprescindible!",
  },
  {
    id: 2,
    name: "Carlos R.",
    text: "Los consejos prácticos de este podcast me han ayudado enormemente en mi vida diaria.",
  },
  {
    id: 3,
    name: "Laura M.",
    text: "Las entrevistas son fascinantes. Siempre aprendo algo nuevo en cada episodio.",
  },
];

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const testimonialRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (inView) {
      animateElements();
    }
  }, [inView]);

  const animateElements = () => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(featuresRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Enhanced animation for the timeline
    gsap.from(timelineRef.current.children, {
      opacity: 0,
      scale: 0.5,
      y: 50,
      stagger: 0.3,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      onComplete: () => animateTimelineText(),
    });
  };

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

  const flipTestimonial = (direction) => {
    const state = Flip.getState(testimonialRef.current);

    setCurrentTestimonial((prev) =>
      direction === "next"
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );

    Flip.from(state, {
      duration: 0.6,
      ease: "power1.inOut",
      absolute: true,
      spin: direction === "next" ? 1 : -1,
    });
  };

  return (
    <section
      className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      ref={ref}
    >
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#F96303] mb-6">
              Sobre Cuentohasta3
            </h2>
            <p className="text-lg mb-6 text-gray-300">
              Cuentohasta3 es tu podcast semanal sobre relaciones, crecimiento
              personal y bienestar emocional. Nuestro objetivo es proporcionarte
              herramientas prácticas y consejos útiles para mejorar tu vida
              diaria.
            </p>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              ref={featuresRef}
            >
              {features.map((feature) => (
                <Card key={feature.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="flex flex-col items-center p-4">
                    <div className="text-[#F96303]">{feature.icon}</div>
                    <p className="mt-2 text-center text-gray-300">
                      {feature.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://placehold.co/600x400@3x.png"
              alt="Cuentohasta3 Podcast"
              className="rounded-lg shadow-lg"
            />
            <Button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F96303] hover:bg-[#FB640B]"
              onClick={() => setIsModalOpen(true)}
            >
              <Play className="mr-2 h-4 w-4" /> Ver Video
            </Button>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-[#F96303] mb-8">
            Nuestra Historia
          </h3>
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center"
            ref={timelineRef}
          >
            {timeline.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center mb-4 md:mb-0"
              >
                <div className="w-16 h-16 rounded-full bg-[#FB640B] flex items-center justify-center text-white font-bold mb-2">
                  <span className="year"></span>
                </div>
                <p className="text-sm text-gray-300 event h-12"></p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center text-[#F96303] mb-8">
            Lo Que Dicen Nuestros Oyentes
          </h3>
          <div className="relative">
            <div ref={testimonialRef}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <p className="text-lg mb-4 text-gray-300">
                  {testimonials[currentTestimonial].text}
                </p>
                <p className="font-bold text-[#F96303]">
                  - {testimonials[currentTestimonial].name}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-gray-800 border-gray-700 text-[#F96303]"
              onClick={() => flipTestimonial("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-gray-800 border-gray-700 text-[#F96303]"
              onClick={() => flipTestimonial("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
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
