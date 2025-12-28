import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white text-black rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden">
      <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-lg mb-2 text-gray-700">${product.price}</p>
        <select className="bg-gray-100 text-black p-2 rounded mb-4 w-full border">
          {product.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <Link to={`/product/${product.id}`} className="bg-neon-green text-black px-4 py-2 rounded font-bold hover:bg-green-400 transition block text-center">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;