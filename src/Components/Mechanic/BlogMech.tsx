import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { fetchBlog } from "../../Api/mechanic";
import { useModalState } from "./miscellaneous/Blog/useModalState";
import BlogForm from "./miscellaneous/Blog/BlogForm";
import BlogCard from "./miscellaneous/Blog/BlogCard";
import BlogModal from "./miscellaneous/Blog/BlogModal";
import { Button } from "@chakra-ui/react";

const BlogMech: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useModalState();
  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const id: any = mechanicData?.mechnicId;

  const isBlogFormVisible = location.pathname === "/mechanic/home/create-blog";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await fetchBlog(id);
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleBlog = () => {
    navigate("/mechanic/home/create-blog");
  };

  const handleReadMore = (blog: any) => {
    setSelectedBlog(blog);
    onOpen();
  };

  return (
    <div>
      <div className="mx-auto p-4">
        {!isBlogFormVisible ? (
          <div className="text-center flex justify-end">
            <Button color="primary" size="lg" onClick={handleBlog}>
              Add Blog
            </Button>
          </div>
        ) : (
          <BlogForm />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <BlogCard key={blog._id || index} blog={blog} onReadMore={handleReadMore} />
        ))}
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} isOpen={isOpen} onClose={onClose} />
      )}
    </div>
  );
};

export default BlogMech;