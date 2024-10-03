import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Button, Card, Input } from "@nextui-org/react";
import { useAppSelector } from "../../app/store";
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

interface FAQ {
  question: string;
  answer: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQSection: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const userData: any = useAppSelector((state) => state.auth.userData);

  const genAI = new GoogleGenerativeAI("AIzaSyAmaFmGqRepB-JPEJ_RqyySsGq1y2eGT-g");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = await response.text();

      const aiMessage: Message = { role: "assistant", content: text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, but I encountered an error while processing your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-20 relative">
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
              className="bg-slate-300 bg-opacity-10 backdrop-filter rounded-2xl shadow-2xl p-8 hover:shadow-gray-700 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-4 text-black">
                {faq.question}
              </h3>
              <p className="text-black leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {userData && (
        <motion.button
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl flex flex-col"
          >
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold">Chat with AI</h3>
                <Button variant="ghost" onClick={() => setIsChatOpen(false)}>
                  <X size={24} />
                </Button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : <Send size={18} />}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { FAQSection };