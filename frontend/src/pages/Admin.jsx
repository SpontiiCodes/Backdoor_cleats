import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Debug logging
  console.log('🔧 Admin component rendered!');
  console.log('🔑 Secret key:', searchParams.get('key'));
  console.log('🔗 API URL:', apiUrl);
  console.log('🔐 Is logged in:', isLoggedIn);

  useEffect(() => {
    console.log('🔄 Admin useEffect triggered');
    const secretKey = searchParams.get('key');
    if (secretKey === 'staff2025') {
      console.log('✅ Secret key valid, setting logged in');
      setIsLoggedIn(true);
    }

    const token = localStorage.getItem('adminToken');
    if (token) {
      console.log('✅ Token found, setting logged in');
      setIsLoggedIn(true);
    }
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('🔐 Attempting login with:', loginData);
      const response = await axios.post(`${apiUrl}/admin/login`, loginData);
      localStorage.setItem('adminToken', response.data.token);
      setIsLoggedIn(true);
      console.log('✅ Login successful');
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data?.error || error.message);
      alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    console.log('🚪 Logged out');
  };

  console.log('🎨 Rendering Admin component, isLoggedIn:', isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">🔧 Admin Login</h1>
          <div className="mb-4 p-3 bg-blue-900 rounded text-sm">
            <strong>Debug Info:</strong><br/>
            API: {apiUrl}<br/>
            Key: {searchParams.get('key') || 'None'}
          </div>
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
            Default: admin@backdoorcleats.com / admin123
          </div>
          <div className="mt-2 text-xs text-yellow-400 text-center">
            Quick access: /admin?key=staff2025
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">✅ Admin Dashboard Active!</h1>
        <div className="bg-green-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">🎉 Success!</h2>
          <p className="mb-4">You are now logged into the admin dashboard.</p>
          <p className="mb-4">API URL: {apiUrl}</p>
          <p className="mb-4">Secret Key Used: {searchParams.get('key') || 'Login form'}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;