import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { worker } from "@service";
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

const WorkerModal = ({ open, handleClose, item, setData }) => {
  const initialValues = {
    age: item?.age ? Number(item.age) : "",
    email: item?.email ? item.email : "",
    first_name: item?.first_name ? item.first_name : "",
    last_name: item?.last_name ? item.last_name : "",
    gender: item?.gender ? item.gender : "",
    password: item?.password ? item.password : "",
    phone_number: item?.phone_number ? item.phone_number : "",
    id: item?.id ? item.id : "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    age: Yup.number()
      .positive("Age must be positive")
      .integer("Age must be an integer")
      .required("Required"),
    first_name: Yup.string().required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Invalid gender")
      .required("Required"),
    last_name: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .required("Required"),
    phone_number: Yup.string()
      .matches(/^\+998\d{9}$/, "Phone number is not valid")
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const phoneNumber = values.phone_number.replace(/^\+/, "");
    const payload = { ...values, phone_number: phoneNumber, id: values.id };
    try {
      if (item) {
        payload.id = item.id;
        const response = await worker.update(payload);
        if (response.status === 200) {
          toast.success("Worker updated successfully!");
          setData((prevData) =>
            prevData.map((worker) => (worker.id === item.id ? payload : worker))
          );
        }
      } else {
        const response = await worker.create(payload);
        if (response.status === 201) {
          toast.success("Worker created successfully!");
          setData((prevData) => [...prevData, payload]);
        }
      }
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the worker.");
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
            {item ? "Edit Worker" : "Add Worker"}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
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
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  id="email"
                  required
                  className="my-2"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.age}
                  type="number"
                  id="age"
                  required
                  className="my-2"
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  type="text"
                  id="first_name"
                  required
                  className="my-2"
                  error={touched.first_name && Boolean(errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                />
                <FormControl
                  component="fieldset"
                  required
                  className="my-2 flex justify-center"
                >
                  <RadioGroup
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-labelledby="gender-group-label"
                  >
                    <div className="flex ml-20">
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </div>
                  </RadioGroup>
                  {touched.gender && errors.gender && (
                    <Typography color="error" className="mt-1">
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  type="text"
                  id="last_name"
                  required
                  className="my-2"
                  error={touched.last_name && Boolean(errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  id="password"
                  required
                  className="my-2"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  type="text"
                  id="phone_number"
                  required
                  className="my-2"
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
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

export default WorkerModal;
