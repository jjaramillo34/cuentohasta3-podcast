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
} from "lucide-react";
import { useInView } from "react-intersection-observer";
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const cardRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [inView]);

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
    <div ref={ref} className="h-[600px] perspective">
      <div
        className="w-full h-full cursor-pointer relative [transform-style:preserve-3d]"
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Card
          className="w-full h-full absolute [backface-visibility:hidden]"
          ref={frontRef}
        >
          <CardHeader className="flex-shrink-0">
            <div className="relative">
              <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Avatar className="absolute -bottom-6 left-4 w-20 h-20 border-4 border-white">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="bg-[#F96303] text-white text-4xl font-bold">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="flex-grow pt-8 pb-4 flex flex-col">
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
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-sm">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="w-full" />
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
              className="text-[#F96303] border-[#F96303]"
            >
              Flip for More
            </Button>
          </CardFooter>
        </Card>
        <Card
          className="w-full h-full absolute [backface-visibility:hidden] [transform:rotateY(-180deg)] bg-[#F96303] text-white"
          ref={backRef}
        >
          <CardContent className="flex flex-col justify-center h-full p-6">
            <h3 className="text-2xl font-bold mb-4">{name}</h3>
            <p className="text-lg mb-4">{role}</p>
            <div className="mb-4 flex-grow overflow-auto">
              <h4 className="font-semibold mb-2 text-[#0bafe1]">Cualidades:</h4>
              {qualities.map((quality, index) => (
                <div
                  key={index}
                  className="mb-2 backdrop-blur-sm bg-white/10 p-2 rounded"
                >
                  {quality}
                </div>
              ))}
            </div>
            <p className="mb-4 italic text-sm">"{testimonial}"</p>
            <p className="mb-4">{bio}</p>
            <Button
              variant="secondary"
              size="sm"
              className="bg-[#0bafe1] text-white hover:bg-[#0bafe1]/80"
              onClick={(e) => e.stopPropagation()}
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const FeaturedHost = ({ host }) => {
  const featuredHostRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      gsap.from(featuredHostRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <Card
        ref={featuredHostRef}
        className="overflow-hidden bg-black text-white"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={host.image}
              alt={host.name}
            />
          </div>
          <div className="p-8">
            <Badge variant="secondary" className="mb-2 bg-[#0bafe1] text-white">
              Host Destacado
            </Badge>
            <h3 className="mt-1 text-2xl leading-tight font-bold text-[#F96303]">
              {host.name}
            </h3>
            <p className="mt-2 text-[#0bafe1]">{host.role}</p>
            <p className="mt-4">{host.bio}</p>
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#F96303] text-white hover:bg-[#F96303]/80">
                    <Calendar className="mr-2 h-4 w-4" /> Reservar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black text-white">
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
      <span ref={textRef} className="inline-block text-[#0bafe1]">
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
      image: "/placeholder.svg?height=400&width=400",
      name: "Criss la Caramelito Leon",
      role: "Experta en Desarrollo Infantil",
      socials: [
        {
          url: "https://www.facebook.com",
          icon: <Facebook />,
          name: "Facebook",
        },
        { url: "https://www.twitter.com", icon: <Twitter />, name: "Twitter" },
        { url: "https://www.youtube.com", icon: <Youtube />, name: "YouTube" },
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
      image: "/placeholder.svg?height=400&width=400",
      name: "Santy el Piojo Alarcón",
      role: "Consejero de Relaciones Familiares",
      socials: [
        {
          url: "https://www.facebook.com",
          icon: <Facebook />,
          name: "Facebook",
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
      image: "/placeholder.svg?height=400&width=400",
      name: "Eva Torres",
      role: "Especialista en Amistad y Socialización",
      socials: [
        {
          url: "https://www.facebook.com",
          icon: <Facebook />,
          name: "Facebook",
        },
        { url: "https://www.twitter.com", icon: <Twitter />, name: "Twitter" },
        { url: "https://www.youtube.com", icon: <Youtube />, name: "YouTube" },
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
    <section className="py-16 bg-gray-700 text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="text-lg mb-2 bg-[#0bafe1] text-white"
          >
            Nuestro Equipo de Vida
          </Badge>
          <h2 className="text-4xl font-bold mt-2 text-[#F96303]" ref={titleRef}>
            Conoce a Nuestros{" "}
            <span className="text-[#0bafe1]">
              Expertos en Habilidades de Vida
            </span>
          </h2>
          <TextReplacer
            words={["XOXO", "Amor", "Familia", "Amistad", "Crecimiento"]}
          />
          <div
            className="mx-auto text-white max-w-3xl mt-4 text-lg"
            ref={descriptionRef}
          >
            <ScrambleText text="Nuestros expertos combinan su pasión por el desarrollo personal con años de experiencia en relaciones, crianza y habilidades sociales. Juntos, crean contenido significativo que ayuda a niños y adultos a navegar los desafíos de la vida cotidiana y construir relaciones sólidas." />
          </div>
        </div>

        <FeaturedHost host={hosts[0]} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
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
