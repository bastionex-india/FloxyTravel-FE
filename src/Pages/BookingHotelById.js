import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/ContextApi";
import { environmentVariables } from "../config/config";
// import { Carousel } from 'react-carousel-minimal';
import styled from "styled-components";

// import Hotel1 from '../../../images/hotelimg1.jpg';
// import Deals from '../Deals/Deals';
// import SimilarHotels from './SimilarHotels';
import "./admin/BookingHistorybyOrderid.css";
import { styled as newStyled } from "@mui/material/styles";
import { Box, Paper, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import Table from "@mui/material/Table";
import { Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Item = newStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const Root = styled.div`
  // background-color: #e9e9e9;
  padding-bottom: 30px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const TextRoot = styled.div`
  // background-color: #9f94942b;
  // padding: 20px 0px;
  // width: 967px;
  // margin: 10px auto;
  padding: 20px;
  /* width: 967px; */
  margin: 12px 0px 0px 25px;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const Heading = styled.div`
  font-size: 1.75rem;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Container2 = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 10px;
`;
const CheckinoutButton = styled.div`
  padding: 10px 20px;
  background-color: #17a2b8;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  outline: none;
  :hover {
    background-color: #0056b3;
  }
`;
const HeadingDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;
`;


const BookingHotelById = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);

  const [data, setData] = useState("");
  const [arr, setArr] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const generateInvoiceHandler = () => {
    navigate("/generateInvoice", { state: data });
  };

  console.log(state, "vendor");
  const getAllUsers = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/vendor/getallbookingbyorderid/${authData.data.vendorId}/${state._id}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, [data.checkInStatus, data.checkOutStatus]);
  const checkIn = () => {
    if (data !== "" && !data.checkInStatus) {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/vendor/checkinpermissionbyvendor/${state._id}`,
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          getAllUsers();
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    }
  };
  const checkOut = () => {
    if (data !== "" && !data.checkOutStatus) {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/vendor/checkoutpermissionbyvendor/${state._id}`,
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          getAllUsers();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };
  function formatDate(timestamp) {
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = new Date(timestamp).toLocaleString("en-IN", options);
    return formattedDate;
  }

  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <i
              style={{ cursor: "pointer", marginRight: "50px" }}
              onClick={() => navigate(-1)}
              class="fa-solid fa-chevron-left fa-2x"
            ></i>
            <Heading> Booking Details</Heading>
          </div>
          <Root>
            <TextWrapper></TextWrapper>
          </Root>
        </TextRoot>
      </TextMainWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid xs={12}>
            <Item style={{ padding: "40px" }}>
              {/* <h4>Hotel Location</h4> */}
              <HeadingDiv>
                <div>
                  <h4>{data.hotelname}</h4>
                  <p>
                    {data.area} , {data.state}
                  </p>
                </div>
                <Button
                  variant="contained"
                  onClick={generateInvoiceHandler}
                  endIcon={<PictureAsPdfIcon />}
                >
                  View Invoice{" "}
                </Button>
              </HeadingDiv>
              <Grid container>
                <Grid xs={6}>
                  <h4>Customer Details</h4>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Name
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {data.customer && data.customer.name}{" "}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Email
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {data.customer && data.customer.email}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Contact
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {data.customer && data.customer.mobile}{" "}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid xs={6}>
                  <h4>Booking Details</h4>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Adult
                        </TableCell>
                        <TableCell align="right">{data.adult}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Children
                        </TableCell>
                        <TableCell align="right">{data.children}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Rooms
                        </TableCell>
                        <TableCell align="right">{data.noOfRooms}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          CheckIn Date
                        </TableCell>
                        <TableCell align="right">
                          {formatDate(data.checkIn)}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          CheckOut Date
                        </TableCell>
                        <TableCell align="right">
                          {formatDate(data.checkOut)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
        <Container2>
          <CheckinoutButton
            onClick={() => checkIn()}
            style={{
              opacity: data !== "" && data.checkInStatus ? 0.5 : 1,
              cursor:
                data !== "" && data.checkInStatus ? "not-allowed" : "pointer",
            }}
          >
            CheckIn
          </CheckinoutButton>
          <CheckinoutButton
            style={{
              margin: "0 10px",
              opacity: data !== "" && data.checkOutStatus ? 0.5 : 1,
              cursor:
                data !== "" && data.checkOutStatus ? "not-allowed" : "pointer",
            }}
            onClick={() => checkOut()}
          >
            CheckOut
          </CheckinoutButton>
        </Container2>
      </Container>
    </>
  );
};

export default BookingHotelById;
