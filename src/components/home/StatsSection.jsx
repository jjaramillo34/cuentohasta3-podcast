"use client";

import React, { useEffect, useRef } from "react";
import { Users, Headphones, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const StatItem = ({ icon, number, text }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);
  const numberRef = useRef(null);
  const textRef = useRef(null);

  return (
    <div className="flex flex-col items-center" ref={itemRef}>
      <div ref={iconRef} className="mb-4">
        {icon}
      </div>
      <h3 ref={numberRef} className="text-4xl font-bold text-[#F96303] mb-2">
        0
      </h3>
      <p ref={textRef} className="text-lg text-white text-center">
        {text}
      </p>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const stats = [
    {
      icon: <Users className="w-16 h-16 text-white" />,
      number: 20000000,
      text: "Nuestros Suscriptores",
    },
    {
      icon: <Headphones className="w-16 h-16 text-white" />,
      number: 150,
      text: "Episodios de Podcast",
    },
    {
      icon: <Heart className="w-16 h-16 text-white" />,
      number: 83000,
      text: "Nuestros Seguidores",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Stat items animation
      gsap.utils.toArray(".stat-item").forEach((item, index) => {
        const icon = item.querySelector(".icon");
        const number = item.querySelector(".number");
        const text = item.querySelector(".text");

        // Icon rotation
        gsap.from(icon, {
          rotation: 360,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2 * index,
        });

        // Number count up
        gsap.from(number, {
          textContent: 0,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          stagger: 1,
          delay: 0.5 + 0.2 * index,
          onUpdate: function () {
            this.targets()[0].innerHTML = numberWithCommas(
              Math.ceil(this.targets()[0].textContent)
            );
          },
        });

        // Text fade in
        gsap.from(text, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
          delay: 1 + 0.2 * index,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-gray-900 py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-5xl font-bold text-center text-white mb-16"
        >
          Nuestro Impacto en <span className="text-[#F96303]">Números</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="icon">{stat.icon}</div>
              <h3 className="number text-4xl font-bold text-[#F96303] mb-2">
                {numberWithCommas(stat.number)}
              </h3>
              <p className="text text-lg text-white text-center">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
