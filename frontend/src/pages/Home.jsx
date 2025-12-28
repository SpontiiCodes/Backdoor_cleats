import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero-bg min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold font-montserrat mb-4 drop-shadow-lg">BACKDOOR CLEATS</h1>
        <p className="text-2xl mb-8 drop-shadow-md">Where the Game Starts</p>
        <div className="space-x-4">
          <Link to="/products/boots" className="bg-neon-green text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-green-400 transition transform hover:scale-105 shadow-lg">Shop Boots</Link>
          <Link to="/products/jerseys" className="bg-electric-blue text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-blue-400 transition transform hover:scale-105 shadow-lg">Shop Jerseys</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;