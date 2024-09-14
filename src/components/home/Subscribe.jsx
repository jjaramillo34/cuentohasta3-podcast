import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Clock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".social-icon", {
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });

      gsap.from(".countdown-box", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [inView]);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      console.log("Subscribed with email:", email);
      toast.success("¡Suscripción enviada con éxito!");
      setEmail("");
      setIsValidEmail(true);
      setIsSubscribed(true);

      gsap.to(formRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          gsap.set(formRef.current, { display: "none" });
          gsap.set(successRef.current, { display: "block" });
          gsap.from(successRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.5,
          });
        },
      });

      setTimeout(() => {
        setIsSubscribed(false);
        gsap.to(successRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            gsap.set(successRef.current, { display: "none" });
            gsap.set(formRef.current, { display: "block" });
            gsap.from(formRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.5,
            });
          },
        });
      }, 5000);
    } else {
      setIsValidEmail(false);
      toast.error("Por favor, introduce un email válido.");
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const socialLinks = [
    {
      icon: <Facebook size={24} />,
      url: "https://facebook.com",
      name: "Facebook",
    },
    {
      icon: <Twitter size={24} />,
      url: "https://twitter.com",
      name: "Twitter",
    },
    {
      icon: <Linkedin size={24} />,
      url: "https://linkedin.com",
      name: "LinkedIn",
    },
    { icon: <Mail size={24} />, url: "mailto:info@example.com", name: "Email" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gradient-to-r from-[#F96303] to-[#0bafe1]"
    >
      <div
        className="absolute inset-0 bg-black opacity-10"
        style={{
          backgroundImage: "url('/img/pattern.svg')",
          backgroundSize: "100px 100px",
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-5xl font-bold leading-tight mb-6 text-white">
              <span className="text-[#FB640B]">Suscríbete</span> a Nuestros
              Últimos Episodios
            </h3>
            <p className="text-gray-200 text-lg mb-8">
              No te pierdas ninguna actualización. Suscríbete a nuestro boletín
              para recibir notificaciones sobre nuevos episodios, contenido
              exclusivo y más.
            </p>
            <div className="countdown-box bg-white bg-opacity-20 p-6 rounded-xl mb-8">
              <h4 className="text-white font-bold text-xl mb-3 flex items-center">
                <Clock className="mr-3" size={28} /> Oferta por tiempo limitado
              </h4>
              <p className="text-gray-200 mb-3">
                ¡Suscríbete ahora y obtén acceso a contenido exclusivo!
              </p>
              <div className="text-4xl font-bold text-white">
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Síguenos en ${link.name}`}
                  className="social-icon text-white hover:text-[#FB640B] transition-colors duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h5 className="text-3xl font-bold mb-6 text-white">
              Únete a Nuestra Comunidad
            </h5>
            <div ref={formRef}>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(true);
                    }}
                    className={`flex-grow py-4 px-6 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FB640B] text-lg ${
                      !isValidEmail ? "border-red-500" : ""
                    }`}
                    placeholder="Tu Email"
                    required
                    aria-label="Email para suscripción"
                  />
                  <Button
                    type="submit"
                    className="bg-[#FB640B] text-white px-8 py-4 rounded-r-full font-bold hover:bg-[#F96303] transition-colors duration-300 flex items-center justify-center mt-2 sm:mt-0 text-lg"
                  >
                    Suscribir
                    <Send size={24} className="ml-3" />
                  </Button>
                </div>
                {!isValidEmail && (
                  <p className="text-red-300 mt-3">
                    Por favor, introduce un email válido.
                  </p>
                )}
              </form>
            </div>
            <div
              ref={successRef}
              style={{ display: "none" }}
              className="bg-white bg-opacity-20 p-6 rounded-xl text-white text-center"
            >
              <Check size={48} className="mx-auto mb-4 text-green-400" />
              <h6 className="text-2xl font-bold mb-2">
                ¡Gracias por suscribirte!
              </h6>
              <p>Revisa tu email para confirmar tu suscripción.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
