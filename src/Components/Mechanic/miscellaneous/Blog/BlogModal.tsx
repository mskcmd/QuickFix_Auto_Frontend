import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";

type BlogModalProps = {
  blog: any;
  isOpen: boolean;
  onClose: () => void;
};

const BlogModal: React.FC<BlogModalProps> = ({ blog, isOpen, onClose }) => {
  return (
    <Modal
      size="3xl" // Reduce the modal size from "4xl" to "lg" for better viewing.
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {blog.heading}
            </ModalHeader>
            <ModalBody className="max-h-96 overflow-y-auto">
              <Image
                alt="Blog Image"
                src={
                  blog.imageUrl ||
                  "https://nextui.org/images/hero-card-complete.jpeg"
                }
                width={900}
                height={200}
                className="object-cover rounded-lg mb-4 mx-auto"
                // Added mx-auto to center the image horizontally
              />
              <div dangerouslySetInnerHTML={{ __html: blog.description }} />
            </ModalBody>

            <div className="px-4 flex justify-end text-right me-10 font-semibold">
              <div>
                <p>{blog.name}</p>
                <p>{blog.positionName}</p>
              </div>
            </div>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BlogModal;
