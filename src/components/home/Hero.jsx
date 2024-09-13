"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactPlayer from "react-player";
import Typewriter from "typewriter-effect";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Raining effect for the title
    const letters = "CUENTOHASTA3S".split("");
    const emojis = ["📚", "🎧", "🎉", "💡", "🌟"];
    const colors = [
      "#F96303",
      "#FB640B",
      "#0bafe1",
      "#21B4E2",
      "#ffffff",
      "#808080",
      "#000000",
    ];

    letters.forEach((letter, index) => {
      const letterElement = document.createElement("div");
      letterElement.textContent = letter;
      letterElement.style.position = "absolute";
      letterElement.style.opacity = "0";
      letterElement.style.fontSize = `${
        Math.floor(Math.random() * (100 - 70 + 1)) + 70
      }px`;
      letterElement.style.fontWeight = "bold";
      letterElement.style.top = `${Math.random() * -100}%`;
      letterElement.style.left = `${Math.random() * 100}%`;
      letterElement.style.transform = `translateX(-50%) rotate(${
        Math.random() * 360
      }deg)`;
      letterElement.style.color =
        colors[Math.floor(Math.random() * colors.length)];
      title.appendChild(letterElement);

      tl.to(letterElement, {
        duration: 1,
        opacity: 1,
        top: `${70 + Math.random() * 30}%`,
        rotation: `${Math.random() * 360}`,
        ease: "bounce.out",
        delay: Math.random() * 0.5,
      });
    });

    // Add emojis to the title
    emojis.forEach((emoji) => {
      const emojiElement = document.createElement("div");
      emojiElement.textContent = emoji;
      emojiElement.style.position = "absolute";
      emojiElement.style.opacity = "0";
      emojiElement.style.fontSize = "50px";
      emojiElement.style.top = `${Math.random() * -100}%`;
      emojiElement.style.left = `${Math.random() * 100}%`;
      emojiElement.style.transform = `translateX(-50%) rotate(${
        Math.random() * 360
      }deg)`;
      title.appendChild(emojiElement);

      tl.to(emojiElement, {
        duration: 1,
        opacity: 1,
        top: `${70 + Math.random() * 30}%`,
        rotation: `${Math.random() * 360}`,
        ease: "bounce.out",
        delay: Math.random() * 0.5,
      });
    });

    // Reveal final title and content
    tl.to(title.children, {
      opacity: 0.2,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.02,
    }).to(content, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="relative overflow-hidden" ref={heroRef}>
      <section
        className="relative bg-cover bg-center min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/img/image.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#F96303] to-[#0bafe1] opacity-75"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={titleRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          ></div>
          <div
            ref={contentRef}
            className="flex flex-col lg:flex-row items-center justify-center min-h-screen opacity-0 transform translate-y-10"
          >
            <div className="lg:w-1/2 text-white text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                <Badge variant="secondary" className="text-lg">
                  <Users className="w-5 h-5 mr-2" /> Podcast Educativo
                </Badge>
                <Badge variant="secondary" className="text-lg">
                  <Users className="w-5 h-5 mr-2" /> Para Padres y Educadores
                </Badge>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Llevando el Podcast al{" "}
                <span className="text-[#FB640B]">Siguiente Nivel</span>
              </h1>
              <div className="text-xl mb-8">
                <Typewriter
                  options={{
                    strings: [
                      "Descubre historias fascinantes sobre relaciones, amistades y crianza de niños en cada episodio de Cuentohasta3.",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 lg:pl-12">
              <img
                src="https://placehold.co/600x400@3x.png"
                alt="Cuentohasta3 Podcast"
                className="w-full rounded-lg shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg max-w-3xl w-full">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              width="100%"
              height="400px"
              controls
            />
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
