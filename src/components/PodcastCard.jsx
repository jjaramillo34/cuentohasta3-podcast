import { Button } from "./ui/button";
import Proptypes from "prop-types";

const PodcastCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button>Escuchar ahora</Button>
      </div>
    </div>
  );
};

PodcastCard.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  imageUrl: Proptypes.string,
};

export default PodcastCard;
