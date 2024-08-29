import { motion } from "framer-motion";
import PropTypes from "prop-types";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#F96303", "#0bafe1", "#FB640B", "#D4Df00", "#000"];

export const MenuItem = ({ i, text, href, onClick }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="list-none mb-5 flex items-center cursor-pointer"
    >
      <a href={href} onClick={onClick} className="flex items-center w-full">
        <div
          className="icon-placeholder w-10 h-10 rounded-full mr-5 flex-shrink-0"
          style={style}
        />
        <div
          className="text-placeholder text-lg font-semibold rounded-md w-[200px] h-5 flex-1"
          style={{ color: colors[i] }}
        >
          {text}
        </div>
      </a>
    </motion.li>
  );
};

MenuItem.propTypes = {
  i: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
