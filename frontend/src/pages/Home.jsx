import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero-bg min-h-screen flex items-center justify-center px-4">
      <div className="text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 drop-shadow-lg">
          BACKDOOR CLEATS
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-md">
          Where the Game Starts
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/products/boots"
            className="bg-neon-green text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-green-400 transition transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Shop Boots
          </Link>
          <Link
            to="/products/jerseys"
            className="bg-electric-blue text-black px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-blue-400 transition transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Shop Jerseys
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;