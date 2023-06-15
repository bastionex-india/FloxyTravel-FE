import React from "react";

import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { environmentVariables } from "../../config/config";
import "./GenerateInvoice.css";
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
import moment from "moment";
import logo from "../../Images/LogoDark.png";

// import Box from '@mui/material/Box';
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

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
const GenerateInvoice = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [discountAmount, setDiscountAmount] = useState(0);
  const hotelPrice = 200;
  console.log(state);
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
            <Heading>Generate Invoice</Heading>
          </div>
        </TextRoot>
      </TextMainWrapper>
      <Container maxWidth="lg">
        <Grid container>
          <Grid xs={12}>
            <Item className="p-500" style={{ padding: "20px" }}>
              <Grid container>
                <Grid xs={8}>
                  <img src={logo} height={100} />
                  <h5>{state.hotelname}</h5>
                  <p>
                    {state.area} , {state.state}
                  </p>
                </Grid>
                <Grid xs={4} className="pull-right">
                  <h2>INVOICE</h2>
                  <p>
                    <b>Invoice # :</b>
                    {state._id}
                  </p>
                  <p>
                    <b>Created :</b>
                    {moment().format("MM/DD/YYYY")}
                  </p>
                </Grid>
              </Grid>
              <hr />
              <Grid container>
                <Grid xs={12}>
                  <h5>Billing To</h5>
                  <p>{state.customer.name}</p>
                  <p>{state.customer.email}</p>
                  <p>{state.customer.mobile}</p>
                </Grid>
              </Grid>
              <hr />
              <Grid container>
                <Grid xs={6}>
                  <p>Booking Number</p>
                  <p>Booking Status</p>
                  <p>Payment method</p>
                  <p>CheckIn Date</p>
                  <p>CheckOut Date</p>
                  <p>Days</p>
                </Grid>
                <Grid xs={6} className="pull-right">
                  <p>665265</p>
                  <p>{state.status}</p>
                  <p>Online</p>
                  <p>{state.checkIn}</p>
                  <p>{state.checkOut}</p>
                  <p>
                    {moment(state.checkOut, "DD/MM/YYYY").diff(
                      moment(state.checkIn, "DD/MM/YYYY"),
                      "days"
                    )}
                  </p>
                </Grid>
                <Grid xs={6}>
                  <p>Pricing</p>
                </Grid>
                <Grid xs={2}>
                  <span>
                    ${hotelPrice} * $
                    {moment(state.checkOut, "DD/MM/YYYY").diff(
                      moment(state.checkIn, "DD/MM/YYYY"),
                      "days"
                    )}{" "}
                  </span>
                  <p>
                    <b>Discount Amount</b>
                  </p>
                </Grid>

                <Grid xs={4} className="pull-right">
                  <span>
                    $
                    {hotelPrice *
                      moment(state.checkOut, "DD/MM/YYYY").diff(
                        moment(state.checkIn, "DD/MM/YYYY"),
                        "days"
                      )}
                  </span>
                  <div className="form-group ">
                    <FormControl
                      sx={{ width: "80px" }}
                      variant="standard"
                      className="pull-right"
                    >
                      {/* <InputLabel htmlFor="standard-adornment-amount">Discount Amount</InputLabel> */}
                      <Input
                        id="standard-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        size="small"
                        onChange={(e) => setDiscountAmount(e.target.value)}
                      />
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
              <hr />
              <Grid container>
                <Grid xs={6}>
                  <p>
                    <b>Total</b>
                  </p>
                  <p>
                    <b>Paid</b>
                  </p>
                  <p>
                    <b>Due</b>
                  </p>
                </Grid>
                <Grid xs={6} className="pull-right">
                  <p>
                    $
                    {hotelPrice *
                      moment(state.checkOut, "DD/MM/YYYY").diff(
                        moment(state.checkIn, "DD/MM/YYYY"),
                        "days"
                      ) -
                      Number(discountAmount)}
                  </p>
                  <p>0.00</p>
                  <p>
                    $
                    {hotelPrice *
                      moment(state.checkOut, "DD/MM/YYYY").diff(
                        moment(state.checkIn, "DD/MM/YYYY"),
                        "days"
                      ) -
                      Number(discountAmount)}
                  </p>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs={8}></Grid>
                <Grid xs={4} className="pull-right">
                  <Button variant="contained">Send Invoice</Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GenerateInvoice;
