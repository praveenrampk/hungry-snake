import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[rgba(36,39,42,255)] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <a href="#">SuperBrand</a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Services
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              About Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-[rgba(36,39,42,255)] text-center">
          <a
            href="#"
            className="block py-2 text-white hover:text-blue-400 transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 text-white hover:text-blue-400 transition duration-300"
            onClick={toggleMenu}
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block py-2 text-white hover:text-blue-400 transition duration-300"
            onClick={toggleMenu}
          >
            Services
          </a>
          <a
            href="#"
            className="block py-2 text-white hover:text-blue-400 transition duration-300"
            onClick={toggleMenu}
          >
            Contact Us
          </a>
          <a
            href="#"
            className="block py-2 text-white hover:text-blue-400 transition duration-300"
            onClick={toggleMenu}
          >
            About Us
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
