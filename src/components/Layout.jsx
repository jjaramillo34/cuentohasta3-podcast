import React, { useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Example as Menu } from "./menu/Example";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
