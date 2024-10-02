import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { Star } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { FeedbackSchema } from "../../Common/Validations";
import { updateFeedback } from "../../../Api/user";
import toast from "react-hot-toast";
// import { updateFeedback } from "../../../Api/feedback"; // Assuming this API function exists

const UpdateFeedbackModal = ({
  isOpen,
  onClose,
  existingFeedback,
  fetchFeedback,
}: any) => {
  const initialValues = {
    rating: existingFeedback?.rating || 0,
    feedback: existingFeedback?.feedback || "",
  };

  const handleStarClick = (
    setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean
      ): Promise<void | FormikErrors<{ rating: any; feedback: any }>>;
      (arg0: string, arg1: any): void;
    },
    selectedRating: number
  ) => {
    setFieldValue("rating", selectedRating);
  };

  const handleSubmit = async (values: any) => {
    try {
      const result = await updateFeedback(existingFeedback._id, values);
      if (result) {
        toast.success("Feedback Updated successfully!");
        fetchFeedback()
      }
      onClose();
    } catch (error) {
      console.error("Error updating feedback:", error);
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
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-blue-600">
                  Update Your Feedback
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Update Feedback
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default UpdateFeedbackModal;
