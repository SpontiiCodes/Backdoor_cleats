import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/admin' && <Header />}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            
            {/* Hidden Admin Route - Not in navigation, accessed via direct URL or secret key */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        {location.pathname !== '/admin' && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;