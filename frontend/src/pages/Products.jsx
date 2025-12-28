import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import backgroundImage from '../assets/bdc.jpeg';

const mockProducts = [
  {
    id: 1,
    name: 'Nike Mercurial Superfly 9 Elite',
    category: 'boots',
    price: 299.99,
    sizes: ['7','8','9','10','11'],
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Experience unparalleled speed and agility with the Nike Mercurial Superfly 9 Elite. Designed for elite players who demand the best in performance and style.'
  },
  {
    id: 2,
    name: 'Adidas Predator Accuracy+',
    category: 'boots',
    price: 249.99,
    sizes: ['7','8','9','10','11'],
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Control the game with precision. The Adidas Predator Accuracy+ features innovative technology for superior ball control and power.'
  },
  {
    id: 3,
    name: 'Puma Future Z 1.4',
    category: 'boots',
    price: 229.99,
    sizes: ['7','8','9','10','11'],
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Step into the future of football with Puma Future Z 1.4. Lightweight and responsive for the modern player.'
  },
  {
    id: 4,
    name: 'Barcelona Home Jersey 2024',
    category: 'jerseys',
    price: 89.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your support for FC Barcelona with the official 2024 home jersey. Classic stripes and premium quality.'
  },
  {
    id: 5,
    name: 'Real Madrid Away Jersey 2024',
    category: 'jerseys',
    price: 94.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 22,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Real Madrid in style with the 2024 away jersey. Sleek design and comfortable fit.'
  },
  {
    id: 6,
    name: 'Nike Phantom GX Elite',
    category: 'boots',
    price: 279.99,
    sizes: ['7','8','9','10','11'],
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Dominate the pitch with the Nike Phantom GX Elite. Advanced grip and precision for the ultimate control.'
  },
  {
    id: 7,
    name: 'Adidas X Speedportal',
    category: 'boots',
    price: 259.99,
    sizes: ['7','8','9','10','11'],
    stock: 16,
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Speed and agility redefined. The Adidas X Speedportal offers explosive acceleration and superior comfort.'
  },
  {
    id: 8,
    name: 'Puma Ultra Ultimate',
    category: 'boots',
    price: 239.99,
    sizes: ['7','8','9','10','11'],
    stock: 14,
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Elevate your game with Puma Ultra Ultimate. Soft touch and exceptional ball control for every player.'
  },
  {
    id: 9,
    name: 'Manchester United Home Jersey 2024',
    category: 'jerseys',
    price: 99.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Wear the pride of Manchester United with the 2024 home jersey. Iconic red and premium materials.'
  },
  {
    id: 10,
    name: 'Liverpool Away Jersey 2024',
    category: 'jerseys',
    price: 89.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 28,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Support Liverpool with the 2024 away jersey. Sleek design and comfortable fit for the passionate fan.'
  },
  {
    id: 11,
    name: 'Chelsea Third Jersey 2024',
    category: 'jerseys',
    price: 94.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out with Chelsea\'s 2024 third jersey. Unique colors and high-quality fabric.'
  },
  {
    id: 12,
    name: 'Nike Tiempo Legend 9 Elite',
    category: 'boots',
    price: 269.99,
    sizes: ['7','8','9','10','11'],
    stock: 10,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Classic style meets modern performance. The Nike Tiempo Legend 9 Elite for the discerning player.'
  },
  {
    id: 13,
    name: 'Adidas Copa Mundial',
    category: 'boots',
    price: 199.99,
    sizes: ['7','8','9','10','11'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Timeless elegance with the Adidas Copa Mundial. Perfect for players who value tradition and touch.'
  },
  {
    id: 14,
    name: 'Puma King Ultimate',
    category: 'boots',
    price: 219.99,
    sizes: ['7','8','9','10','11'],
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Rule the field with Puma King Ultimate. Superior grip and control for indoor and outdoor play.'
  },
  {
    id: 15,
    name: 'Arsenal Home Jersey 2024',
    category: 'jerseys',
    price: 89.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 24,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your Arsenal spirit with the 2024 home jersey. Classic red and white with modern comfort.'
  }
];

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    axios.get(`https://backdoor-cleats.onrender.com/products?category=${category}`)
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error(error);
        // Use mock data if API fails
        const filtered = mockProducts.filter(p => p.category === category);
        setProducts(filtered);
      });
  }, [category]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const categoryImage = category === 'boots' 
    ? 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=400&q=80'
    : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=400&q=80';

  return (
    <div 
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        {/* Category Banner */}
        <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${categoryImage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white capitalize">{category}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 text-white">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-lg text-white">{sortedProducts.length} products</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-gray-700 text-white p-2 rounded">
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;