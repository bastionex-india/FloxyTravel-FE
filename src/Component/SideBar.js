import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../ContextApi/ContextApi";
import Dashboard from "./../Pages/Dashboard/Dashboard";

const Root = styled.div`
  height: calc(100vh - 80px);
  min-width: 300px;
  background-color: #fff;
  box-shadow: 0 0 49px 0 rgba(0, 0, 0, 0.11);
  position: sticky;
  top: 80px;
`;
const LinkWrapper = styled.div`
  padding: 15px 0px 15px 60px;
  display: flex;
  color: #01575c;
  font-size: 17px;
  font-weight: bold;
  border-left: 5px solid #fff;
  ${(p) =>
    p.select &&
    `
     background-color:#01575c;
     border-left:5px solid #0b8f97 ;
     color:#fff;
  `};
  cursor: pointer;
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
const Link = styled.div``;
function SideBar(props) {
  const [selected, setselected] = useState("Dashboard");
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);
  // console.log("authdata of sidebar",authData.data)
  return (
    <Root>
      {authData.data.isadmin === "true" ? (
        <>
          <LinkWrapper
            select={selected === "Dashboard"}
            onClick={() => {
              setselected("Dashboard");
              navigate("/");
            }}
          >
            <Link>Dashboard</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "Landing page"}
            onClick={() => {
              setselected("Landing page");
              navigate("/userlandingpage");
            }}
          >
            <Link>User Landing Page</Link>
          </LinkWrapper>
          {/* <LinkWrapper
            select={selected === "Booking history"}
            onClick={() => {
              setselected("Booking history");
              navigate("/bookinghistory");
            }}
          >
            <Link>Booking histrory</Link>
          </LinkWrapper> */}
          {/* <LinkWrapper
            select={selected === "Upcoming Bookings"}
            onClick={() => {
              setselected("Upcoming Bookings");
              navigate("/upcomingbookings");
            }}
          >
            <Link>Upcoming Bookings</Link>
          </LinkWrapper> */}
        </>
      ) : (
        <>
          <LinkWrapper
            select={selected === "Dashboard"}
            onClick={() => {
              setselected("Dashboard");
              navigate("/");
            }}
          >
            <Link>Dashboard</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "Booking history"}
            onClick={() => {
              setselected("Booking history");
              navigate("/bookinghistory");
            }}
          >
            <Link>Booking History</Link>
          </LinkWrapper>
        </>
      )}
    </Root>
  );
}

export default SideBar;
