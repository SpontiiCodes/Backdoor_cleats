import backgroundImage from '../assets/bdc.jpeg';

const About = () => {
  return (
    <div 
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-white">About Backdoor Cleats</h1>
            
            <div className="prose prose-lg mx-auto text-white">
              <p className="text-xl mb-6 text-white">
                Backdoor Cleats is more than a football store — it's a culture.
              </p>
              
              <p className="mb-6 text-white">
                We deliver world-class soccer boots for players and authentic team jerseys for fans, but our story goes beyond the pitch. Backdoor Cleats exists for the kasi kid, the suburb stylist, and anyone with a plug beyond the game — those who carry football into their everyday style and identity.
              </p>
              
              <p className="mb-6 text-white">
                From match day to street wear, we believe football isn't just played, it's lived. What you wear represents where you come from, who you support, and how you move.
              </p>
              
              <p className="mb-6 text-white">
                This is for the ones who understand that the game starts long before kickoff.
              </p>
              
              <p className="text-xl font-semibold text-center mt-12 text-white">
                Backdoor Cleats — Where the Game Starts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;