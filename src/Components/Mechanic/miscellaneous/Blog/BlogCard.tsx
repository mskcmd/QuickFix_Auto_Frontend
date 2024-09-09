import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { deleteBlog } from "../../../../Api/mechanic";
import { useNavigate } from "react-router-dom";

type BlogCardProps = {
  blog: any;
  onReadMore: (blog: any) => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, onReadMore }) => {
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteBlog(id); 
          if(result){
            Swal.fire("Deleted!", "Your blog has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire("Error!", "There was an error deleting the blog.", "error");
        }
      }
    });
  };

  const handleEdit = () => {
    navigate(`/mechanic/home/edit-blog/${blog._id}`); 
  };

  return (
    <Card key={blog._id} className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-extrabold">{blog.name}</p>
        <p className="text-tiny uppercase font-normal">{blog.positionName}</p>
        <h4 className="font-bold text-sm">{blog.heading}</h4>
      </CardHeader>
      <CardBody className="relative overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={blog.imageUrl || "https://nextui.org/images/hero-card-complete.jpeg"}
          width={500}
          height={200}
        />
        <div className="absolute inset-0 flex justify-between items-end p-4 z-50">
          <div className="space-x-4">
            <Button color="primary" size="sm" onClick={() => onReadMore(blog)}>
              Read More
            </Button>
            <Button color="secondary" size="sm" onClick={handleEdit}>
              Edit
            </Button>
            <Button color="danger" size="sm" onClick={() => handleDelete(blog._id)}>
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
