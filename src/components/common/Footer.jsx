import React, { useState } from "react";
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
  ArrowUp,
  Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";

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
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("es");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    toast.success("¡Gracias por suscribirte!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={ref}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/img/footer-logo.png"
              alt="Cuentohasta3 Logo"
              className="w-1/2 mb-4"
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
                  aria-label={`Síguenos en ${Icon.name}`}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="text-xl font-bold mb-4">Disponible en</h5>
            <div className="space-y-4">
              {["youtube", "spotify", "podcast"].map((platform, index) => (
                <motion.img
                  key={index}
                  src={`/img/${platform}.png`}
                  alt={`Escúchanos en ${platform}`}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <h5 className="text-xl font-bold mb-4">Suscríbete al Newsletter</h5>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mr-2"
              />
              <Button type="submit" className="bg-[#FB640B] hover:bg-[#F96303]">
                <Send size={20} />
              </Button>
            </form>
          </div>
          <div className="flex items-center justify-end">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Cuentohasta3 Podcast. Todos los
            derechos reservados.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
            <a href="#" className="hover:underline">
              Términos de Servicio
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {inView && (
          <motion.button
            className="fixed bottom-8 right-8 bg-[#FB640B] text-white p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Volver arriba"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
