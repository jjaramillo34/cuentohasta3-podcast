import PropTypes from "prop-types";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Example = ({ isOpen, toggleMenu }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="fixed top-0 left-0 bottom-0 w-[300px]"
    >
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-[300px] bg-white"
        variants={sidebar}
      />
      <Navigation />
      <MenuToggle toggle={toggleMenu} />
    </motion.nav>
  );
};

Example.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
