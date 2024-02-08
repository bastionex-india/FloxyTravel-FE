import * as Yup from "yup";

export const AddHeadingSchema = Yup.object({
  heading: Yup.string().min(3).max(25).required("Please enter Heading"),
  type: Yup.string().required("Please enter Type"),
});
