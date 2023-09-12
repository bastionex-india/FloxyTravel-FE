import styled from "styled-components";
import "./App.css";
import Navigation from "./Component/Navigation";
import SideBar from "./Component/SideBar";
import Login from "./Pages/Login/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ContextApi/ContextApi";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BookingHistory from "./Pages/BookingHistory";
import HotelDetails from "./Pages/HotelDetails";
import Profile from "./Pages/Profile/Profile";
import UpcomingBookings from "./Pages/UpcomingBookings";
import Dashboard1 from "./Pages/admin/Dashboard1";
import GetHotelByVendor from "./Pages/admin/GetHotelByVendor";
import GetHotelById from "./Pages/admin/GetHotelById";
import BookingHotelById from "./Pages/BookingHotelById";
import UserLandingPage from "./Pages/admin/UserLandingPage";
import UserLandingPageHome from "./Pages/admin/UserLandingPageHome";
import BookingHistoryofAdmin from "./Pages/admin/BookingHistoryofAdmin";
import BookingHistorybyOrderid from "./Pages/admin/BookingHistorybyOrderid";
import ManageAdmin from "./Pages/admin/ManageAdmin/ManageAdmin";
import ManageHotels from "./Pages/admin/ManageHotels/ManageHotels";
import AddHotels from "./Pages/admin/AddHotels/AddHotels";
import VendorManageHotels from "./Pages/VendorManageHotels";
import VendorManageActivities from "./Pages/VendorManageActivities";
import GenerateInvoice from "./Pages/admin/GenerateInvoice";
import VendorDetails from "./Pages/admin/VendorDetails/VendorDetails";
import Payouts from "./Pages/Payouts";
import VendorEditHotel from "./Pages/VendorEditHotel";
import ChatSupport from "./Pages/admin/ChatSupport";
import PayoutRequest from "./Pages/admin/PayoutRequest";
import PayoutHistory from "./Pages/PayoutHistory";
import axios from "axios";
import { environmentVariables } from "./config/config";
import ManageActivities from "./Pages/admin/Activities/ManageActivities";
import AddActivity from "./Pages/admin/Activities/AddActivity";
import ActivityBookingHistory from "./Pages/admin/ActivityBookingHistory";
import VendorActivityHistory from "./Pages/VendorAcitivityHistory";
import  { isExpired } from 'react-jwt';
import VendorEditActivities from "./Pages/VendorEditActivities";
 
const Root = styled.div``;
const LeftWrapper = styled.div`
  width: 300px;
`;
const RightWrapper = styled.div`
  width: calc(100% - 300px);
  background-color: #f1f7fc;
`;
const Container = styled.div`
  display: flex;
`;
function App() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    if(authData===null){
      setLoggedIn(false)
    }else{
      const url = authData?.data?.isadmin
      ? `${environmentVariables?.apiUrl}/auth/isadminlogged`
      : `${environmentVariables?.apiUrl}/auth/isvendorlogged`;

      if(isExpired(authData.data.token)){
        setLoggedIn(false);
        localStorage.removeItem("authdata");
      }
      else{
        setLoggedIn(true);
      }

      // const config = {
      //   method: "get",
      //   url: url,
      //   headers: {
      //     _token: authData.data.token,
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.success === true) {
      //       setLoggedIn(true);
      //     } else {
      //       localStorage.removeItem("authdata");
      //       setLoggedIn(false);
      //     }
      //   })
      //   .catch(function (error) {
      //     setLoggedIn(false);
      //     localStorage.removeItem("authdata");
      //     console.log(error);
      //   });
    }
    
  }, [location, authData, loggedIn]);

 
  return (
    <Root
      onClick={() => {
        setShowNotifications(false);
        setShowDropDown(false);
      }}
    >
      {!loggedIn ? (
        <Login loggedIn={loggedIn}/>
        
      ) : (
        <>
          <Navigation
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
            loggedIn={loggedIn}
          />
          <Container>
            <LeftWrapper>
              <SideBar />
            </LeftWrapper>
            <RightWrapper>
              <Routes>
                {authData!==null && authData.data.isadmin === "true" ? (
                  <>
                    <Route path="/" element={<Dashboard1 />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="managevendors" element={<ManageAdmin />} />
                    <Route path="/addhotels" element={<AddHotels />} />
                    <Route path="/addhotels/:id" element={<AddHotels />} />
                    <Route
                      path="/upcomingbookings"
                      element={<UpcomingBookings />}
                    />
                    <Route
                      path="/gethotelsbyvendorid"
                      element={<GetHotelByVendor />}
                    />
                    <Route
                      path="/bookinghistoryofadmin"
                      element={<BookingHistoryofAdmin />}
                    />
                    <Route
                      path="/activityBookings"
                      element={<ActivityBookingHistory/>}
                    />
                    
                    <Route
                      path="/generateInvoice"
                      element={<GenerateInvoice />}
                    />
                    <Route
                      path="/bookinghistorybyorderid"
                      element={<BookingHistorybyOrderid />}
                    />
                    <Route path="/gethotel" element={<GetHotelById />} />
                    <Route
                      path="userselectedcity"
                      element={<UserLandingPage />}
                    />
                    <Route
                      path="userhomepage"
                      element={<UserLandingPageHome />}
                    />
                    <Route path="managehotels" element={<ManageHotels />} />
                    {/* <Route path="/bookinghistory" element={<BookingHistory />} />
                    <Route path="/hoteldetails" element={<HotelDetails />} />
                    <Route path="/profile" element={<Profile />} /> */}
                    <Route path="manageActivities" element={<ManageActivities />} />
                    <Route path="/addActivity" element={<AddActivity />} />
                    <Route path="/addActivity/:id" element={<AddActivity />} />
                    <Route path="vendordetails/:id" element={<VendorDetails />} />
                    <Route path="/payoutRequests" element={<PayoutRequest />} />
                    <Route
                      path="chatSupport"
                      element={<ChatSupport/>}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/bookinghistory"
                      element={<BookingHistory />}
                    />
                    <Route
                      path="/vendoractivityBookings"
                      element={<VendorActivityHistory />}
                    />
                    <Route
                      path="/generateInvoice"
                      element={<GenerateInvoice />}
                    />
                    <Route
                      path="/bookinghotelbyid"
                      element={<BookingHotelById />}
                    />
                    <Route
                      path="/vendormanagehotels"
                      element={<VendorManageHotels />}
                    />
                    <Route path="vendorManageActivities" element={<VendorManageActivities />} />
                    <Route path="/payouts" element={<Payouts />} />
                    <Route path="/payoutHistory" element={<PayoutHistory />} />
                    
                    <Route path="/hoteldetails" element={<HotelDetails />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route
                      path="/edithotels/:id"
                      element={<VendorEditHotel />}
                    />
                    <Route
                      path="/editactivities/:id"
                      element={<VendorEditActivities />}
                    />
                  </>
                )}
              </Routes>
            </RightWrapper>
          </Container>
        </>
      )}
    </Root>
  );
}

export default App;
