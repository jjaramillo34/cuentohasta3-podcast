import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const BlogCard = ({ image, title, excerpt, category, readTime }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="bg-[#0bafe1] text-white">
            {category}
          </Badge>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" /> {readTime} min read
          </span>
        </div>
        <h5 className="text-xl font-bold mb-2 text-[#F96303]">{title}</h5>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Button
          variant="link"
          className="text-[#0bafe1] hover:text-[#FB640B] p-0"
        >
          LEER MÁS <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

BlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
};

const FeaturedBlogPost = ({ post }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={post.image}
            alt={post.title}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-[#0bafe1] font-semibold">
            Featured Post
          </div>
          <h3 className="mt-1 text-2xl leading-tight font-bold text-[#F96303]">
            {post.title}
          </h3>
          <p className="mt-2 text-gray-600">{post.excerpt}</p>
          <div className="mt-4">
            <Button
              variant="default"
              className="bg-[#FB640B] text-white hover:bg-[#F96303]"
            >
              Read Full Article
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

FeaturedBlogPost.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
};

const OurBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const blogPosts = [
    {
      image: "https://placehold.co/600x400.png",
      title: "Goodsound: ¿Qué es un Podcast? Aquí está...",
      excerpt:
        "Explora el mundo de los podcasts y descubre cómo esta forma de medio está revolucionando la manera en que consumimos contenido audio.",
      category: "Podcasting",
      readTime: 5,
    },
    {
      image: "https://placehold.co/600x400.png",
      title: "Moundy Rose: El estado del emprendimiento...",
      excerpt:
        "Un vistazo profundo al panorama actual del emprendimiento y cómo los podcasts están jugando un papel crucial en la educación empresarial.",
      category: "Emprendimiento",
      readTime: 7,
    },
    {
      image: "https://placehold.co/600x400.png",
      title: "La importancia del storytelling en la educación infantil",
      excerpt:
        "Descubre cómo el arte de contar historias puede mejorar significativamente el aprendizaje y la retención de información en los niños.",
      category: "Educación",
      readTime: 6,
    },
    {
      image: "https://placehold.co/600x400.png",
      title: "Técnicas de producción de audio para podcasts educativos",
      excerpt:
        "Aprende las mejores prácticas para crear podcasts educativos de alta calidad que mantengan a los niños comprometidos y aprendiendo.",
      category: "Producción",
      readTime: 8,
    },
  ];

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <section className="py-16 bg-gray-800" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl font-semibold text-[#0bafe1] mb-2">
            Nuestro Blog
          </span>
          <h3 className="text-4xl font-bold mb-4 text-[#F96303]">
            <span className="text-[#FB640B]">Últimas</span> Noticias Para Ti
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            En nuestro blog, exploramos las últimas tendencias en el mundo de
            los podcasts educativos. Desde técnicas innovadoras de narración
            hasta consejos para mejorar la producción de audio, nuestros
            artículos están diseñados para inspirar y educar.
          </p>
        </motion.div>

        <FeaturedBlogPost post={blogPosts[0]} />

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="lg:w-8/12"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-[#FB640B] text-white"
                      : "text-[#0bafe1]"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="lg:w-4/12"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-bold mb-4 text-[#F96303]">
                Suscríbete a Nuestro Newsletter
              </h4>
              <p className="text-gray-600 mb-4">
                Recibe las últimas noticias y artículos directamente en tu
                bandeja de entrada.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-[#FB640B] text-white hover:bg-[#F96303]"
                >
                  Suscribirse <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurBlog;
