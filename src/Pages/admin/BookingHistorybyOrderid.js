import React from "react";

import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { environmentVariables } from "../../config/config";
import "./BookingHistorybyOrderid.css";
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
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import { format, parse } from 'date-fns';

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
const HeadingDiv = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const BookingHistorybyOrderid = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/admin/getallbookingbyorderid/${state._id}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        setIsLoading(false);
        setData(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, []);

  const generateInvoiceHandler = () => {
    navigate("/generateInvoice", { state: data });
  };
  function convertDateFormat(inputDate) {
    const possibleFormats = [
      'yyyy-MM-dd',
      'MM-dd-yyyy',
      'MM/dd/yyyy',
      'dd/MM/yyyy',
      'yyyy/MM/dd',
      // Add more date formats as needed
    ];
  
    let parsedDate;
    for (const formatString of possibleFormats) {
      parsedDate = parse(inputDate, formatString, new Date());
      if (!isNaN(parsedDate)) {
        break;
      }
    }
  
    if (isNaN(parsedDate)) {
      return ''; // Return an empty string or handle the error as needed
    }
  
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
  }
  function formatDate(timestamp) {
    const options = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(timestamp).toLocaleString('en-IN', options);
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
        {isLoading === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <CircularLoader></CircularLoader>
          </div>
        ) : (
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
                  {data.status === "pending" || data.status==="approved"
                    ? "Generate Invoice"
                    : "View Invoice"}
                </Button>
                </HeadingDiv>
                {/* <h4>
                  <i>{data.hotelname}</i>
                </h4>
                <p>
                  {data.area} , {data.state}
                </p> */}
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
                            {(data.customer!=undefined && data.customer.title!=undefined && data.customer.title) ? data.customer.title+'.' : ``} {data.customer && data.customer.name}{" "}
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
                            {(data.customer!=undefined && data.customer.countryCode != undefined && data.customer.countryCode) ? data.customer.countryCode+'-' : ''}{data.customer && data.customer.mobile}{" "}
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
                          <TableCell align="right">{formatDate(data.checkIn)}</TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            CheckOut Date
                          </TableCell>
                          <TableCell align="right">{formatDate(data.checkOut)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default BookingHistorybyOrderid;
