import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItems = [
  { id: 0, text: "Inicio", href: "/" },
  { id: 1, text: "Episodios", href: "/podcasts" },
  { id: 2, text: "Sobre Nosotros", href: "/about" },
  { id: 3, text: "Contacto", href: "/contact" },
  { id: 4, text: "Suscribirse", href: "/subscribe" },
];

export const Navigation = ({ toggleMenu }) => (
  <motion.ul variants={variants} className="p-6 absolute top-[100px] w-[230px]">
    {menuItems.map((item) => (
      <MenuItem
        i={item.id}
        key={item.id}
        text={item.text}
        href={item.href}
        onClick={toggleMenu}
      />
    ))}
  </motion.ul>
);
