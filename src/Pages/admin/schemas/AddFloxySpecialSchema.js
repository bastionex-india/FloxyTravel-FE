import * as Yup from "yup";

export const AddFloxySpecialSchema = Yup.object({
  title: Yup.string().min(1).max(100).required("Please enter title"),
  description: Yup.string().min(1).max(100).required("Please enter description"),
  slug: Yup.string()
    .min(1, "Slug must have at least 1 character")
    .max(100, "Slug can have at most 100 characters")
    .matches(/^[a-z]+$/, "Slug must contain only lowercase letters")
    .required("Slug is required")
    .label("Slug"),

  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) =>
        value && ["image/jpeg", "image/png", "image/webp"].includes(value.type)
    ),
});
