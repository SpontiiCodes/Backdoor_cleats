import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedProduct) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Upload image
      const uploadResponse = await axios.post(`${apiUrl}/api/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update product with new image URL
      await axios.put(`${apiUrl}/products/${selectedProduct.id}`, {
        image_url: uploadResponse.data.imageUrl
      });

      // Refresh products
      fetchProducts();
      setSelectedProduct(null);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Product Image Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-lg p-4">
              <img
                src={product.image_url.startsWith('http') ? product.image_url : `${apiUrl}${product.image_url}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.category}</p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id={`file-${product.id}`}
              />
              <label
                htmlFor={`file-${product.id}`}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer block text-center"
                onClick={() => setSelectedProduct(product)}
              >
                {uploading && selectedProduct?.id === product.id ? 'Uploading...' : 'Upload New Image'}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;