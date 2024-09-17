import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchBlogs } from "../../Api/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonGroup,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

interface BlogPost {
  _id: string;
  createdAt: string;
  description: string;
  heading: string;
  imageUrl: string;
  mechanic: string;
  name: string;
  positionName: string;
  updatedAt: string;
  __v: number;
}

const BlogPreview: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const fetchBlogData = async () => {
    try {
      const result: BlogPost[] = await fetchBlogs();
      setBlogs(result);
      console.log("dd", result);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleModalToggle = (blog?: BlogPost) => {
    if (blog) {
      setSelectedBlog(blog);
      onOpen();
    } else {
      setSelectedBlog(null);
      onClose();
    }
  };

  const toggleShowAllBlogs = () => {
    navigate("/blog");
  };

  const displayedBlogs = showAllBlogs ? blogs : blogs.slice(0, 3);

  return (
    <div className="bg-[#ece8d9] py-20">
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
          {displayedBlogs.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: displayedBlogs.indexOf(post) * 0.1,
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition duration-300"
            >
              <img
                src={post.imageUrl}
                alt={post.heading}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-black">
                  {post.heading}
                </h3>
                <p
                  className="text-black mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                ></p>
                <Button color="primary" onPress={() => handleModalToggle(post)}>
                  Read More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAllBlogs && blogs.length > 2 && (
          <div className="text-center mt-10">
            <Button color="primary" size="lg" onPress={toggleShowAllBlogs}>
              Show All Blogs
            </Button>
          </div>
        )}

        <Modal size="4xl" isOpen={isOpen} onClose={() => handleModalToggle()}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedBlog?.heading}
                </ModalHeader>
                <ModalBody>
                  <img
                    src={selectedBlog?.imageUrl}
                    alt={selectedBlog?.heading}
                    className="w-full h-64 object-cover mb-4 rounded-lg"
                  />
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        By {selectedBlog?.name}, {selectedBlog?.positionName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Published on:{" "}
                        {selectedBlog &&
                          new Date(selectedBlog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/mechanicData/${selectedBlog?.mechanic}`}
                      >
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded transition duration-300 text-center">
                          View Details
                        </Button>{" "}
                      </Link>
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedBlog?.description || "",
                    }}
                  ></div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export { BlogPreview };
