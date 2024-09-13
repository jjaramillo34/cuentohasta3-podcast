import { useState, useRef, useEffect } from "react";
import VideoModal from "./VideoModal";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import {
  Clock,
  Calendar,
  Play,
  Pause,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";

const PodcastCard = ({
  image,
  duration,
  date,
  title,
  videoId,
  audioPreviewUrl,
  category,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const audioRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 1;
    }
  }, [isMuted]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved podcasts" : "Saved for later");
  };

  const handleShare = (platform) => {
    // Implement sharing logic here
    toast.success(`Shared on ${platform}`);
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-3 h-full bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F96303] opacity-70 rounded-t-lg"></div>
        <motion.div
          className="absolute inset-0 flex justify-center items-center z-10"
          whileHover={{ scale: 1.1 }}
        >
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#F96303] rounded-full w-12 h-12 hover:bg-[#FB640B] hover:text-white transition-colors"
          >
            <Play size={24} />
          </Button>
        </motion.div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-5 text-sm text-[#0bafe1]">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {duration}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {date}
            </div>
          </div>
          <Badge variant="secondary" className="bg-[#0bafe1] text-white">
            {category}
          </Badge>
        </div>
        <h5 className="font-bold leading-tight text-[#F96303] mb-2">{title}</h5>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePlayPause}
              aria-label={
                isPlaying ? "Pause audio preview" : "Play audio preview"
              }
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSave}
              aria-label={isSaved ? "Remove from saved" : "Save for later"}
            >
              <Bookmark size={16} fill={isSaved ? "#F96303" : "none"} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleShare("Twitter")}>
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("Facebook")}>
                  Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("LinkedIn")}>
                  LinkedIn
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={audioPreviewUrl} />
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId={videoId}
      />
    </motion.div>
  );
};

PodcastCard.propTypes = {
  image: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  audioPreviewUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default PodcastCard;
