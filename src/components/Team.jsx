import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const HostCard = ({ image, name, role, socials }) => (
  <motion.div
    whileHover={{ y: -10 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-128 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <Avatar className="absolute -bottom-12 left-4 w-24 h-24 border-4 border-white">
            <AvatarFallback className="bg-[#F96303] text-white text-6xl font-bold">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-16 pb-4">
        <h3 className="text-2xl font-bold text-[#F96303] mb-1">{name}</h3>
        <Badge variant="secondary" className="bg-[#0bafe1] text-white">
          {role}
        </Badge>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex space-x-2">
          {socials.map((social, index) => (
            <Button key={index} variant="ghost" size="icon" asChild>
              <motion.a
                href={social.url}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {React.cloneElement(social.icon, {
                  className: "w-5 h-5 text-[#FB640B]",
                })}
              </motion.a>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

HostCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
};

const LifeSkillsTeamSection = () => {
  const hosts = [
    {
      image: "/img/avatar1.jpg",
      name: "Criss la Caramelito Leon",
      role: "Experta en Desarrollo Infantil",
      socials: [
        { url: "https://www.facebook.com", icon: <Facebook /> },
        { url: "https://www.twitter.com", icon: <Twitter /> },
        { url: "https://www.youtube.com", icon: <Youtube /> },
      ],
    },
    {
      image: "/img/avatar2.jpeg",
      name: "Santy el Piojo Alarcón",
      role: "Consejero de Relaciones Familiares",
      socials: [
        { url: "https://www.facebook.com", icon: <Facebook /> },
        { url: "https://www.twitter.com", icon: <Twitter /> },
        { url: "https://www.youtube.com", icon: <Youtube /> },
      ],
    },
    {
      image: "/img/avatar3.jpg",
      name: "Eva Torres",
      role: "Especialista en Amistad y Socialización",
      socials: [
        { url: "https://www.facebook.com", icon: <Facebook /> },
        { url: "https://www.twitter.com", icon: <Twitter /> },
        { url: "https://www.youtube.com", icon: <Youtube /> },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="secondary"
            className="bg-[#0bafe1] text-white text-lg mb-2"
          >
            Nuestro Equipo de Vida
          </Badge>
          <h2 className="text-4xl font-bold mt-2 text-[#F96303]">
            Conoce a Nuestros{" "}
            <span className="text-[#FB640B]">
              Expertos en Habilidades de Vida
            </span>
          </h2>
          <p className="mx-auto text-white max-w-3xl mt-4 text-lg">
            Nuestros expertos combinan su pasión por el desarrollo personal con
            años de experiencia en relaciones, crianza y habilidades sociales.
            Juntos, crean contenido significativo que ayuda a niños y adultos a
            navegar los desafíos de la vida cotidiana y construir relaciones
            sólidas.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hosts.map((host, index) => (
            <HostCard key={index} {...host} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LifeSkillsTeamSection;
