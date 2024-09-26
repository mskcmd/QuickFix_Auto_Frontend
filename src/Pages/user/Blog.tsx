import { useEffect, useState } from "react";
import Header from "../../Components/User/Header";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { fetchAllBlogs } from "../../Api/user";
import { motion } from "framer-motion";

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

function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchBlogData = async () => {
    try {
      const result: BlogPost[] = await fetchAllBlogs();
      setBlogs(result);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleBlogClick = (blog: BlogPost) => {
    setSelectedBlog(blog);
    onOpen();
  };

  return (
    <>
      <Header />
      <div className="relative w-full ">
        <img
          className="w-full h-96 object-cover p-5"
          src="https://images.stockcake.com/public/e/7/6/e76fa166-dbdb-441b-a570-32e77d518edf_large/workspace-essentials-setup-stockcake.jpg"
          alt="Workspace Essentials Setup"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
          <h2 className="text-2xl font-bold">Discover Our Latest Insights</h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold text-blue-600">
                    {blog.name}
                  </p>
                  <p className="text-tiny uppercase font-bold">
                    {blog.positionName}
                  </p>
                  <small className="text-default-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                  <h4 className="font-bold text-large line-clamp-1 mt-2">
                    {blog.heading}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt={blog.heading}
                    className="object-cover rounded-xl w-full h-40"
                    src={blog.imageUrl}
                  />
                  <p
                    className="mt-4 line-clamp-3 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></p>
                  <Button
                    color="primary"
                    className="mt-4 w-full"
                    onPress={() => handleBlogClick(blog)}
                    endContent={<span>→</span>}
                  >
                    Read More
                  </Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal
        size="4xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">{selectedBlog?.heading}</h2>
              </ModalHeader>
              <ModalBody>
                <Image
                  src={selectedBlog?.imageUrl}
                  alt={selectedBlog?.heading}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                  <p>
                    By {selectedBlog?.name}, {selectedBlog?.positionName}
                  </p>
                  <p>
                    {selectedBlog &&
                      new Date(selectedBlog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className="mt-6 prose max-w-none"
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
    </>
  );
}

export default Blog;
