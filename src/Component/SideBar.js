import React, { useContext, useEffect, useState } from "react";
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
  // padding: 15px 0px 15px 60px;
  padding: 15px 0px 15px 15px;
  display: flex;
  color: #01575c;
  font-size: 17px;
  // font-weight: bold;
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
  useEffect(() => {
    if (window !== "undefined") {
      if (window.location.href.split("/").pop() === "userhomepage") {
        setselected("user homepage slider");
      } else if (window.location.href.split("/").pop() === "userselectedcity") {
        setselected("Landing page");
      } else if (
        window.location.href.split("/").pop() === "bookinghistoryofadmin" ||
        window.location.href.split("/").pop() === "bookinghistory"
      ) {
        setselected("Booking history");
      } else if (window.location.href.split("/").pop() === "managevendors") {
        setselected("manageadmin");
      } else if (window.location.href.split("/").pop() === "managehotels") {
        setselected("managehotels");
      } else if (
        window.location.href.split("/").pop() === "vendormanagehotels"
      ) {
        setselected("vendormanagehotels");
      } else if (
        window.location.href.split("/").pop() === "payouts"
      ) {
        setselected("payouts");
      } 
      else if (
        window.location.href.split("/").pop() === "payoutRequests"
      ) {
        setselected("payoutRequests");
      }
      else if (
        window.location.href.split("/").pop() === "manageActivities"
      ) {
        setselected("manageActivities");
      }
      else if (
        window.location.href.split("/").pop() === "activityBookings"
      ) {
        setselected("activityBookings");
      }
      else if (
        window.location.href.split("/").pop() === "vendoractivityBookings"
      ) {
        setselected("vendoractivityBookings");
      }
      else if (
        window.location.href.split("/").pop() === "vendorManageActivities"
      ) {
        setselected("vendorManageActivities");
      }
      else if (
        window.location.href.split("/").pop() === "chatSupport"
      ) {
        setselected("chatSupport");
      } else {
        setselected("Dashboard");
      }
    } 
  }, [selected]);
  return (
    <Root>
      {authData!==null && authData.data.isadmin === "true" ? (
        <>
          <LinkWrapper
            select={selected === "Dashboard"}
            onClick={() => {
              setselected("Dashboard");
              navigate("/");
            }}
          >
            <Link>Dashboard</Link>
          </LinkWrapper>{" "}
          <LinkWrapper
            select={selected === "manageadmin"}
            onClick={() => {
              setselected("manageadmin");
              navigate("/managevendors");
            }}
          >
            <Link>Manage Vendors</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "managehotels"}
            onClick={() => {
              setselected("managehotels");
              navigate("/managehotels");
            }}
          >
            <Link>Manage Hotels</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "manageActivities"}
            onClick={() => {
              setselected("manageActivities");
              navigate("/manageActivities");
            }}
          >
            <Link>Manage Activities</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "user homepage slider"}
            onClick={() => {
              setselected("user homepage slider");
              navigate("/userhomepage");
            }}
          >
            <Link>Manage Home Landing Page</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "Landing page"}
            onClick={() => {
              setselected("Landing page");
              navigate("/userselectedcity");
            }}
          >
            <Link>Manage State Landing Page</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "Booking history"}
            onClick={() => {
              setselected("Booking history");
              navigate("/bookinghistoryofadmin");
            }}
          >
            <Link>Hotel Bookings</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "activityBookings"}
            onClick={() => {
              setselected("activityBookings");
              navigate("/activityBookings");
            }}
          >
            <Link>Activity Bookings</Link>
          </LinkWrapper>
          {/* <LinkWrapper
            select={selected === "Upcoming Bookings"}
            onClick={() => {
              setselected("Upcoming Bookings");
              navigate("/upcomingbookings");
            }}
          >
            <Link>Upcoming Bookings</Link>
          </LinkWrapper> */}
          <LinkWrapper
            select={selected === "payoutRequests"}
            onClick={() => {
              setselected("payoutRequests");
              navigate("/payoutRequests");
            }}
          >
            <Link>Payout Requests</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "chatSupport"}
            onClick={() => {
              setselected("chatSupport");
              navigate("/chatSupport");
            }}
          >
            <Link>Chat Support</Link>
          </LinkWrapper>

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
            select={selected === "vendormanagehotels"}
            onClick={() => {
              setselected("vendormanagehotels");
              navigate("/vendormanagehotels");
            }}
          >
            <Link>Manage Hotels</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "vendorManageActivities"}
            onClick={() => {
              setselected("vendorManageActivities");
              navigate("/vendorManageActivities");
            }}
          >
            <Link>Manage Activities</Link>
          </LinkWrapper>

          <LinkWrapper
            select={selected === "Booking history"}
            onClick={() => {
              setselected("Booking history");
              navigate("/bookinghistory");
            }}
          >
            <Link>Hotel Booking</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "vendoractivityBookings"}
            onClick={() => {
              setselected("vendoractivityBookings");
              navigate("/vendoractivityBookings");
            }}
          >
            <Link>Activity Bookings</Link>
          </LinkWrapper>
          <LinkWrapper
            select={selected === "payouts"}
            onClick={() => {
              setselected("payouts");
              navigate("/payouts");
            }}
          >
            <Link>Payouts</Link>
          </LinkWrapper>
        </>
      )}
    </Root>
  );
}

export default SideBar;
