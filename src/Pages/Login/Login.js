import styled from "styled-components";
import React, { useEffect, useState } from "react";
import BgImage from "../../Images/bg.jpg";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";

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
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Input = styled.input`
  background-color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px;
`;
const Label = styled.label``;
const Button = styled.button`
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
const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState();
  const [Password, setPassword] = useState();
  const [vendorId, setVendorId] = useState();
  const [error, setError] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [ipv4, setIpv4] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    //  axios({
    //   method:'get',
    //   url:'https://geolocation-db.com/json/'
    //  }).then((response) =>{
    //   console.log(response.data)
    //    setIpv4(response.data.IPv4);
    //    setLatitude(response.data.latitude);
    //    setLongitude(response.data.longitude);
    //  }).catch((error) =>{
    //  })
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userName || !Password) {
      setError("Please enter all details correctly.");
      return;
    }

    axios({
      method: "post",
      url: "http://188.166.176.89:4000/auth/admin/login",
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
        console.log(response.data.data.isadmin, "0000000000000");
        // if(response.data.data.isadmin==="true"){
        localStorage.setItem("authdata", JSON.stringify(response.data));
        setAuthData(JSON.parse(localStorage.getItem("authdata")));
        navigate("/");
        // }else{

        // }
      })
      .catch((error) => {
        // console.log("admin error",error)
        // setError('Details are not valid');
        axios({
          method: "post",
          url: "http://188.166.176.89:4000/auth/vendor/login",
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Root>
  );
};

export default Login;
