import * as Yup from "yup";

export const VendorRegisterSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Please Enter Vendor Name"),
  email: Yup.string().email().required("Please Enter Vendor Email"),
  contact: Yup.string().min(10).max(10).required("Please Enter Vendor contact"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Please Enter Confirm Password")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password must match"
    ),
  bankName: Yup.string().required("Please Enter Bank Name"),
  accountNumber: Yup.number()
    .typeError("Please Enter a Valid number")
    .positive("Please Enter Positive number")
    .integer("Please Enter an Integer")
    .required("Please Enter Account Number"),
  accountHolderName: Yup.string().required("Please Enter Holder Name"),
  ifsc: Yup.string()
    .required("Please Enter IFSC code")
    .matches(/^[A-Z]{4}[0-9]{7}$/, "Invalid IFSC code"),
  // option: Yup.boolean().oneOf([true], 'Please select an option')
});
