import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Music,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

// Custom Spotify icon component
const SpotifyIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 11.8A5 5 0 0 1 16 8"></path>
    <path d="M7 15a6 6 0 0 1 10-1"></path>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <footer
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/img/footer-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#FB640B] to-[#0bafe1] opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white pb-12 mb-8">
          <motion.div
            className="col-span-1 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/img/footer-logo.png"
              alt="Cuentohasta3 Logo"
              className="w-1/2 mb-4" // Made the logo smaller
            />
            <p className="mb-6">
              En Cuentohasta3, nos dedicamos a hacer que el aprendizaje de los
              números sea divertido y accesible para los más pequeños. Nuestro
              podcast combina historias fascinantes con conceptos matemáticos
              básicos, creando una experiencia educativa única.
            </p>
            <div className="flex space-x-4">
              {[Youtube, SpotifyIcon, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-[#FB640B] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="text-xl font-bold mb-4">Disponible en</h5>
            <div className="space-y-4">
              {["youtube", "spotify", "podcast"].map((platform, index) => (
                <motion.img
                  key={index}
                  src={`/img/${platform}.png`}
                  alt={platform}
                  className="h-8"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="text-xl font-bold mb-4">Páginas</h5>
            <ul className="space-y-2">
              {["Inicio", "Sobre Nosotros", "Episodios", "Galería", "Blog"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    <ChevronRight
                      size={16}
                      className="mr-2"
                      style={{ color: colors.accent }}
                    />
                    <a href="#" style={{ color: colors.accent }}>
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h5 className="text-xl font-bold mb-4">Información</h5>
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin size={24} />,
                  title: "Dirección",
                  content: "Calle Principal 123, Ambato, Ecuador",
                },
                {
                  icon: <Phone size={24} />,
                  title: "Llámanos",
                  content: "+593 98 765 4321",
                },
                {
                  icon: <Mail size={24} />,
                  title: "Email",
                  content: "hola@cuentohasta3.com",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-[#FB640B] flex items-center justify-center mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold">{item.title}</h6>
                    <p style={{ color: colors.accent }}>{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            &copy; {new Date().getFullYear()} Cuentohasta3 Podcast. Todos los
            derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
