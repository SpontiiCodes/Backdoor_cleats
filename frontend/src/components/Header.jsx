import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bdcLogo.jpeg';
import Countdown from './Countdown';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Countdown />
      <header className="bg-white text-black py-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Backdoor Cleats" className="h-16 w-auto" />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/about" className="hover:text-black transition">About</Link>
          <Link to="/products" className="hover:text-black transition">Products</Link>
          <Link to="/cart" className="hover:text-black transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
            </svg>
          </Link>
        </nav>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            <Link to="/" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="hover:text-black transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/products" className="hover:text-black transition" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/cart" className="hover:text-black transition" onClick={() => setIsOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
              </svg>
            </Link>
          </div>
        </nav>
      )}
    </header>
    </>
  );
};

export default Header;