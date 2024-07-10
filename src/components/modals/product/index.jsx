import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { product } from "@service";
import { category } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  age_max: Yup.number().required("Required"),
  age_min: Yup.number().required("Required"),
  category_id: Yup.string().required("Required"),
  color: Yup.string().required("Required"),
  cost: Yup.number().required("Required"),
  count: Yup.number().required("Required"),
  description: Yup.string().required("Required"),
  discount: Yup.number().required("Required"),
  for_gender: Yup.string().required("Required"),
  made_in: Yup.string().required("Required"),
  product_name: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
});

const ProductForm = ({ open, handleClose, item, setClose, close }) => {
  const [products, setProducts] = useState([]);
  const [params, setParams] = useState({
    limit: 15,
    page: 1,
  });

  const getDataCategory = async () => {
    try {
      const response = await category.get(params);
      if (response.status === 200 && response?.data?.categories) {
        setProducts(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataCategory();
  }, [params]);

  const initialValues = {
    age_max: item?.age_max || "",
    age_min: item?.age_min || "",
    category_id: item?.category_id || "",
    color: item?.color || [],
    cost: item?.cost || "",
    count: item?.count || "",
    description: item?.description || "",
    discount: item?.discount || "",
    for_gender: item?.for_gender || "",
    made_in: item?.made_in || "",
    product_name: item?.product_name || "",
    size: item?.size || [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const newValue = {
      age_max: +values.age_max,
      age_min: +values.age_min,
      category_id: values.category_id,
      color: [values.color],
      cost: +values.cost,
      count: +values.count,
      description: values.description,
      discount: +values.discount,
      for_gender: values.for_gender,
      made_in: values.made_in,
      product_name: values.product_name,
      size: [values.size],
    };

    try {
      const response = await product.create(newValue);
      console.log(response.data, "response");
      if (response.status === 201) {
        toast.success("Product added successfully!");
        setClose(!close);
        handleClose();
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to add product!");
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
            {item ? "Edit Product" : "Add Product"}
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
              setFieldValue,
            }) => (
              <Form className="mt-6 space-y-1">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Age Maximum"
                      name="age_max"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.age_max}
                      required
                      error={touched.age_max && Boolean(errors.age_max)}
                      helperText={touched.age_max && errors.age_max}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Count"
                      name="count"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.count}
                      required
                      error={touched.count && Boolean(errors.count)}
                      helperText={touched.count && errors.count}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Age Minimum"
                      name="age_min"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.age_min}
                      required
                      error={touched.age_min && Boolean(errors.age_min)}
                      helperText={touched.age_min && errors.age_min}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Discount"
                      name="discount"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.discount}
                      required
                      error={touched.discount && Boolean(errors.discount)}
                      helperText={touched.discount && errors.discount}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        fullWidth
                        label="Category"
                        name="category_id"
                        onChange={(e) =>
                          setFieldValue("category_id", e.target.value)
                        }
                        onBlur={handleBlur}
                        value={values.category_id}
                        id="service_id"
                        required
                        error={
                          touched.category_id && Boolean(errors.category_id)
                        }
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Category</em>;
                          }
                          const selectedItem = products.find(
                            (item) => item.category_id === selected
                          );
                          return selectedItem ? selectedItem.category_name : "";
                        }}
                      >
                        <MenuItem disabled value="">
                          <em>Category</em>
                        </MenuItem>
                        {products.map((item, index) => (
                          <MenuItem value={item.category_id} key={index}>
                            {item.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.category_id && errors.category_id && (
                        <Typography color="error" variant="body2">
                          {errors.category_id}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="country-label">Made In</InputLabel>
                      <Select
                        labelId="country-label"
                        name="made_in"
                        value={values.made_in}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.made_in && Boolean(errors.made_in)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                        <MenuItem value="USA">USA</MenuItem>
                      </Select>
                      {touched.made_in && errors.made_in && (
                        <Typography color="error" variant="body2">
                          {errors.made_in}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Color"
                      name="color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.color}
                      required
                      error={touched.color && Boolean(errors.color)}
                      helperText={touched.color && errors.color}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" required>
                      <RadioGroup
                        row
                        name="for_gender"
                        value={values.for_gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
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
                      </RadioGroup>
                      {touched.for_gender && errors.for_gender && (
                        <Typography color="error" variant="body2">
                          {errors.for_gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Cost"
                      name="cost"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cost}
                      required
                      error={touched.cost && Boolean(errors.cost)}
                      helperText={touched.cost && errors.cost}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Size"
                      name="size"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.size}
                      required
                      error={touched.size && Boolean(errors.size)}
                      helperText={touched.size && errors.size}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Product Name"
                      name="product_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.product_name}
                      required
                      error={
                        touched.product_name && Boolean(errors.product_name)
                      }
                      helperText={touched.product_name && errors.product_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      required
                      multiline
                      rows={4}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2, textAlign: "right" }}>
                  <Button onClick={handleClose} sx={{ mr: 2 }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {item ? "Update" : "Submit"}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ProductForm;
