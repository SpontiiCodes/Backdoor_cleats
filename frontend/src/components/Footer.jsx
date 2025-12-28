const Footer = () => {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-black">About Us</h3>
            <p>Backdoor Cleats: Where the Game Starts. Premium soccer boots and jerseys for the elite lover of the game.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-black">Contact</h3>
            <p>Email: info@backdoorcleats.com</p>
            <p>Phone: +27 123 456 7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-black">Shipping & Returns</h3>
            <p>Free shipping on orders over R1000. 30-day return policy.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-black">Terms & Privacy</h3>
            <p>Read our terms of service and privacy policy.</p>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-300 pt-8">
          <p>&copy; 2026 Backdoor Cleats. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;