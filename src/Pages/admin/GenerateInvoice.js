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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Swal from "sweetalert2";
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
import { useRef } from "react";
import { format, parse, differenceInCalendarDays  } from 'date-fns';

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
  const [hotelPrice, setHotelPrice] = useState("");
  // api data
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [payMethod, setPayMethod] = useState("online");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const InputCheckIn = useRef(null);
  const InputCheckOut = useRef(null);
  const [numOfDays, setNumOfDays] = useState(0);
  const [noofpersons, setNoofPerons] = useState(state.adult);
  const [noofchildren, setNoofChildren] = useState(state.children);
  const [noofrooms, setNoofRooms] = useState(state.noOfRooms);


  const sendInvoice = () => {
    // console.log(checkIn,checkOut,noofpersons,Number(noofchildren),noofrooms,state._id,amount.toString(),Number(discountAmount),new Date(checkIn).getTime(),new Date(checkOut).getTime())
    if (hotelPrice && Number(hotelPrice) - Number(discountAmount) > 0) {
      let amount = Number(hotelPrice) - Number(discountAmount);
      let data = {
        bookingID: state._id,
        amount: amount.toString(),
        discount: Number(discountAmount),
        checkIn:new Date(checkIn).getTime(),
        checkOut:new Date(checkOut).getTime(),
        persons:noofpersons,
        children:Number(noofchildren),
        rooms:noofrooms,
      };
      let config = {
        method: "post",
        url: `${environmentVariables.apiUrl}/admin/sendInvoice`,
        headers: {
          _token: authData.data.token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Invoice sent successfully",
              timer: "800",
            });
            navigate('/bookinghistoryofadmin');
          } else {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              timer: "800",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.response.data.message,
            timer: "800",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid amount",
        timer: "800",
      });
    }
  };
  
  const sendInvoiceHandler = () => {
    sendInvoice();
  };
  const getPaymentdetail = () => {
    // setAmount(20)
    // setDiscount(2)
    // setTotalAmount(18)
    let url =
      authData.data.isadmin === "true"
        ?
         `${environmentVariables.apiUrl}/admin/getPaymentdetail`
        : 
        `${environmentVariables.apiUrl}/vendor/getPaymentdetail`;
    let requestBody = {
      bookingID: state._id,
    };
    let config = {
      method: "post",
      url: url,
      headers: {
        _token: authData.data.token,
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status) {
          let responsedata = response.data.data;
          setAmount(+responsedata.payAmount + +responsedata.discount);
          setDiscount(+responsedata.discount);
          setTotalAmount(+responsedata.payAmount);
          setPayMethod(responsedata.paymentStatus[0].method);
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.message,
            timer: "800",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          timer: "800",
        });
      });
  };
  useEffect(() => {
    if (state.status !== "pending") {
      getPaymentdetail();
    }
  });
  const handleCheckInChange = (date) => {
    setCheckIn(date);
    
    if (checkOut && date > checkOut) {
      setNumOfDays(0);
      setCheckOut(null);
    }
  };
  
  const handleCheckOutChange = (date) => {
    setCheckOut(date);
  };
  const handleChangePerson=(e)=>{
    setNoofPerons(e.target.value)
  }
  const handleChangeChildren=(e)=>{
    setNoofChildren(e.target.value)
  }
  const handleChangeRooms=(e)=>{
    setNoofRooms(e.target.value)
  }

  // useEffect(() => {
  //   if (state) {
  //     const parsedDatecheckIn = moment(state.checkIn, ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM-DD-YYYY'], true);
  //     const parsedDatecheckOut = moment(state.checkOut, ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MM-DD-YYYY'], true);
  //     if (parsedDatecheckIn.isValid()) {
  //       setCheckIn(parsedDatecheckIn.toDate());
  //     }
  //     if(parsedDatecheckOut.isValid()){
  //       setCheckOut(parsedDatecheckOut.toDate());
  //     }
  //   }
  // }, [state]);

  // useEffect(() => {
  //   const parsedCheckInDate = parse(checkIn, 'dd/MMM/yyyy', new Date());
  //   const parsedCheckOutDate = parse(checkOut, 'dd/MMM/yyyy', new Date());

  //   if (parsedCheckInDate && parsedCheckOutDate) {
  //     const days = differenceInCalendarDays(parsedCheckOutDate, parsedCheckInDate);
  //     setNumOfDays(days);
  //   } else {
  //     setNumOfDays(0);
  //   }
  // }, [checkIn, checkOut]);
 
  useEffect(() => {
    if (!checkIn) {
      setCheckIn(new Date(state.checkIn));
    }
    if (!checkOut) {
      setCheckOut(new Date(state.checkOut));
    }
    
  }, [state]);
  // console.log(state.checkIn,checkIn,checkOut)
   useEffect(() => {
    const parsedCheckInDate = moment(checkIn, 'MM/DD/YYYY', true);
    const parsedCheckOutDate = moment(checkOut, 'MM/DD/YYYY', true);

    if (parsedCheckInDate.isValid() && parsedCheckOutDate.isValid()) {
      const days = parsedCheckOutDate.diff(parsedCheckInDate, 'days');
      setNumOfDays(days);
    } else {
      setNumOfDays(0);
    }
  }, [checkIn, checkOut,state]);
  
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
            {state.status === "pending" ? (
              <Heading>Generate Invoice</Heading>
            ) : (
              <Heading>View Invoice</Heading>
            )}
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
                    <b>Invoice Number :</b>
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
                  {/* <p>Booking Number</p>
                  <p>Booking Status</p> */}
                  <p>Payment method</p>
                  <p>CheckIn Date</p>
                  <p>CheckOut Date</p>
                  <p>Number of Persons</p>
                  <p>Number of Children</p>
                  <p>Number of Rooms</p>
                  <p>Days</p>
                  <p>Amount</p>
                  <p>Discount Amount</p>
                </Grid>
                <Grid xs={6} className="pull-right">
                  {/* <p>{state._id}</p>
                  <p>{state.status}</p> */}
                  <p>{payMethod}</p>
                  <div style={{position:"relative"}}>
                  {/* <DatePicker selected={selectedDate} onChange={handleChange} dateFormat="dd/MM/yyyy" /> */}
                  {/* <DatePicker selected={selectedDate} onChange={handleChange} dateFormat="dd/MM/yyyy" /> */}
                  {/* <DatePicker selected={checkIn} onChange={handleCheckInChange} dateFormat="dd/MM/yyyy" /> */}
                  <DatePicker
                      className=""
                      placeholderText=" CheckIn"
                      // dateFormat="dd/MM/yyyy"
                      selected={checkIn}
                      onChange={handleCheckInChange}
                      selectsStartcheckIn
                      startDate={checkIn}
                      endDate={checkOut}
                      // maxDate={checkOut}
                      ref={InputCheckIn}
                      minDate={checkIn}
                    ></DatePicker>
                    <div
                      onClick={() => {
                        // alert("sadasd")
                        InputCheckIn.current.setOpen(true);
                      }}
                      style={{
                        position: "absolute",
                        // zIndex: "999999",
                        top: "-4%",
                        left: "95%",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    >
                      <i class="fas fa-calendar-alt"></i>
                    </div>
                  </div>
                  <div style={{position:"relative"}}>
                  <DatePicker
                      className=""
                      placeholderText=" CheckOut"
                      // dateFormat="dd/MM/yyyy"
                      selected={checkOut}
                      onChange={handleCheckOutChange}
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn}
                      ref={InputCheckOut}
                      //   width='100px'
                      // styled={{ width: "98%",backgroundColor:'red',color:'green'}}
                    ></DatePicker>
                    <div
                      onClick={() => InputCheckOut.current.setOpen(true)}
                      style={{
                        top: "10%",
                        left: "90%",
                        fontSize: "20px",
                        cursor: "pointer",
                        position: "absolute",
                      }}
                    >
                      <i class="fas fa-calendar-alt"></i>
                    </div>
                  </div>
                  {/* <p>{state.checkIn}</p>
                  <p>{state.checkOut}</p> */}
                  {/* <p>{state.adult}</p> */}
                  {/* <InputWrapper> */}
                  <p>
                  <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                       <Input
                      type="number"
                      placeholder="Total persons*"
                      name="noofpersons"
                      value={noofpersons}
                      onChange={handleChangePerson}
                    />
                  </FormControl>
                  </p>
                  <p>
                  <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                       <Input
                      type="number"
                      placeholder="Total Children*"
                      name="noofchildren"
                      value={noofchildren}
                      onChange={handleChangeChildren}
                    />
                  </FormControl>
                  </p>
                  {/* </InputWrapper> */}
                  {/* <p>{state.noOfRooms}</p> */}
                 <p>
                 <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                       <Input
                      type="number"
                      placeholder="Total rooms*"
                      name="noofrooms"
                      value={noofrooms}
                      onChange={handleChangeRooms}
                    />
                  </FormControl>
                 </p>
                  <p>
                    {/* {moment(state.checkOut, "DD/MM/YYYY").diff(
                      moment(state.checkIn, "DD/MM/YYYY"),
                      "days"
                    )} */}
                    {numOfDays}
                  </p>
                  <p>
                    {state.status === "pending" ? (
                      <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                        {/* <InputLabel>Discount Amount</InputLabel> */}
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">INR</InputAdornment>
                          }
                          size="small"
                          onChange={(e) => setHotelPrice(e.target.value)}
                        />
                      </FormControl>
                    ) : (
                      amount
                    )}
                  </p>
                  <p>
                    {state.status === "pending" ? (
                      <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                        {/* <InputLabel >Discount Amount</InputLabel> */}
                        <Input
                          id="standard-adornment-amount"
                          startAdornment={
                            <InputAdornment position="start">INR</InputAdornment>
                          }
                          size="small"
                          onChange={(e) => setDiscountAmount(e.target.value)}
                        />
                      </FormControl>
                    ) : (
                      discount
                    )}
                  </p>
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
                    {state.status === "pending"
                      ? Number(hotelPrice) - Number(discountAmount)
                      : totalAmount}
                  </p>
                  <p>${state.status === "pending" ? "0.00" : totalAmount}</p>
                  <p>
                    $
                    {state.status === "pending"
                      ? Number(hotelPrice) - Number(discountAmount)
                      : "0.00"}
                  </p>
                </Grid>
              </Grid>
              {state.status === "pending" ? (
                <Grid container>
                  <Grid xs={8}></Grid>
                  <Grid xs={4} className="pull-right">
                    <Button
                      disabled={hotelPrice.length ? false : true}
                      variant="contained"
                      onClick={sendInvoiceHandler}
                    >
                      Send Invoice
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GenerateInvoice;
