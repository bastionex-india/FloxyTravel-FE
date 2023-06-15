import * as Yup from "yup";

export const VendorEditSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    contact: Yup.string().min(10).max(10).required("Please enter your contact"),   
});