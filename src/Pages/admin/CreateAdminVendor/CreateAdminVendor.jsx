import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { VendorRegisterSchema } from "../schemas/VendorRegisterSchems";
import { useNavigate } from "react-router-dom";
import { environmentVariables } from "../../../config/config";
import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../ContextApi/ContextApi";
const ErrorText = styled.div`
  color: red;
  left: 132px;
  top: 35px;
  font-size: 14px;
  font-weight: 700;
  position: absolute;
`;
const AddThemePopUpContainer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 99999;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AddThemeLabel = styled.div`
  color: #000;
  margin-left: 20px;
`;
const RadioWrapper = styled.div`
  display: flex;
`;
const RadioInput = styled.input``;
const AddThemePopUp = styled.div`
  position: relative;
  z-index: 999;
  background-color: #fff;
  margin: auto;
  /* box-shadow: #000 2px 1px 1px 1px; */
  /* width: 42vw; */
  // height: 50vh;
  border-radius: 5px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const AddStatePopUpCloseIcon = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  cursor: pointer;
`;
const AddStatePopUpSubmitButton = styled.div`
  cursor: pointer;
  /* width: 110px;
  padding: 5px 0;
  text-align: center;
  color: #fff;
  background-color: #333;
  border-radius: 50px; */
  background-color: #01565c;
  height: 40px;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-left: 20px;
`;
const AddThemeInputWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  /* width: 80%; */
`;
const AddThemePopUpInput = styled.input`
  padding: 4px;
  border-radius: 5px;
  width: 500px;
  margin: 0 20px;
`;
const CreateAdminVendor = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [vendorValue, setVendorValue] = useState("");
  const [adminValue, setAdminValue] = useState("");
  const [error, setError] = useState("");
  const { authData, setAuthData } = useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    console.log(errors);
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: VendorRegisterSchema,
      onSubmit: async (values, action) => {
        console.log("aaaa", values, adminValue);
        if (adminValue === "") {
          setError("Options must be selected");
        } else {
          if (adminValue === "vendor") {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/addvendor`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                name: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                // console.log(response.data.data,"00000000000001111111111")
                // setUpdatedHotelData(response.data.message)
                // setResponseData(response.data.data);
                Swal.fire({
                  title: "Success",
                  text: "Admin/Vendor created successfully",
                  timer: 2000,
                });
                action.resetForm();
                // getAllListData();
                // toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
                // setError('Details are not valid');
                Swal.fire({
                  title: "Error",
                  text: error,
                  timer: 2000,
                });
              });
          } else {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/admin/register`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                username: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                // console.log(response.data.data,"00000000000001111111111")
                // setUpdatedHotelData(response.data.message)
                // setAdminResponseData(response.data.data);

                action.resetForm();
                // toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
                // setError('Details are not valid');
              });
          }
        }
      },
    });
  return (
    <>
      <AddThemePopUpContainer>
        <AddThemePopUp>
          <div
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: "20px",
              marginTop: "20px",
            }}
          >
            Add Admin/Vendor
          </div>
          <AddStatePopUpCloseIcon
            onClick={() => setOpen(false)}
            className="fa-solid fa-circle-xmark"
            style={{ color: "#fff", fontSize: "20px" }}
          />
          <AddThemeInputWrapper>
            <AddThemeLabel>Name* : </AddThemeLabel>
            <AddThemePopUpInput
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorText>{errors.name}</ErrorText>
          </AddThemeInputWrapper>
          <AddThemeInputWrapper>
            <AddThemeLabel>Email* : </AddThemeLabel>
            <AddThemePopUpInput
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorText>{errors.email}</ErrorText>
          </AddThemeInputWrapper>
          <AddThemeInputWrapper>
            <AddThemeLabel>Contact* : </AddThemeLabel>
            <AddThemePopUpInput
              name="contact"
              value={values.contact}
              type="number"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorText>{errors.contact}</ErrorText>
          </AddThemeInputWrapper>{" "}
          <AddThemeInputWrapper>
            <AddThemeLabel>Password* : </AddThemeLabel>
            <AddThemePopUpInput
              name="password"
              value={values.password}
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorText>{errors.password}</ErrorText>
          </AddThemeInputWrapper>{" "}
          <AddThemeInputWrapper>
            <AddThemeLabel>Confirm* : </AddThemeLabel>
            <AddThemePopUpInput
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorText>{errors.confirmPassword}</ErrorText>
          </AddThemeInputWrapper>
          <AddThemeInputWrapper style={{ marginRight: "240px" }}>
            <AddThemeLabel>Admin/Vendor* : </AddThemeLabel>
            <RadioWrapper>
              <RadioInput
                onClick={() => setAdminValue("admin")}
                value="admin"
                checked={adminValue === "admin"}
                type="radio"
              />
              <AddThemeLabel>Admin</AddThemeLabel>
            </RadioWrapper>
            <RadioWrapper>
              <RadioInput
                onClick={() => setAdminValue("vendor")}
                value="vendor"
                checked={adminValue === "vendor"}
                type="radio"
              />
              <AddThemeLabel>Vendor</AddThemeLabel>
            </RadioWrapper>
          </AddThemeInputWrapper>
          <ButtonWrapper>
            <AddStatePopUpSubmitButton onClick={handleSubmit}>
              Submit
            </AddStatePopUpSubmitButton>
            <AddStatePopUpSubmitButton onClick={handleClose}>
              Cancel
            </AddStatePopUpSubmitButton>
          </ButtonWrapper>
        </AddThemePopUp>
      </AddThemePopUpContainer>
    </>
  );
};

export default CreateAdminVendor;
