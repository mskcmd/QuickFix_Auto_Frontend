import React from "react";
import { motion } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
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


export { FAQSection };


