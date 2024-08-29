import React from "react";
import { Clock, Calendar, Play } from "lucide-react";
import VideoModal from "./common/VideoModal";
import { motion } from "framer-motion";

const colors = {
  primary: "#F96303",
  secondary: "#0bafe1",
  accent: "#FB640B",
  lightGray: "#f4f4f4",
  white: "#ffffff",
};

const PodcastCard = ({ image, duration, date, title, videoId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <motion.div
      className="flex flex-col gap-3 h-full bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F96303] opacity-70 rounded-t-lg"></div>
        <motion.div
          className="absolute inset-0 flex justify-center items-center z-10"
          whileHover={{ scale: 1.1 }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#F96303] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#FB640B] hover:text-white transition-colors"
          >
            <Play size={24} />
          </button>
        </motion.div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-5 text-sm text-[#0bafe1] mb-2">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {duration}
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </div>
        </div>
        <h5 className="font-bold leading-tight text-[#F96303]">{title}</h5>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
      />
    </motion.div>
  );
};

const FavoritePodcasts = () => {
  const podcasts = [
    {
      image: "https://placehold.co/600x400.png",
      duration: "1hr 24m",
      date: "13 Octubre 2023",
      title: "Bryan Knoxville: Cómo vivir una vida llena de música | E106",
      videoId: "FK2RaJ1EfA8",
    },
    {
      image: "https://placehold.co/600x400.png",
      duration: "0hr 58m",
      date: "13 Octubre 2023",
      title: "Bryan Knoxville: Cómo vivir una vida llena de música | E107",
      videoId: "FK2RaJ1EfA8",
    },
    {
      image: "https://placehold.co/600x400.png",
      duration: "0hr 48m",
      date: "13 Octubre 2023",
      title: "Bryan Knoxville: Cómo vivir una vida llena de música | E108",
      videoId: "FK2RaJ1EfA8",
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col gap-3 text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-[#F96303]">
            Podcasts <span className="text-[#0bafe1]">Favoritos</span>
          </h3>
          <p className="mx-auto text-white max-w-2xl">
            Explora nuestros episodios más populares y sumérgete en historias
            fascinantes. Desde entrevistas inspiradoras hasta debates
            estimulantes, estos podcasts te mantendrán enganchado y ansioso por
            más.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {podcasts.map((podcast, index) => (
            <PodcastCard key={index} {...podcast} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FavoritePodcasts;
