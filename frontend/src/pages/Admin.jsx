import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [dashboardStats, setDashboardStats] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchDashboardData();
      fetchProducts();
      fetchOrders();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/admin/login`, loginData);
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      fetchDashboardData();
      fetchProducts();
      fetchOrders();
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.error || 'Unknown error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setProducts([]);
    setOrders([]);
    setDashboardStats(null);
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${apiUrl}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${apiUrl}/admin/dashboard/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${apiUrl}/admin/dashboard/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedProduct) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      // Upload image
      const uploadResponse = await axios.post(`${apiUrl}/api/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update product with new image URL
      await axios.put(`${apiUrl}/admin/dashboard/products/${selectedProduct.id}`, {
        image_url: uploadResponse.data.imageUrl
      }, {
        headers: { Authorization: `Bearer ${token}` }
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

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${apiUrl}/admin/dashboard/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
      alert('Order status updated successfully!');
    } catch (error) {
      alert('Error updating order status');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold">
              Login
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-400 text-center">
            Default login: admin@backdoorcleats.com / admin123
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Stats */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-400">{dashboardStats.orders.total_orders}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
              <p className="text-2xl font-bold text-yellow-400">{dashboardStats.orders.pending_orders}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-400">R{dashboardStats.orders.total_revenue || 0}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Total Products</h3>
              <p className="text-2xl font-bold text-purple-400">{dashboardStats.products.total_products}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              Orders
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={product.image_url.startsWith('http') ? product.image_url : `${apiUrl}${product.image_url}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-2">{product.category}</p>
                  <p className="text-green-400 font-bold mb-4">R{product.price}</p>
                  <p className="text-sm text-gray-400 mb-4">Stock: {product.stock}</p>

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
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer block text-center mb-2"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {uploading && selectedProduct?.id === product.id ? 'Uploading...' : 'Upload New Image'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-gray-400">{order.customer_name} - {order.customer_email}</p>
                      <p className="text-green-400 font-bold">Total: R{order.total}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-gray-700 px-3 py-1 rounded text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Items:</h4>
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.product_name} (Size: {item.size})</span>
                        <span>Qty: {item.quantity} × R{item.product_price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;