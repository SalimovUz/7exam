import * as Yup from "yup";

export const categoryValidationScheme = Yup.object().shape({
  category_name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters long"),
});
