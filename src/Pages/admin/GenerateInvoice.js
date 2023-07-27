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
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from "@mui/lab";
// import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useRef } from "react";
import { format, parse, differenceInCalendarDays } from 'date-fns';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


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

const DatePickerStyled2 = styled(DatePicker)`
  border: 1px solid #0000001a;
  padding: 10px;
  width: 70%;
  border-radius: 7px;
  text-align:right;
`;

const Input = styled.input`
  border: 1px solid #0000001a;
  padding: 8px 0px;
  border-radius: 5px;
  text-align:right;
`;

const BilingDetailsContainer = styled.div``;
const DetailContainer = styled.div`
display: flex;
justify-content:space-between;
align-items:center;
text-align:center;
padding: 2px 0;
`;
const Detailkey = styled.text``;
const DetailValue = styled.text`
text-align:right;
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
  const [isSendInvoice, setIsSendInvoice] = useState(false);
  const [noofpersons, setNoofPerons] = useState(state.adult);
  const [noofchildren, setNoofChildren] = useState(state.children);
  const [noofrooms, setNoofRooms] = useState(state.noOfRooms);
  const [currency, setCurrency] = useState('INR');

  const [isBreakfast,setIsBreakfast] = useState(state.isBreakfast)
  const [isLunch,setIsLinch] = useState(state.isLunch);
  const [isDinner,setIsDinner] = useState(state.isDinner)

  console.log("state ",state);
  const sendInvoice = () => {
    // console.log(checkIn,checkOut,noofpersons,Number(noofchildren),noofrooms,state._id,amount.toString(),Number(discountAmount),new Date(checkIn).getTime(),new Date(checkOut).getTime())
    if (hotelPrice && Number(hotelPrice) - Number(discountAmount) > 0) {
      let amount = Number(hotelPrice) - Number(discountAmount);
      let data = {
        bookingID: state._id,
        amount: amount.toString(),
        discount: Number(discountAmount),
        checkIn: new Date(checkIn).getTime(),
        checkOut: new Date(checkOut).getTime(),
        persons: noofpersons,
        children: Number(noofchildren),
        rooms: noofrooms,
        currency: currency,
        isBreakfast,
        isLunch,
        isDinner
      };
      setIsSendInvoice(true)
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
          setIsSendInvoice(false)
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Invoice sent successfully",
              timer: "800",
            });
            navigate("/bookinghistoryofadmin");
          } else {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              timer: "800",
            });
          }
        })
        .catch((err) => {
          setIsSendInvoice(false)
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
  const handleChangePerson = (e) => {
    setNoofPerons(e.target.value)
  }
  const handleChangeChildren = (e) => {
    setNoofChildren(e.target.value)
  }
  const handleChangeRooms = (e) => {
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

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed

    if (
      keyCode === 8 || // Allow backspace key (key code 8)
      keyCode === 46 ||
      (keyCode >= 48 && keyCode <= 57) || // Allow numeric keys (0-9)
      (isCtrlPressed && keyValue === "r") || // Allow Ctrl+R combination
      keyCode === 37 || // Allow left arrow key (key code 37)
      keyCode === 39 // Allow right arrow key (key code 39)
    ) {
      // Check for plus (+) and minus (-) symbols
      if (keyValue === "+" || keyValue === "-") {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  };
  useEffect(() => {
    if (!checkIn) {
      setCheckIn(new Date(state.checkIn));
    }
    if (!checkOut) {
      setCheckOut(new Date(state.checkOut));
    }

  }, [state]);

  useEffect(() => {
    const parsedCheckInDate = moment(checkIn, 'MM/DD/YYYY', true);
    const parsedCheckOutDate = moment(checkOut, 'MM/DD/YYYY', true);

    if (parsedCheckInDate.isValid() && parsedCheckOutDate.isValid()) {
      const days = parsedCheckOutDate.diff(parsedCheckInDate, "days");
      setNumOfDays(days);
    } else {
      setNumOfDays(0);
    }
  }, [checkIn, checkOut, state]);
  const handleDiscountAmountChange = (e) => {
    if (Number(e.target.value) <= Number(hotelPrice)) {
      setDiscountAmount(e.target.value);
    }
  };
  console.log({isDinner,isLunch,isBreakfast})
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
            {state.status === "pending" || state.status === "approved" ? (
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

              <BilingDetailsContainer>
                <DetailContainer>
                  <Detailkey> Payment method </Detailkey>
                  <DetailValue>{payMethod.toUpperCase()}</DetailValue>
                </DetailContainer>

                <DetailContainer>
                  <Detailkey> CheckIn Date </Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={() => {
                              InputCheckIn.current.setOpen(true);
                            }}
                            style={{
                              position: "absolute",
                              top: "20%",
                              right: "54%",
                              zIndex: "99",
                              fontSize: "20px",
                              cursor: "pointer",
                            }}
                          >
                            <i class="fas fa-calendar-alt"></i>
                          </div>
                          <DatePickerStyled2
                            className=""
                            placeholderText=" CheckIn"
                            selected={checkIn}
                            onChange={handleCheckInChange}
                            selectsStartcheckIn
                            startDate={checkIn}
                            endDate={checkOut}
                            ref={InputCheckIn}
                            minDate={checkIn}

                          ></DatePickerStyled2>

                        </div>
                        :
                        <>
                          {moment(checkIn).format('DD/MM/YYYY')}
                        </>

                    }
                  </DetailValue>
                </DetailContainer>

                <DetailContainer>
                  <Detailkey> CheckOut Date  </Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={() => InputCheckOut.current.setOpen(true)}
                            style={{
                              top: "20%",
                              right: "54%",
                              zIndex: "99",
                              fontSize: "20px",
                              cursor: "pointer",
                              position: "absolute",
                            }}
                          >
                            <i class="fas fa-calendar-alt"></i>
                          </div>

                          <DatePickerStyled2
                            className=""
                            placeholderText=" CheckOut"
                            selected={checkOut}
                            onChange={handleCheckOutChange}
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            ref={InputCheckOut}
                          ></DatePickerStyled2>

                        </div>
                        :
                        <>
                          {moment(checkOut).format('DD/MM/YYYY')}
                        </>

                    }
                  </DetailValue>
                </DetailContainer>
                {
                  console.log("checkOut date", checkOut)
                }
                <DetailContainer>
                  <Detailkey> Number of Persons </Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
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
                            onKeyDown={handleKeyPress}
                          />
                        </FormControl>
                        :
                        <>
                          {noofpersons}
                        </>

                    }
                  </DetailValue>
                </DetailContainer>

                <DetailContainer>
                  <Detailkey> Number of Children </Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
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
                            onKeyDown={handleKeyPress}
                          />
                        </FormControl>
                        :
                        <>
                          {noofchildren}
                        </>

                    }

                  </DetailValue>
                </DetailContainer>

                <DetailContainer>
                  <Detailkey> Number of Rooms </Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
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
                            onKeyDown={handleKeyPress}
                          />
                        </FormControl>
                        :
                        <>{noofrooms}</>
                    }
                  </DetailValue>
                </DetailContainer>
                <DetailContainer>
                  <Detailkey> Breakfast for all guests</Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
                        <FormControl
                          sx={{ width: "80px" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox checked={isBreakfast} onChange={(e)=> setIsBreakfast(e.target.checked) } />
                        </FormControl>
                        :
                        <>
                        { isBreakfast ? "Yes":"No"}
                        </>
                    }
                  </DetailValue>
                </DetailContainer>
                <DetailContainer>
                  <Detailkey> Lunch for all guests</Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
                        <FormControl
                          sx={{ width: "80px" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox checked={isLunch} onChange={(e)=> setIsLinch(e.target.checked) } />
                        </FormControl>
                        :
                        <>
                        { isLunch ? "Yes":"No"}
                        </>
                    }
                  </DetailValue>
                </DetailContainer>
                <DetailContainer>
                  <Detailkey> Dinner for all guests</Detailkey>
                  <DetailValue>
                    {
                      state.status === "pending" || state.status === "approved" ?
                        <FormControl
                          sx={{ width: "80px" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox checked={isDinner} onChange={(e)=> setIsDinner(e.target.checked) } />
                        </FormControl>
                        :
                        <>
                        { isDinner ? "Yes":"No"}
                        </>
                    }
                  </DetailValue>
                </DetailContainer>
                <DetailContainer
                  style={{ padding: "6px 0" }}
                >
                  <Detailkey> Days </Detailkey>
                  <DetailValue
                  >{numOfDays}</DetailValue>
                </DetailContainer>
                <DetailContainer
                  style={{ padding: "6px 0" }}
                >
                  <Detailkey> Currency </Detailkey>
                  <DetailValue>
                    {state.status === "pending" || state.status === "approved" ?
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel checked={currency == 'INR' ? true : false} value="INR" onChange={() => { setCurrency('INR') }} control={<Radio
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 13,
                              },
                            }} />} label="INR" />
                          <FormControlLabel checked={currency == 'INR' ? false : true} value="USD" onChange={() => { setCurrency('USD') }} control={<Radio
                            sx={{
                              '& .MuiSvgIcon-root': {
                                fontSize: 13,
                              },
                            }} />} label="USD" />
                        </RadioGroup>
                      </FormControl>
                      :
                      <>
                        {state.currency != undefined ? state.currency : 'INR'}
                      </>
                    }
                  </DetailValue>
                </DetailContainer>

                <DetailContainer
                  style={{ padding: "10px 0" }}
                >
                  <Detailkey> Amount </Detailkey>
                  <DetailValue
                  >
                    <span style={{ fontSize: '14px', fontWeight: "bold", lineHeight: "37px", paddingRight: "10px" }}>{currency}</span>
                    {state.status === "pending" || state.status === "approved" ? (
                      <FormControl
                        sx={{ width: "80px" }}
                        variant="standard"
                        className="pull-right"
                      >
                        <Input
                          type="number"
                          onKeyDown={handleKeyPress}
                          id="standard-adornment-amount"
                          // startAdornment={
                          //   <InputAdornment position="start">
                          //     INR
                          //   </InputAdornment>
                          // }
                          size="small"
                          onChange={(e) => setHotelPrice(e.target.value)}
                          value={hotelPrice}
                        />
                      </FormControl>
                    ) : (
                      amount.toFixed(2)
                    )}


                  </DetailValue>
                </DetailContainer>

                <DetailContainer
                  style={{ padding: "8px 0" }}
                >
                  <Detailkey>
                    Discount Amount
                  </Detailkey>
                  <DetailValue
                  >
                    <span style={{ fontSize: '14px', fontWeight: "bold", lineHeight: "37px", paddingRight: "10px" }}>{currency}</span>
                    {state.status === "pending" || state.status === "approved" ? (
                      <FormControl
                        variant="standard"
                        className="pull-right"
                      >
                        <Input
                          type="number"
                          onKeyDown={handleKeyPress}
                          style={{ width: "80px" }}
                          id="standard-adornment-amount"
                          // startAdornment={
                          //   <InputAdornment position="end">
                          //     INR
                          //   </InputAdornment>
                          // }
                          size="small"
                          value={discountAmount}
                          onChange={handleDiscountAmountChange}

                        />
                      </FormControl>
                    ) : (
                      discount.toFixed(2)
                    )}

                  </DetailValue>
                </DetailContainer>


              </BilingDetailsContainer>

            </Item>
          </Grid>
        </Grid>
        <hr />
        <Grid container>
          <Grid xs={6}>
            <p style={{ fontSize: 'large', fontWeight: 'bolder' }}>
              <b>Total Amount</b>
            </p>
          </Grid>
          <Grid xs={6} className="pull-right">
            <p style={{ fontSize: 'x-large', fontWeight: 'bolder', color: 'green' }}>
              {currency}{" "}
              {state.status === "pending" || state.status === "approved"
                ? (Number(hotelPrice) - Number(discountAmount)).toFixed(2)
                : totalAmount.toFixed(2)}
            </p>
            {/* <p>INR {" "}{state.status === "pending"  || state.status === "approved"? "0.00" : totalAmount}</p>
                  <p>
                    INR{" "}
                    {state.status === "pending" || state.status === "approved"
                      ? Number(hotelPrice) - Number(discountAmount)
                      : "0.00"}
                  </p> */}
          </Grid>
        </Grid>
        {state.status === "pending" || state.status === "approved" ? (
          <Grid container style={{ margin: '30px 0px 30px' }}>
            <Grid xs={8}></Grid>
            <Grid xs={4} className="pull-right">
              <LoadingButton
                loading={isSendInvoice}
                disabled={(hotelPrice.length || !isSendInvoice) ? false : true}
                variant="contained"
                onClick={sendInvoiceHandler}

              >
                Send Invoice
              </LoadingButton>
            </Grid>
          </Grid>
        ) : null}
      </Container >
    </>
  );
};

export default GenerateInvoice;
