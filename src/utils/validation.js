// Service valiadtion in create

export const serviceValidationScheme = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.string().required("Price is required"),
});
