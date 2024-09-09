import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { fetchEditBlog, updateBlog } from "../../../../Api/mechanic";
import { Spinner } from "@nextui-org/spinner";

const BlogEdit: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    image: null,
    name: "",
    positionName: "",
    heading: "",
    description: "",
  });
  const navigate = useNavigate();
  const { id }: any = useParams<{ id: string }>();

  useEffect(() => {
    // Fetch blog data when the component mounts
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const blog = await fetchEditBlog(id);
        if (blog) {
          setInitialValues({
            image: blog[0].imageUrl, // Assuming the API returns image URL
            name: blog[0].name,
            positionName: blog[0].positionName,
            heading: blog[0].heading,
            description: blog[0].description,
          });
          setPreviewImage(blog[0].imageUrl); // Set preview image if it exists
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast.error("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Blog name is required"),
    positionName: Yup.string().required("Position name is required"),
    heading: Yup.string().required("Blog heading is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      const result = await updateBlog(id, values);
      if (result) {
        toast.success("Blog updated successfully");
        navigate("/mechanic/home/blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog");
    }
    setSubmitting(false);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const file = event.currentTarget.files?.[0];
    setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    navigate("/mechanic/home/blog");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Button
        onClick={handleBack}
        color="primary"
        variant="light"
        startContent={<ArrowLeft size={20} />}
        className="mb-6"
      >
        Back
      </Button>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Edit Blog Post
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Try using default size or different values if size="lg" doesn't work */}
          <Spinner size="md" />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleImageChange(event, setFieldValue)
                      }
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-56 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-6">
                  <Field name="name">
                    {({ field, meta }: any) => (
                      <div>
                        <Input
                          {...field}
                          label="Blog Name"
                          placeholder="Enter blog name"
                          className="w-full"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-500">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="positionName">
                    {({ field, meta }: any) => (
                      <div>
                        <Input
                          {...field}
                          label="Position Name"
                          placeholder="Enter position name"
                          className="w-full"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-500">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="heading">
                    {({ field, meta }: any) => (
                      <div>
                        <Input
                          {...field}
                          label="Blog Heading"
                          placeholder="Enter blog heading"
                          className="w-full"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-500">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="space-y-6">
                <Field name="description">
                  {({ field, meta }: any) => (
                    <div>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={(content) =>
                          setFieldValue("description", content)
                        }
                        placeholder="Enter blog description"
                        className="h-36 mb-11"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full mb-14"
                disabled={isSubmitting}
              >
                Update Blog Post
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default BlogEdit;
