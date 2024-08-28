import React from "react";
import { motion } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "How often should I service my luxury vehicle?",
      answer:
        "We recommend servicing your luxury vehicle every 5,000 to 7,500 miles or annually, whichever comes first. Regular maintenance ensures optimal performance and longevity.",
    },
    {
      question: "What sets your premium car service apart?",
      answer:
        "Our service stands out with expert technicians specializing in luxury brands, use of genuine OEM parts, cutting-edge diagnostic tools, and a lavish waiting area for our distinguished clients.",
    },
    {
      question: "Do you offer mobile servicing options?",
      answer:
        "Yes, we provide mobile servicing for minor maintenance and checks. Our fully-equipped service vans can visit your home or office, ensuring convenience without compromising on quality.",
    },
    {
      question: "What's the typical duration for a full service?",
      answer:
        "A comprehensive service usually takes 3-5 hours, depending on the vehicle model and required work. We offer luxury courtesy cars or a premium shuttle service to minimize any inconvenience.",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-16 text-center text-black"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-300 bg-opacity-10 backdrop-filter  rounded-2xl shadow-2xl p-8 hover:shadow-gray-700 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-black">
                {faq.question}
              </h3>
              <p className="text-black leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPreview: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      title: "The Art of Luxury Car Maintenance",
      excerpt:
        "Discover the secrets to preserving your high-end vehicle's performance and aesthetics...",
      image:
        "https://images.stockcake.com/public/9/5/9/95915499-91ad-4445-acb5-89557b219cf7_large/automotive-service-center-stockcake.jpg",
    },
    {
      title: "5 Telltale Signs Your Performance Car Needs Care",
      excerpt:
        "Learn to recognize subtle indicators that your luxury vehicle is due for expert attention...",
      image:
        "https://images.stockcake.com/public/8/0/c/80cb60c4-13e3-4ae0-ae0f-bb06a5adc10a_large/mechanic-inspecting-car-stockcake.jpg",
    },
    {
      title: "Detailing Mastery: Showroom Shine at Home",
      excerpt:
        "Explore professional techniques to maintain that fresh-off-the-lot brilliance year-round...",
      image:
        "https://images.stockcake.com/public/f/e/b/feb050b6-bd8e-44ca-93bd-091a83bf6c2f_large/mechanic-diagnostic-work-stockcake.jpg",
    },
  ];

  return (
    <div className=" bg-[#ece8d9] py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-16 text-center text-black"
        >
          Insights from Our Experts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition duration-300"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-black">
                  {post.title}
                </h3>
                <p className="text-black mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FAQSection, BlogPreview };
