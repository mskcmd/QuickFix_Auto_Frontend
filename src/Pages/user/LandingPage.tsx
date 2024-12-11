import { motion } from "framer-motion";
import { Car, Shield, Star, Wrench } from "lucide-react";
import LandingPageHeader from "../../Components/User/landingPage/LandingPageHeader";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <LandingPageHeader />
      <section className="bg-gradient-to-r from-gray-100 to-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-5xl font-bold mb-6">
                Premium Auto Care for Your Luxury Vehicle
              </h2>
              <p className="text-xl mb-8 text-gray-600">
                Experience unparalleled service and expertise for your high-end
                automobile.
              </p>
              <motion.button
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Service
              </motion.button>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="rounded-full overflow-hidden w-90 h-80 mx-auto shadow-2xl relative">
                <iframe
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[141%] h-[141%] pointer-events-none"
                  src="https://www.youtube.com/embed/n6JryuUtQmM?autoplay=1&mute=1&controls=0&loop=1&vq=medium&playlist=n6JryuUtQmM"
                  title="Luxury Car Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            WHY CHOOSE QUCIKFIX
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: "Expert Diagnostics",
                description:
                  "State-of-the-art equipment for precise problem identification",
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description:
                  "We use only genuine parts for all repairs and services",
              },
              {
                icon: Wrench,
                title: "Skilled Technicians",
                description:
                  "Our team is certified and experienced in luxury brands",
              },
              {
                icon: Star,
                title: "Premium Experience",
                description:
                  "Enjoy our comfortable lounge while we care for your vehicle",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <feature.icon className="mx-auto text-red-500 mb-4" size={40} />
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-8">
            Ready to Experience Premium Auto Care?
          </h3>
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Your Service Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
