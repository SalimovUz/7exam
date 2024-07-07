import React from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { categoryValidationScheme } from "@validation";
import { category } from "@service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const Index = ({ open, handleClose, item, setData }) => {
  const initialValues = {
    category_name: item?.category_name || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (item) {
        const payload = { category_id: item.category_id, ...values };
        const response = await category.update(payload);
        if (response.status === 200) {
          setData((prevData) =>
            prevData.map((cat) =>
              cat.category_id === item.category_id ? { ...cat, ...values } : cat
            )
          );
          toast.success("Category updated successfully!");
        } else {
          throw new Error("Failed to update category");
        }
      } else {
        const response = await category.create(values);
        if (response.status === 201) {
          setData((prevData) => [...prevData, response.data]);
          toast.success("Category created successfully!");
        } else {
          throw new Error("Failed to create category");
        }
      }
      handleClose();
    } catch (error) {
      toast.error("Nimadir xato");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            {item ? "Edit Category" : "Create Category"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={categoryValidationScheme}
          >
            {({
              values,
              handleChange,
              touched,
              errors,
              handleBlur,
              isSubmitting,
            }) => (
              <Form id="submit" className="mt-6 space-y-4">
                <TextField
                  fullWidth
                  label="Category Name"
                  name="category_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category_name}
                  type="text"
                  id="category_name"
                  required
                  className="my-2"
                  error={touched.category_name && Boolean(errors.category_name)}
                  helperText={touched.category_name && errors.category_name}
                />
                <div className="flex justify-between">
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    type="submit"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Save"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default Index;
