import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Send,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      // Here you would typically handle the subscription logic
      console.log("Subscribed with email:", email);
      toast.success("¡Suscripción enviada con éxito!");
      setEmail("");
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
      toast.error("Por favor, introduce un email válido.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "https://facebook.com" },
    { icon: <Twitter size={20} />, url: "https://twitter.com" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com" },
    { icon: <Mail size={20} />, url: "mailto:info@example.com" },
  ];

  return (
    <section className="py-16 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="relative rounded-lg overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/img/subscribe-bg.jpg')" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#F96303] to-[#0bafe1] opacity-80"></div>
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "url('/img/pattern.svg')",
              backgroundSize: "100px 100px",
              opacity: 0.1,
            }}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold leading-tight mb-4 text-white">
                <span className="text-[#FB640B]">Suscríbete</span> Para los
                Últimos Episodios
              </h3>
              <p className="text-gray-200 mb-4">
                No te pierdas ninguna actualización. Suscríbete a nuestro
                boletín para recibir notificaciones sobre nuevos episodios,
                contenido exclusivo y más.
              </p>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg mb-4">
                <h4 className="text-white font-bold mb-2 flex items-center">
                  <Clock className="mr-2" /> Oferta por tiempo limitado
                </h4>
                <p className="text-gray-200">
                  ¡Suscríbete ahora y obtén acceso a contenido exclusivo!
                </p>
                <div className="text-3xl font-bold text-white mt-2">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#FB640B] transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h5 className="text-2xl font-bold mb-4 text-white">Boletín</h5>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(true);
                    }}
                    className={`flex-grow py-3 px-4 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FB640B] ${
                      !isValidEmail ? "border-red-500" : ""
                    }`}
                    placeholder="Tu Email"
                    required
                    aria-label="Email para suscripción"
                  />
                  <Button
                    type="submit"
                    className="bg-[#FB640B] text-white px-6 py-3 rounded-r-full font-bold hover:bg-[#F96303] transition-colors duration-300 flex items-center mt-2 sm:mt-0"
                  >
                    Suscribir
                    <Send size={20} className="ml-2" />
                  </Button>
                </div>
                {!isValidEmail && (
                  <p className="text-red-300 mt-2">
                    Por favor, introduce un email válido.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscribe;
