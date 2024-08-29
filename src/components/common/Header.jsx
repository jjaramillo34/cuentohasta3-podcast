import React from "react";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <header className="bg-transparent text-white absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-4">
          <h1 className="text-2xl font-bold">Podcast Cuentohasta3</h1>
          <nav className="hidden md:block ml-8">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-blue-200 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/podcasts"
                  className="hover:text-blue-200 transition-colors"
                >
                  Podcasts
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-200 transition-colors"
                >
                  Acerca de
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func,
};

export default Header;
