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
import './admin/BookingHistorybyOrderid.css'
import { styled as newStyled } from '@mui/material/styles';
import { Box, Paper, Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Table from '@mui/material/Table';
import { Button } from '@mui/material'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';






const Item = newStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1)
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
  margin-right: 360px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const BookingHotelById = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);

  const [data, setData] = useState("");
  const [arr, setArr] = useState([]);
  const [checkInToggle, setCheckInToggle] = useState(true);
  const [checkOutToggle, setCheckOutToggle] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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
  // console.log("iyyyyyyyyyyy",data)
  const checkIn = () => {
    // setCheckInToggle(true)
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/checkinpermissionbyvendor/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };
  const checkOut = () => {
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/checkoutpermissionbyvendor/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

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
            <TextWrapper>
            </TextWrapper>
          </Root>
        </TextRoot>
      </TextMainWrapper>
      <Container maxWidth="lg">
        <Grid container  >
          <Grid xs={12}>
            <Item>
              <h4>Hotel Location</h4>
              <h4><i>{data.hotelname}</i></h4>
              <p>
                
                {data.area} , {data.state}</p>
              <Grid container  >
                <Grid xs={6}>
                  <h4>Customer Details</h4>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Name
                        </TableCell>
                        <TableCell align="right">{" "}
                          {data.customer && data.customer.name}{" "}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Email
                        </TableCell>
                        <TableCell align="right">{" "}
                          {data.customer && data.customer.email}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Contact
                        </TableCell>
                        <TableCell align="right">{" "}
                          {data.customer && data.customer.mobile}{" "}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Button variant="contained" endIcon={<PictureAsPdfIcon />} >Generate Invoice </Button>
                </Grid>
                <Grid xs={6}>
                  <h4>Booking Details</h4>
                  <Table aria-label="simple table">
                    <TableBody>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Adult
                        </TableCell>
                        <TableCell align="right">{data.adult}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Children
                        </TableCell>
                        <TableCell align="right">{data.children}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          Rooms
                        </TableCell>
                        <TableCell align="right">{data.noOfRooms}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          CheckIn Date
                        </TableCell>
                        <TableCell align="right">{data.checkIn}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          CheckOut Date
                        </TableCell>
                        <TableCell align="right">{data.checkOut}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Item>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default BookingHotelById;
