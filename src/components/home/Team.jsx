"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Youtube,
  Calendar,
  ChevronDown,
  ChevronUp,
  Instagram,
  Linkedin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { gsap } from "gsap";

const HostCard = ({
  image,
  name,
  role,
  socials,
  skills,
  testimonial,
  bio,
  qualities,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (isFlipped) {
      gsap.to(frontRef.current, { rotationY: 180, duration: 0.6 });
      gsap.to(backRef.current, { rotationY: 0, duration: 0.6 });
    } else {
      gsap.to(frontRef.current, { rotationY: 0, duration: 0.6 });
      gsap.to(backRef.current, { rotationY: -180, duration: 0.6 });
    }
  }, [isFlipped]);

  return (
    <div className="h-[600px] perspective">
      <div
        className="w-full h-full cursor-pointer relative [transform-style:preserve-3d]"
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Card
          className="w-full h-full absolute [backface-visibility:hidden] bg-white"
          ref={frontRef}
        >
          <CardHeader className="flex-shrink-0 p-0">
            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <Avatar className="absolute -bottom-6 left-4 w-24 h-24 border-4 border-white">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="bg-[#F96303] text-white text-4xl font-bold">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="flex-grow pt-10 pb-4 flex flex-col">
            <h3 className="text-2xl font-bold text-[#F96303] mb-1">{name}</h3>
            <Badge
              variant="secondary"
              className="self-start mb-4 bg-[#0bafe1] text-white"
            >
              {role}
            </Badge>
            <div className="mt-auto">
              <h4 className="font-semibold mb-2 text-[#0bafe1]">
                Habilidades:
              </h4>
              {skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="w-full h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between mt-auto">
            <div className="flex space-x-2">
              {socials.map((social, index) => (
                <Button key={index} variant="ghost" size="icon" asChild>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} de ${name}`}
                  >
                    {React.cloneElement(social.icon, {
                      className: "w-5 h-5 text-[#0bafe1]",
                    })}
                  </a>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-[#F96303] border-[#F96303] hover:bg-[#F96303] hover:text-white transition-colors"
            >
              Más Info
            </Button>
          </CardFooter>
        </Card>
        <Card
          className="w-full h-full absolute [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-gradient-to-br from-[#F96303] to-[#0bafe1] text-white"
          ref={backRef}
        >
          <CardContent className="flex flex-col justify-center h-full p-6">
            <h3 className="text-2xl font-bold mb-4">{name}</h3>
            <p className="text-lg mb-4 font-semibold">{role}</p>
            <div className="mb-4 flex-grow overflow-auto">
              <h4 className="font-semibold mb-2 text-white">Cualidades:</h4>
              <div className="flex flex-wrap gap-2">
                {qualities.map((quality, index) => (
                  <Badge
                    key={index}
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    {quality}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="mb-4 italic text-sm bg-white/10 p-3 rounded-lg">
              "{testimonial}"
            </p>
            <p className="mb-4 text-sm">{bio}</p>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-[#F96303] hover:bg-white/90 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Conoce Más
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FeaturedHost = ({ host }) => {
  const featuredHostRef = useRef(null);

  useEffect(() => {
    gsap.from(featuredHostRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div>
      <Card
        ref={featuredHostRef}
        className="overflow-hidden bg-gradient-to-r from-gray-900 to-black text-white shadow-xl"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-64 w-full object-cover md:w-64"
              src={host.image}
              alt={host.name}
            />
          </div>
          <div className="p-8">
            <Badge variant="secondary" className="mb-2 bg-[#0bafe1] text-white">
              Host Destacado
            </Badge>
            <h3 className="mt-1 text-3xl leading-tight font-bold text-[#F96303]">
              {host.name}
            </h3>
            <p className="mt-2 text-[#0bafe1] font-semibold">{host.role}</p>
            <p className="mt-4 text-gray-300">{host.bio}</p>
            <div className="mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#F96303] text-white hover:bg-[#F96303]/80 transition-colors">
                    <Calendar className="mr-2 h-4 w-4" /> Reservar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-[#F96303]">
                      Reservar una Sesión con {host.name}
                    </DialogTitle>
                    <DialogDescription className="text-[#0bafe1]">
                      Completa el formulario para agendar tu sesión
                      personalizada.
                    </DialogDescription>
                  </DialogHeader>
                  <p>Formulario de reserva aquí</p>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const TextReplacer = ({ words }) => {
  const textRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words]);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          gsap.to(textRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
          });
        },
      });
    }
  }, [currentIndex]);

  return (
    <div className="h-8">
      <span
        ref={textRef}
        className="inline-block text-[#0bafe1] font-bold text-2xl"
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

const ScrambleText = ({ text }) => {
  const textRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let iteration = 0;
    const maxIterations = 10;

    const scramble = () => {
      if (iteration >= maxIterations) {
        setDisplayText(text);
        clearInterval(intervalRef.current);
        return;
      }

      const newText = text
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          if (char === " ") {
            return " ";
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(newText);
      iteration++;
    };

    intervalRef.current = setInterval(scramble, 50);

    return () => clearInterval(intervalRef.current);
  }, [text]);

  return <p ref={textRef}>{displayText}</p>;
};

const LifeSkillsTeamSection = () => {
  const hosts = [
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "Criss la Caramelito Leon",
      role: "Experta en Desarrollo Infantil",
      socials: [
        {
          url: "https://www.facebook.com",
          icon: <Facebook />,
          name: "Facebook",
        },
        { url: "https://www.twitter.com", icon: <Twitter />, name: "Twitter" },
        {
          url: "https://www.instagram.com",
          icon: <Instagram />,
          name: "Instagram",
        },
      ],
      skills: [
        { name: "Desarrollo Infantil", level: 95 },
        { name: "Psicología Educativa", level: 90 },
        { name: "Terapia de Juego", level: 85 },
      ],
      testimonial:
        "Criss tiene una habilidad increíble para conectar con los niños. Sus consejos han sido invaluables para nuestra familia.",
      bio: "Con más de 15 años de experiencia en desarrollo infantil, Criss se especializa en ayudar a los padres a fomentar un crecimiento saludable y feliz en sus hijos.",
      qualities: ["Empatía", "Creatividad", "Paciencia", "Adaptabilidad"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "Santy el Piojo Alarcón",
      role: "Consejero de Relaciones Familiares",
      socials: [
        {
          url: "https://www.linkedin.com",
          icon: <Linkedin />,
          name: "LinkedIn",
        },
        { url: "https://www.twitter.com", icon: <Twitter />, name: "Twitter" },
        { url: "https://www.youtube.com", icon: <Youtube />, name: "YouTube" },
      ],
      skills: [
        { name: "Terapia Familiar", level: 92 },
        { name: "Resolución de Conflictos", level: 88 },
        { name: "Comunicación Efectiva", level: 94 },
      ],
      testimonial:
        "Santy nos ayudó a superar una crisis familiar que parecía insuperable. Su enfoque es realmente transformador.",
      bio: "Santy se dedica a fortalecer los lazos familiares a través de técnicas de comunicación efectiva y resolución de conflictos.",
      qualities: ["Empatía", "Escucha Activa", "Imparcialidad", "Resiliencia"],
    },
    {
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      name: "Eva Torres",
      role: "Especialista en Amistad y Socialización",
      socials: [
        {
          url: "https://www.instagram.com",
          icon: <Instagram />,
          name: "Instagram",
        },
        { url: "https://www.twitter.com", icon: <Twitter />, name: "Twitter" },
        {
          url: "https://www.facebook.com",
          icon: <Facebook />,
          name: "Facebook",
        },
      ],
      skills: [
        { name: "Habilidades Sociales", level: 96 },
        { name: "Inteligencia Emocional", level: 93 },
        { name: "Manejo del Estrés", level: 89 },
      ],
      testimonial:
        "Los talleres de Eva me ayudaron a superar mi ansiedad social. Ahora me siento mucho más segura en situaciones sociales.",
      bio: "Eva es experta en ayudar a las personas a desarrollar habilidades sociales sólidas y construir relaciones significativas.",
      qualities: ["Carisma", "Empatía", "Asertividad", "Adaptabilidad"],
    },
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.from(descriptionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.2,
      ease: "power3.out",
    });

    gsap.from(".host-card", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="text-lg mb-4 bg-[#0bafe1] text-white px-4 py-1 rounded-full"
          >
            Nuestro Equipo de Vida
          </Badge>
          <h2
            className="text-5xl font-bold mt-2 mb-4 text-white"
            ref={titleRef}
          >
            Conoce a Nuestros{" "}
            <span className="text-[#F96303]">
              Expertos en Habilidades de Vida
            </span>
          </h2>
          <TextReplacer
            words={["XOXO", "Amor", "Familia", "Amistad", "Crecimiento"]}
          />
          <div
            className="mx-auto text-gray-300 max-w-3xl mt-6 text-lg leading-relaxed"
            ref={descriptionRef}
          >
            <ScrambleText text="Nuestros expertos combinan su pasión por el desarrollo personal con años de experiencia en relaciones, crianza y habilidades sociales. Juntos, crean contenido significativo que ayuda a niños y adultos a navegar los desafíos de la vida cotidiana y construir relaciones sólidas." />
          </div>
        </div>

        <FeaturedHost host={hosts[0]} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {hosts.map((host, index) => (
            <div key={index} className="host-card">
              <HostCard {...host} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeSkillsTeamSection;
