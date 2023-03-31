import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../ContextApi/ContextApi";
import Avtar from "../Images/avatar.png";
import BrandLogo from "../Images/brandLogo.png";
import {Image } from 'react-bootstrap'

const Root = styled.div`
  box-shadow: 0 0 49px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
  padding: 10px 100px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;
const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const Task = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 15%;
  cursor: pointer;
  // background-color: antiquewhite;
  font-size: 20px;
  font-weight: 600;
  padding: 13px;
`;
const UserImg = styled.img``;
const DropDown = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const ListWrapper = styled.div`
  width: 150px;
  background-color: #fff;
  box-shadow: 0 0 49px 0 rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  z-index: 1000;
`;
const Option = styled.div`
  padding: 15px;
  cursor: pointer;
  :hover {
    background-color: #f1f7fc;
  }
`;
function Navigation(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const navigation = useNavigate();
//   const Logout = async() => {
//     localStorage.removeItem("authdata");
//     setAuthData("");
//     const time = new Date();
//     const response = await axios.post('/logout',{
//         // method:'POST',
//         headers:{
//             Acccept:"application/json",
//             "Content-Type":"application/json"
//         },
//         loginTime:authData.data.time,
//         logoutTime:time,
//         credentials:"include"
//      })
//       .then((response) => {
//         navigation("/")
//         // console.log(response);
//       })
//       .catch((error) => {
//         // console.log(error);
//       });
//   };
  const setShow=()=>{
    setShowDropDown(!showDropDown);
    // props.data()
  }
  const Logout = async() => {
    localStorage.removeItem("authdata");
    setAuthData("");
    // const time = new Date();
    // const response = await axios.post('/logout',{
    //     // method:'POST',
    //     headers:{
    //         Acccept:"application/json",
    //         "Content-Type":"application/json"
    //     },
    //     loginTime:authData.data.time,
    //     logoutTime:time,
    //     credentials:"include"
    //  })
    //   .then((response) => {
    //     navigation("/")
    //     // console.log(response);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });
  };
  return (
    <Root>
      <Logo>
        <img src={BrandLogo} />
      </Logo>
      <UserInfo>
        {/* {authData?.data?.profile?<Image src={`http://188.166.176.89:1999/uploads/${authData?.data?.profile}`} style={{height:"50px",width:"50px"}} roundedCircle alt='image'/>:<UserImg src={Avtar} alt="hello" />} */}
        <DropDown onClick={() => setShow(showDropDown)}>
          {authData?.data?.name}{" "}
          <i className="fa-sharp fa-solid fa-caret-down"></i>
        </DropDown>
        {showDropDown && (
          <ListWrapper>
            <Option
              onClick={() => {
                setShowDropDown(false);
                navigation("/profile");
              }}
            >
              Profile
            </Option>
            <Option
              onClick={() => {
                setShowDropDown(false);
                Logout();
              }}
            >
              Logout
            </Option>
          </ListWrapper>
        )}
      </UserInfo>
    </Root>
  );
}

export default Navigation;
