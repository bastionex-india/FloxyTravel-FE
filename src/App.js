import styled from "styled-components";
import "./App.css";
import Navigation from "./Component/Navigation";
import SideBar from "./Component/SideBar";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
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
import GenerateInvoice from "./Pages/admin/GenerateInvoice";
import VendorDetails from "./Pages/admin/VendorDetails/VendorDetails";
import Payouts from "./Pages/Payouts";
import VendorEditHotel from "./Pages/VendorEditHotel";

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
  // console.log("authdata of app",authData.data)
  return (
    <Root>
      {!authData ? (
        <Login />
      ) : (
        <>
          <Navigation />
          <Container>
            <LeftWrapper>
              <SideBar />
            </LeftWrapper>
            <RightWrapper>
              <Routes>
                {authData.data.isadmin === "true" ? (
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
                    <Route
                      path="vendordetails/:id"
                      element={<VendorDetails />}
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
                      path="/bookinghotelbyid"
                      element={<BookingHotelById />}
                    />
                    <Route
                      path="/vendormanagehotels"
                      element={<VendorManageHotels />}
                    />
                    <Route path="/payouts" element={<Payouts />} />

                    <Route path="/hoteldetails" element={<HotelDetails />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/edithotels/:id" element={<VendorEditHotel />} />
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
