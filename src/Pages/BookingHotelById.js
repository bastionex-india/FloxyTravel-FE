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

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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
  padding-left: 40px;
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const HeadingWrapper = styled.div`
  position: relative;
  display: -webkit-box;
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #a5a5a5;
  margin: 23px 0px;
`;
const RecentlyUploadedHeader = styled.div`
  display: grid;
  grid-template-columns: 30% 20% 25% 25%;
  margin: 15px 2%;
  padding: 14px 15px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedHeaderElem = styled.div`
  color: #6c7074;
  padding-left: 4px;
`;
const RecentlyUploaded = styled.div`
  background: #fff;
  display: grid;
  grid-template-columns: 30% 20% 25% 25%;
  -webkit-box-align: center;
  align-items: center;
  margin: 15px 2%;
  padding: 14px 15px;
  box-shadow: 0px 0px 5px 5px #0000;
  border-radius: 5px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const DocInfo = styled.div`
  display: flex;
`;
const DocName = styled.div`
  margin-left: 4px;
  // font-weight: 600;
`;
const RecentlyUploadedDate = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
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

  // console.log(data, "vendor");
  const getAllUsers = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/vendor/getallbookingbyorderid/${authData.data.vendorId}/${state._id}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        // console.log(response.data.data);
        setData(response.data.data);
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
          <Root>
            <HeadingWrapper>
              <IconButton
                title="Back"
                onClick={() => navigate(-1)}
                size="small"
                sx={{
                  backgroundColor: "#e1e1e1",
                  color: "#01575c",
                  marginTop: "4px",
                }}
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <Heading>
                {" "}
                {data.type == "activity" ? "Activity" : "Hotel"} Booking Details
              </Heading>
            </HeadingWrapper>
          </Root>

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
                {data.isCombined && data.type == "activity" ? (
                  <p className="text-danger" style={{ width: "30%" }}>
                    This invoice is attached with hotel, You can generate this
                    invoice with respective hotel.
                  </p>
                ) : null}
                <Button
                  variant="contained"
                  onClick={generateInvoiceHandler}
                  endIcon={<PictureAsPdfIcon />}
                  disabled={data.isCombined && data.type == "activity"}
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
                          {data.customer != undefined &&
                          data.customer.title != undefined &&
                          data.customer.title
                            ? data.customer.title + "."
                            : ``}{" "}
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
                      {data.type == "activity" ? null : (
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
                      )}
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {data.type == "activity"
                            ? "Activity Date"
                            : "CheckIn Date"}
                        </TableCell>
                        <TableCell align="right">
                          {formatDate(data.checkIn)}
                        </TableCell>
                      </TableRow>
                      {data.type == "activity" ? null : (
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
                      )}
                    </TableBody>
                  </Table>
                </Grid>
                {data.isCombined && data.type === "hotel" && (
                  <>
                    <Line />
                    <Grid xs={8}>
                      <h4>Activity Details</h4>
                      <RecentlyUploadedHeader>
                        <RecentlyUploadedHeaderElem>
                          Acitivity Name
                        </RecentlyUploadedHeaderElem>
                        <RecentlyUploadedHeaderElem>
                          Activity Date
                        </RecentlyUploadedHeaderElem>
                        <RecentlyUploadedHeaderElem>
                          Number of Members
                        </RecentlyUploadedHeaderElem>
                        <RecentlyUploadedHeaderElem>
                          Number of Children
                        </RecentlyUploadedHeaderElem>
                      </RecentlyUploadedHeader>
                      {data.activities &&
                        data.activities.map((item, key) => {
                          return (
                            <RecentlyUploaded key={key}>
                              <DocInfo>
                                <DocName>{item.hotelname}</DocName>
                              </DocInfo>
                              <RecentlyUploadedDate>
                                {formatDate(item.checkIn)}
                              </RecentlyUploadedDate>
                              <RecentlyUploadedDate>
                                {item.adult}
                              </RecentlyUploadedDate>
                              <RecentlyUploadedDate>
                                {item.children}
                              </RecentlyUploadedDate>
                            </RecentlyUploaded>
                          );
                        })}
                    </Grid>
                  </>
                )}
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
              {data.type == "activity" ? "Activity attended" : "CheckIn"}
            </CheckinoutButton>
            <CheckinoutButton
              style={{
                margin: "0 10px",
                opacity: data !== "" && data.checkOutStatus ? 0.5 : 1,
                cursor:
                  data !== "" && data.checkOutStatus
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={() => checkOut()}
            >
              {data.type == "activity" ? "Activity completed" : "CheckOut"}
            </CheckinoutButton>
          </Container2>
      </Container>
    </>
  );
};

export default BookingHotelById;
