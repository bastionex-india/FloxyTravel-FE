import * as Yup from "yup";

export const VerifyPasswordSchema = Yup.object({
    otp: Yup.string().min(4).max(4).required("Please enter OTP"),
    newPassword: Yup.string().required("Please enter your password").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});