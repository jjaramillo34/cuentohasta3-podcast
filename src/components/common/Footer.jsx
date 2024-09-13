import { useState, useEffect, useRef } from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { toast } from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

// Custom Spotify icon component
import PropTypes from "prop-types";

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

SpotifyIcon.propTypes = {
  size: PropTypes.number,
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const footerRef = useRef(null);
  const scrollTopButtonRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const ctx = gsap.context(() => {
      // Animate in the footer content
      gsap.from(".footer-content > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
        },
      });

      // Animate social icons
      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".social-icons",
          start: "top 90%",
        },
      });

      // Animate platform icons
      gsap.from(".platform-icon", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".platform-icons",
          start: "top 90%",
        },
      });

      // Animate page links
      gsap.from(".page-link", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".page-links",
          start: "top 90%",
        },
      });

      // Animate info items
      gsap.from(".info-item", {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".info-items",
          start: "top 90%",
        },
      });

      // Animate newsletter form
      gsap.from(".newsletter-form", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".newsletter-form",
          start: "top 90%",
        },
      });

      // Animate copyright text
      gsap.to(".copyright-text", {
        duration: 2,
        text: {
          value: "© 2024 Cuentohasta3 Podcast. Todos los derechos reservados.",
          delimiter: "",
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".copyright-section",
          start: "top 90%",
        },
      });

      // Show/hide scroll to top button
      ScrollTrigger.create({
        trigger: footer,
        start: "top 80%",
        onEnter: () =>
          gsap.to(scrollTopButtonRef.current, { opacity: 1, duration: 0.3 }),
        onLeaveBack: () =>
          gsap.to(scrollTopButtonRef.current, { opacity: 0, duration: 0.3 }),
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    toast.success("¡Gracias por suscribirte!");
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/img/footer-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#FB640B] to-[#0bafe1] opacity-90"></div>
      <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10 text-white footer-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white pb-12 mb-8">
          <div className="col-span-1 lg:col-span-4">
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
            <div className="flex space-x-4 social-icons">
              {[Youtube, SpotifyIcon, Twitter, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="social-icon w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-[#FB640B] transition-colors"
                  aria-label={`Síguenos en ${Icon.name}`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h5 className="text-xl font-bold mb-4">Disponible en</h5>
            <div className="space-y-4 platform-icons">
              {["youtube", "spotify", "podcast"].map((platform, index) => (
                <img
                  key={index}
                  src={`/img/${platform}.png`}
                  alt={`Escúchanos en ${platform}`}
                  className="h-8 platform-icon"
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <h5 className="text-xl font-bold mb-4">Páginas</h5>
            <ul className="space-y-2 page-links">
              {["Inicio", "Sobre Nosotros", "Episodios", "Galería", "Blog"].map(
                (item, index) => (
                  <li key={index} className="flex items-center page-link">
                    <ChevronRight
                      size={16}
                      className="mr-2"
                      style={{ color: colors.accent }}
                    />
                    <a href="#" style={{ color: colors.accent }}>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-4">
            <h5 className="text-xl font-bold mb-4">Información</h5>
            <div className="space-y-4 info-items">
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
                <div key={index} className="flex items-center info-item">
                  <div className="w-12 h-12 rounded-full bg-[#FB640B] flex items-center justify-center mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <h6 className="text-lg font-semibold">{item.title}</h6>
                    <p style={{ color: colors.accent }}>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="newsletter-form">
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
        </div>

        <div className="text-center copyright-section">
          <p className="mb-2 copyright-text"></p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              Política de Privacidad
            </a>
            <a href="#" className="hover:underline">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>

      <button
        ref={scrollTopButtonRef}
        className="fixed bottom-8 right-8 bg-[#FB640B] text-white p-3 rounded-full shadow-lg opacity-0"
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
