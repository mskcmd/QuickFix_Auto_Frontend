import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { Star } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FeedbackSchema } from "../../Common/Validations";
import { useAppSelector } from "../../../app/store";
import { createFeedback } from "../../../Api/user";
import toast from "react-hot-toast";
import { useState } from "react";

// Validation schema using Yup

const FeedbackModal = ({ isOpen, onClose, mechId, paymentId,fetchFeedback}: any) => {

  const [loading, setLoading] = useState(false); // Add loading state

  const initialValues = {
    rating: 0,
    feedback: "",
  };

  const userData = useAppSelector((state) => state.auth.userData);
  const id: string = userData?.userId || "";

  const handleStarClick = (setFieldValue: any, selectedRating: number) => {
    setFieldValue("rating", selectedRating);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      console.log(values, id, mechId, paymentId);
      const result = await createFeedback(values, id, mechId, paymentId);
      console.log("last", result);
      toast.success('Feedback submitted successfully!'); // Success toast
      fetchFeedback()
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error('Error submitting feedback. Please try again.'); // Error toast
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "bg-white dark:bg-gray-800",
        header: "border-b border-gray-200 dark:border-gray-700",
        body: "py-6",
        footer: "border-t border-gray-200 dark:border-gray-700",
      }}
    >
      <ModalContent>
        <Formik
          initialValues={initialValues}
          validationSchema={FeedbackSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-blue-600">
                  Your Feedback
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={36}
                      onClick={() => handleStarClick(setFieldValue, star)}
                      className={`cursor-pointer transition-all ${
                        star <= values.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="text-red-500 text-sm text-center mb-2"
                />
                <p className="text-center mb-4">
                  {values.rating > 0
                    ? `You rated: ${values.rating}/5`
                    : "Click to rate"}
                </p>
                <Field
                  as={Textarea}
                  placeholder="Please share your feedback..."
                  name="feedback"
                  className="w-full"
                />
                <ErrorMessage
                  name="feedback"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                 {loading && (
                  <div className="flex justify-center mt-4">
                    <Spinner />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Submit Feedback
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
