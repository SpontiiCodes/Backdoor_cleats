import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bdcLogo.jpeg';
import Countdown from './Countdown';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <>
      <Countdown />

      <header className="bg-white text-black py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Backdoor Cleats" className="h-16 w-auto" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:font-semibold transition">Home</Link>
            <Link to="/about" className="hover:font-semibold transition">About</Link>

            {/* PRODUCTS DROPDOWN */}
            <div className="relative group">
              <Link to="/products" className="hover:font-semibold transition">
                Products
              </Link>

              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 border">
                <Link to="/products/boots" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Boots
                </Link>
                <Link to="/products/jerseys" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Jerseys
                </Link>
                <Link to="/products/accessories" className="block px-4 py-2 hover:bg-gray-100 transition">
                  Accessories
                </Link>
              </div>
            </div>

            {/* CART */}
            <Link to="/cart" className="hover:opacity-75 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
              </svg>
            </Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <nav className="md:hidden bg-white py-4 border-t">
            <div className="container mx-auto px-4 flex flex-col space-y-2">

              <Link to="/" onClick={() => setIsOpen(false)} className="hover:font-semibold">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:font-semibold">About</Link>

              {/* MOBILE PRODUCTS */}
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="text-left font-semibold hover:font-bold"
              >
                Products
              </button>

              {productsOpen && (
                <div className="ml-4 flex flex-col space-y-1">
                  <Link to="/products/boots" onClick={() => setIsOpen(false)} className="hover:font-semibold">Boots</Link>
                  <Link to="/products/jerseys" onClick={() => setIsOpen(false)} className="hover:font-semibold">Jerseys</Link>
                  <Link to="/products/accessories" onClick={() => setIsOpen(false)} className="hover:font-semibold">Accessories</Link>
                </div>
              )}

              <Link to="/cart" onClick={() => setIsOpen(false)} className="hover:font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                </svg>
                Cart
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
