"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PodcastCard from "../common/PodcastCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FavoritePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const podcastsRef = useRef(null);

  const fetchPodcasts = async () => {
    // Simulating API call
    const newPodcasts = [
      {
        id: `${page}-1`,
        image: "https://placehold.co/600x400.png",
        duration: "1hr 24m",
        date: "13 Octubre 2023",
        title: "Bryan Knoxville: Cómo vivir una vida llena de música | E106",
        videoId: "FK2RaJ1EfA8",
        category: "music",
      },
      {
        id: `${page}-2`,
        image: "https://placehold.co/600x400.png",
        duration: "0hr 58m",
        date: "13 Octubre 2023",
        title: "Sarah Johnson: El arte de la comunicación efectiva | E107",
        videoId: "FK2RaJ1EfA8",
        category: "communication",
      },
      {
        id: `${page}-3`,
        image: "https://placehold.co/600x400.png",
        duration: "0hr 48m",
        date: "13 Octubre 2023",
        title: "Dr. Emily Chen: Avances en la medicina moderna | E108",
        videoId: "FK2RaJ1EfA8",
        category: "science",
      },
    ];

    setTimeout(() => {
      setPodcasts((prevPodcasts) => [...prevPodcasts, ...newPodcasts]);
      setFilteredPodcasts((prevFiltered) => [...prevFiltered, ...newPodcasts]);
      setLoading(false);
      setHasMore(page < 3); // Simulating end of data after 3 pages
    }, 1000);
  };

  useEffect(() => {
    fetchPodcasts();
  }, [page]);

  useEffect(() => {
    const filtered = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" || podcast.category === filter)
    );
    setFilteredPodcasts(filtered);
  }, [searchTerm, filter, podcasts]);

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.from(sectionRef.current.querySelector("h3"), {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(sectionRef.current.querySelector("p"), {
        opacity: 0,
        y: -30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(featuredRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });

      gsap.from(podcastsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: podcastsRef.current,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [inView]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const FeaturedPodcast = () => (
    <div
      ref={featuredRef}
      className="bg-gradient-to-r from-[#F96303] to-[#0bafe1] p-6 rounded-lg shadow-lg mb-8"
    >
      <h4 className="text-2xl font-bold text-white mb-2">Podcast Destacado</h4>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <img
          src="https://placehold.co/400x300.png"
          alt="Featured Podcast"
          className="w-full md:w-1/3 rounded-lg"
        />
        <div>
          <h5 className="text-xl font-semibold text-white mb-2">
            Entrevista Especial: Innovación en la Educación
          </h5>
          <p className="text-gray-200 mb-4">
            Un episodio imperdible con expertos en educación discutiendo las
            últimas tendencias y tecnologías que están transformando las aulas.
          </p>
          <Button variant="secondary">Escuchar Ahora</Button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-800" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 text-center mb-12">
          <h3 className="text-3xl font-bold text-[#F96303]">
            Podcasts <span className="text-[#0bafe1]">Favoritos</span>
          </h3>
          <p className="mx-auto text-white max-w-2xl">
            Explora nuestros episodios más populares y sumérgete en historias
            fascinantes. Desde entrevistas inspiradoras hasta debates
            estimulantes, estos podcasts te mantendrán enganchado y ansioso por
            más.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Buscar podcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                Todos
              </Button>
              <Button
                variant={filter === "music" ? "default" : "outline"}
                onClick={() => setFilter("music")}
              >
                Música
              </Button>
              <Button
                variant={filter === "communication" ? "default" : "outline"}
                onClick={() => setFilter("communication")}
              >
                Comunicación
              </Button>
              <Button
                variant={filter === "science" ? "default" : "outline"}
                onClick={() => setFilter("science")}
              >
                Ciencia
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-white" />
            <span className="text-white">Filtros activos:</span>
            <Badge variant="secondary">
              {filter === "all" ? "Todos" : filter}
            </Badge>
            {searchTerm && (
              <Badge variant="secondary">Búsqueda: {searchTerm}</Badge>
            )}
          </div>
        </div>

        <div ref={ref}>
          <FeaturedPodcast />
          <div
            ref={podcastsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={`skeleton-${index}`}>
                    <Skeleton className="w-full h-64 rounded-lg" />
                  </div>
                ))
              : filteredPodcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} {...podcast} />
                ))}
          </div>
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button onClick={loadMore} disabled={loading}>
              {loading ? "Cargando..." : "Cargar Más"}
            </Button>
          </div>
        )}

        {filteredPodcasts.length === 0 && !loading && (
          <p className="text-center text-white mt-8">
            No se encontraron podcasts que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </section>
  );
};

export default FavoritePodcasts;
