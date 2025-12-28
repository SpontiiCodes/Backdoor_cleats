import backgroundImage from '../assets/bdc.jpeg';

const Success = () => {
  return (
    <div 
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-8 text-white">Order Successful!</h1>
          <p className="text-white">Thank you for your purchase. Your order has been placed.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;