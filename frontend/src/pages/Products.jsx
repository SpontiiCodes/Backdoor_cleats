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
    image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
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
    name: 'New Balance Tekela Pro',
    category: 'boots',
    price: 199.99,
    sizes: ['7','8','9','10','11'],
    stock: 12,
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Precision and control meet innovation in the New Balance Tekela Pro. Perfect for technical players.'
  },
  {
    id: 5,
    name: 'Under Armour Magnetico Pro 3',
    category: 'boots',
    price: 189.99,
    sizes: ['7','8','9','10','11'],
    stock: 16,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Dominate the pitch with Under Armour Magnetico Pro 3. Superior grip and stability for every move.'
  },
  {
    id: 6,
    name: 'Barcelona Home Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your support for FC Barcelona with the official 2024-2025 home jersey. Classic blaugrana stripes and premium quality fabric.'
  },
  {
    id: 7,
    name: 'Barcelona Away Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Barcelona in their sleek away jersey. Modern design with excellent comfort and club pride.'
  },
  {
    id: 8,
    name: 'Real Madrid Home Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Wear the legendary Real Madrid home jersey. Iconic white with royal details and premium craftsmanship.'
  },
  {
    id: 9,
    name: 'Real Madrid Away Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 22,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out in Real Madrid away colors. Sophisticated design for the most successful club in history.'
  },
  {
    id: 10,
    name: 'Kaizer Chiefs Home Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Support the mighty Kaizer Chiefs with their iconic gold and black home jersey. Premium quality for passionate Amakhosi fans.'
  },
  {
    id: 11,
    name: 'Kaizer Chiefs Away Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 28,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out in the Kaizer Chiefs away jersey. Modern design with excellent comfort and Amakhosi pride.'
  },
  {
    id: 12,
    name: 'Orlando Pirates Home Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 26,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your Buccaneer spirit with the Orlando Pirates home jersey. Black and white stripes for the legendary Sea Robbers.'
  },
  {
    id: 13,
    name: 'Orlando Pirates Away Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 24,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Orlando Pirates away from home with this sleek alternative jersey design and Buccaneer pride.'
  },
  {
    id: 14,
    name: 'Mamelodi Sundowns Home Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 27,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Wear the pride of Mamelodi Sundowns with their distinctive yellow and blue home jersey. Champions quality.'
  },
  {
    id: 15,
    name: 'Mamelodi Sundowns Away Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'The Brazilians away jersey combines style and performance for Sundowns supporters and PSL champions.'
  },
  {
    id: 16,
    name: 'Manchester City Home Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Join the Cityzens with the official Manchester City home jersey. Sky blue excellence and Premier League quality.'
  },
  {
    id: 17,
    name: 'Manchester City Away Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out in black and white with the Manchester City away jersey. Premium Premier League craftsmanship.'
  },
  {
    id: 18,
    name: 'Manchester United Home Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Wear the famous Manchester United home jersey. Red devil pride with legendary club heritage.'
  },
  {
    id: 19,
    name: 'Manchester United Away Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Man United in their away colors. Modern design for the most successful club in English football.'
  },
  {
    id: 20,
    name: 'Arsenal Home Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Support the Gunners with the Arsenal home jersey. Classic red and white with north London pride.'
  },
  {
    id: 21,
    name: 'Arsenal Away Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out in Arsenal away colors. Sleek design for Emirates Stadium heroes.'
  },
  {
    id: 22,
    name: 'Liverpool Home Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Wear the legendary Liverpool home jersey. Red pride for Anfield and You Will Never Walk Alone.'
  },
  {
    id: 23,
    name: 'Liverpool Away Jersey 2024-2025',
    category: 'jerseys',
    price: 750.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Liverpool away from home. Modern design for the most decorated club in English football.'
  },
  {
    id: 24,
    name: 'Chelsea Home Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your Chelsea pride with the home jersey. Blue excellence from Stamford Bridge.'
  },
  {
    id: 25,
    name: 'Chelsea Away Jersey 2024-2025',
    category: 'jerseys',
    price: 650.00,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stand out in Chelsea away colors. Premium quality for Premier League champions.'
  },
  {
    id: 26,
    name: 'Nike Shin Guards Pro',
    category: 'accessories',
    price: 39.99,
    sizes: ['S','M','L'],
    stock: 40,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Protect your legs with Nike Shin Guards Pro. Lightweight and comfortable protection for serious players.'
  },
  {
    id: 27,
    name: 'Adidas Training Ball',
    category: 'accessories',
    price: 49.99,
    sizes: ['5'],
    stock: 35,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Train like a pro with the Adidas training ball. Perfect weight and grip for all weather conditions.'
  },
  {
    id: 28,
    name: 'Puma Team Backpack',
    category: 'accessories',
    price: 59.99,
    sizes: ['One Size'],
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Carry your gear in style with the Puma Team Backpack. Spacious and durable for training and matches.'
  },
  {
    id: 29,
    name: 'Nike Dri-FIT Socks (3-pack)',
    category: 'accessories',
    price: 24.99,
    sizes: ['S','M','L'],
    stock: 50,
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stay comfortable with Nike Dri-FIT socks. Moisture-wicking technology keeps your feet dry and fresh.'
  },
  {
    id: 30,
    name: 'Adidas Compression Sleeves',
    category: 'accessories',
    price: 34.99,
    sizes: ['S','M','L'],
    stock: 30,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Enhance performance with Adidas compression sleeves. Improved circulation and muscle support.'
  }
];

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    // If no category, fetch all products; otherwise fetch by category
    const url = category 
      ? `${apiUrl}/products?category=${category}`
      : `${apiUrl}/products`;
    
    axios.get(url)
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error(error);
        // Use mock data if API fails
        const filtered = category 
          ? mockProducts.filter(p => p.category === category)
          : mockProducts;
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

  const pageTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

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
            <h1 className="text-5xl font-bold text-white">{pageTitle}</h1>
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