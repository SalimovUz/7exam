import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email topilmadi!")
      .required("Email ni kiriting!"),
    password: Yup.string()
      .min(6, "Parol kamida 6 ta harf va raqamdan tashkil topishi kerak!")
      .matches(/[A-Z]/, "Parolda katta harf ham qatnashishi kerak!")
      .matches(/\d/, "Kamida bitta raqam ham bo'lishi shart!")
      .required("Parolni kiriting"),
  });

  const moveRegister = () => {
    navigate("/sign-up");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      console.log("Response: ", response);

      if (response.status === 200) {
        toast.success("Succesfully!");
        localStorage.setItem("access_token", response?.data?.access_token);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login: ", error);
      toast.error("Parol yoki Email xato kiritildi!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await auth.forgot_password({
        email: emailForPasswordReset,
      });
      if (response.status === 200) {
        setForgotPasswordModalOpen(false);
        setVerifyModalOpen(true);
        toast.success("Kod yuborildi!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Email topilmadi!");
    }
  };

  const handleVerifySubmit = async (values, { setSubmitting }) => {
    const email = localStorage.getItem("email");

    if (!email) {
      toast.error("Email not found in localStorage");
      setSubmitting(false);
      return;
    }

    const payload = {
      code: values.code,
      email: email,
      new_password: values.password,
    };

    try {
      const response = await auth.verify_forgot_password(payload);
      if (response.status === 201) {
        setVerifyModalOpen(false);
        toast.success("Parol muvaffaqiyatli yangilandi!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Kod yoki parol noto'g'ri!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Sign-In
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
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
                className="my-2"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <div>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </div>
              <div className="text-center flex">
                <a
                  onClick={moveRegister}
                  href="#"
                  className="text-blue-500 no-underline hover:underline"
                >
                  <span className="text-black">
                    Agar sizda akkaunt bo'lmasa
                  </span>{" "}
                  Register
                </a>
              </div>
              <div>
                <a href="#" onClick={() => setForgotPasswordModalOpen(true)}>
                  Parolni unitdingizmi?
                </a>
              </div>
              <div className="mt-2 text-center">
                <button
                  type="submit"
                  className="px-4 py-2 flex justify-center w-full text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Dialog
        open={forgotPasswordModalOpen}
        onClose={() => setForgotPasswordModalOpen(false)}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            name="email"
            fullWidth
            value={emailForPasswordReset}
            onChange={(e) => setEmailForPasswordReset(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotPasswordModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleForgotPasswordSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={verifyModalOpen} onClose={() => setVerifyModalOpen(false)}>
        <DialogTitle>Verify Code & Reset Password</DialogTitle>
        <Formik
          initialValues={{
            code: "",
            password: "",
          }}
          validationSchema={Yup.object({
            code: Yup.string().required("Kod kiriting!"),
            password: Yup.string()
              .min(
                6,
                "Parol kamida 6 ta harf va raqamdan tashkil topishi kerak!"
              )
              .matches(/[A-Z]/, "Parolda katta harf ham qatnashishi kerak!")
              .matches(/\d/, "Kamida bitta raqam ham bo'lishi shart!")
              .required("Yangi parolni kiriting!"),
          })}
          onSubmit={handleVerifySubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="mt-6 space-y-4">
              <DialogContent>
                <TextField
                  fullWidth
                  label="Kod"
                  name="code"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                  type="text"
                  id="code"
                  className="my-2"
                  error={touched.code && Boolean(errors.code)}
                  helperText={touched.code && errors.code}
                />
                <TextField
                  fullWidth
                  label="Yangi Parol"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setVerifyModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Index;
