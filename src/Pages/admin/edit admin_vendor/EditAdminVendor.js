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
import { Button } from "@mui/material";
import { VendorEditSchema } from "../schemas/EditVendorSchema";

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
const EditAdminVendor = ({ open, setOpen,vendorDetails }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [vendorValue, setVendorValue] = useState("");
  const [adminValue, setAdminValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
// console.log("vendor",vendorDetails)
  const { authData, setAuthData } = useContext(AuthContext);
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    name: vendorDetails.name || "",
    email: vendorDetails.email || "",
    contact: vendorDetails.mobile || "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: VendorEditSchema,
      onSubmit: async (values, action) => {
        axios({
            method: "put",
            url: `${environmentVariables.apiUrl}/admin/updatevendor/${vendorDetails.vendorId}`,
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            data: {
                name: values.name,
                email: values.email,
                mobile: values.contact,
            },
            headers: { _token: authData.data.token },
        })
            .then((response) => {
            Swal.fire({
                title: "Success",
                text: "Vendor Updated successfully",
                timer: 2000,
            });
            action.resetForm();
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
            Edit Vendor
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
              value={ values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             {errors.name && touched.name ? (
                <ErrorText>{errors.name}</ErrorText>
              ) : null}
          </AddThemeInputWrapper>
          <AddThemeInputWrapper>
            <AddThemeLabel>Email* : </AddThemeLabel>
            <AddThemePopUpInput
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             {errors.email && touched.email ? (
                <ErrorText>{errors.email}</ErrorText>
              ) : null}
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
             {errors.contact && touched.contact ? (
                <ErrorText>{errors.contact}</ErrorText>
              ) : null}
          </AddThemeInputWrapper>{" "}
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

export default EditAdminVendor;
