import * as Yup from "yup";

export const VendorRegisterSchema = Yup.object({
    name: Yup.string().min(3).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    contact: Yup.string().min(10).max(10).required("Please enter your contact"),
    password: Yup.string().required("Please enter your password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
    bankName: Yup.string().required("Please enter bank Name"),
    accountNumber:Yup.number()
    .typeError('Please enter a valid number')
    .positive('Please enter a positive number')
    .integer('Please enter an integer')
    .required("Please enter Account Number"),
    accountHolderName:Yup.string().required("Please enter holder Name"),
    ifsc: Yup.string()
    .required('IFSC code is required')
    .matches(/^[A-Z]{4}[0-9]{7}$/, 'Invalid IFSC code')
    // option: Yup.boolean().oneOf([true], 'Please select an option')
});