import styled from "styled-components";
import React, { useEffect, useState } from "react";
import BgImage from "../../Images/bg.jpg";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import { environmentVariables } from "../../config/config";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EmailIcon from "../../Images/email-icon.png";
import { useFormik } from "formik";
import Password from "../../Images/lock.png";
import { ForgetPasswordSchema } from "../admin/schemas/ForgetPasswordSchemaAdmin";
import { VerifyPasswordSchema } from "../admin/schemas/VerifyPasswordSchemaAdmin";

import Swal from "sweetalert2";
import Timer from "./timer/Timer";

const Root = styled.div`
  background-image: url(${BgImage});
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% cover;
  color: #858585;
`;
const Form = styled.form`
  background-color: rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  border: 1px solid hsla(0, 0%, 44%, 0.5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Form1 = styled.form`
  width: 100%;
  & input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-top: 2px;
    min-width: 20px;
    min-height: 20px;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const InputWrapper1 = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  display: flex;
`;
const Input = styled.input`
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px;
`;
const Input1 = styled.input`
  width: 100%;
  padding: 15px 0px 15px 55px;
  border: 1px solid rgb(53 84 209 / 16%);
  background-color: #f5f5f5;
  border-radius: 6px;
  outline: none;
`;
const Label = styled.label``;
const Button1 = styled.button`
  background-color: #01575c;
  border: none;
  color: #fff;
  padding: 10px 40px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
`;
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const Image = styled.img`
  position: absolute;
  top: 15px;
  left: 15px;
`;
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ open, setOpen, email, setParentClose }) {
  // const [open, setOpen] = React.useState(false);
  // console.log(open,email,"//")
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(10);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit1 = async () => {
    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/emailsend`,
      data: {
        email: email,
      },
    })
      .then((response) => {
        console.log("response", response.data.data);
        setTimer(10);
      })
      .catch((error) => {
        console.log("error", error.response.data.message);
        axios({
          method: "post",
          url: `${environmentVariables.apiUrl}/vendor/emailsend`,
          data: {
            email: email,
          },
        })
          .then((response) => {
            console.log("response", response.data.data);
            setTimer(10);
          })
          .catch((error) => {
            console.log("error", error.response.data.message);
          });
      });
  };
  const initialValues = {
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: VerifyPasswordSchema,
      onSubmit: async (values, action) => {
        await axios({
          method: "post",
          url: `${environmentVariables.apiUrl}/admin/verifyotp`,
          data: {
            email: email,
            otp: values.otp.toString(),
            password: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
        })
          .then((response) => {
            console.log("response", response.data);
            // setData(JSON.stringify(response.data))
            setOpen(false);
            setParentClose(false);
            Swal.fire({
              icon: "success",
              title: "Password Updated Successfully",
              timer: "800",
            });

            // navigate("/");
          })
          .catch((error) => {
            console.log("verify error of admin", error.response.data.message);
            // setError(error.response.data.message);
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/vendor/verifyotp`,
              data: {
                email: email,
                otp: values.otp.toString(),
                password: values.newPassword,
                confirmPassword: values.confirmPassword,
              },
            })
              .then((response) => {
                console.log("response", response.data);
                // setData(JSON.stringify(response.data))
                setOpen(false);
                setParentClose(false);
                Swal.fire({
                  icon: "success",
                  title: "Password Updated Successfully",
                  timer: "800",
                });

                // navigate("/");
              })
              .catch((error) => {
                console.log(
                  "verify error of vendor",
                  error.response.data.message
                );
                setError(error.response.data.message);
              });
          });

        action.resetForm();
      },
    });
  return (
    <React.Fragment>
      {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style1, width: 500 }}>
          <h2 id="child-modal-title">Verify Password</h2>
          <Form1>
            <InputWrapper1>
              <Image src={Password} />
              <Input1
                type="number"
                placeholder="Otp*"
                name="otp"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setError("")}
              />
            </InputWrapper1>
            {errors.otp && touched.otp ? (
              <ErrorMessage>{errors.otp}</ErrorMessage>
            ) : null}
            <InputWrapper1>
              <Image src={Password} />
              <Input1
                type="password"
                placeholder="Your Password*"
                name="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setError("")}
              />
            </InputWrapper1>
            {errors.newPassword && touched.newPassword ? (
              <ErrorMessage>{errors.newPassword}</ErrorMessage>
            ) : null}
            <InputWrapper1>
              <Image src={Password} />
              <Input1
                type="password"
                placeholder="Repeat Your Password*"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={() => setError("")}
              />
            </InputWrapper1>
            {errors.confirmPassword && touched.confirmPassword ? (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            ) : null}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <p>
              {timer === 0 ? (
                <p
                  onClick={handleSubmit1}
                  style={{
                    justifyContent: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Resend OTP
                </p>
              ) : (
                <Timer timer={timer} setTimer={setTimer} />
              )}
            </p>
            {/* <Button1 onClick={handleSubmit}>Resend</Button1> */}
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Form1>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Login = ({loggedIn}) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [vendorId, setVendorId] = useState();
  const [error, setError] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [ipv4, setIpv4] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [email, setEmail] = useState();
  const [enableChild, setEnableChild] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (!userName || !Password) {
      setError("Please enter all details correctly.");
      return;
    }
    
    axios({
      method: "post",
      url: `${environmentVariables?.apiUrl}/auth/admin/login`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email: userName,
        password: Password,
        isAdmin: "true",
      },
    })
      .then((response) => {
        
        localStorage.setItem("authdata", JSON.stringify(response.data));
        setAuthData(JSON.parse(localStorage.getItem("authdata")));
        navigate("/");
      })
      .catch((error) => {
        axios({
          method: "post",
          url: `${environmentVariables?.apiUrl}/auth/vendor/login`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: {
            email: userName,
            password: Password,
          },
        })
          .then((res) => {
            
            localStorage.setItem("authdata", JSON.stringify(res.data));
            setAuthData(JSON.parse(localStorage.getItem("authdata")));
            navigate("/");
          })
          .catch((error) => {
            
            console.log("vendor error", error);
            setError("Details are not valid");
          });
      });
  };

  const initialValues = {
    email: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: ForgetPasswordSchema,
      onSubmit: async (values, action) => {
        // alert("hjhj")
        await axios({
          method: "post",
          url: `${environmentVariables.apiUrl}/admin/emailsend`,
          data: {
            email: values.email,
          },
        })
          .then((response) => {
            console.log("response", response.data.data);
            setEnableChild(true);
            setOpen1(true);
            setEmail(response.data.data.email);
            action.resetForm();
            // setData(response.data);
            // setShowPopup(false);
            // navigate("/verifypassword", { state: response.data });
          })
          .catch((error) => {
            console.log("errorofadmin", error.response.data.message);
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/vendor/emailsend`,
              data: {
                email: values.email,
              },
            })
              .then((response) => {
                console.log("response", response.data.data);
                setEnableChild(true);
                setOpen1(true);
                setEmail(response.data.data.email);
                action.resetForm();
                // setData(response.data);
                // setShowPopup(false);
                // navigate("/verifypassword", { state: response.data });
              })
              .catch((error) => {
                console.log("errorofvendor", error.response.data.message);
              });
          });
      },
    });

    
  return (
    <Root>
      <Form>
        <Heading>Login</Heading>
        <InputWrapper>
          <Label>Email</Label>
          <Input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            onClick={() => setError("")}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Password</Label>
          <Input
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            onClick={() => setError("")}
          />
        </InputWrapper>
        {/* <InputWrapper>
          <Label>Vendor Id</Label>
          <Input
            value={vendorId}
            onChange={(e) => {
              setVendorId(e.target.value);
            }}
            type="text"
          />
        </InputWrapper> */}
        <p onClick={handleOpen} style={{ cursor: "pointer" }}>
          Forget Password
        </p>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        
        
        <Button1 onClick={onSubmit}>Submit</Button1>

        <div>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style1, width: 400 }}>
              <h2>Reset Password</h2>
              <Form1>
                <InputWrapper1>
                  <Image src={EmailIcon} />
                  <Input1
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputWrapper1>
                {errors.email && touched.email ? (
                  <ErrorMessage className="form-error">
                    {errors.email}
                  </ErrorMessage>
                ) : null}
                {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSubmit}>Send Email</Button>
              </Form1>
              {enableChild && (
                <ChildModal
                  open={open1}
                  setOpen={setOpen1}
                  email={email}
                  setParentClose={setOpen}
                />
              )}
            </Box>
          </Modal>
        </div>
      </Form>
    </Root>
  );
};

export default Login;
