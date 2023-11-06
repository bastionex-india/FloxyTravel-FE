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
import Checkbox from "@mui/material/Checkbox";
import { LoadingButton } from "@mui/lab";
// import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { useRef } from "react";
import { format, parse, differenceInCalendarDays } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { io } from "socket.io-client";

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
  border-radius: 7px;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid #0000001a;
  padding: 8px 11px;
  border-radius: 5px;
  text-align: left;
`;

const TableCellStyle = styled(TableCell)`
  width: 30% !important;
  font-weight: 700 !important;
  background-color: #01575c !important;
  color: white !important;
`;

const BilingDetailsContainer = styled.div``;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  // text-align: center;
  // padding: 2px 0;
`;
const Detailkey = styled.text``;
const DetailValue = styled.text`
  text-align: right;
`;
const MainContainer = styled.div`
  width: 1250px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: red;
`;
const MainContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: white;
  padding: 3% 5%;
`;
const ChildContainer0 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;
const ChildContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const First = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: 600;
`;
const Second = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 15px;
`;
const Address = styled.div`
  display: flex;
`;
const InvoiceNo = styled.div`
  display: flex;
  align-items: center;
`;
const InvoiceNoHeading = styled.div`
  color: #01575c;
  font-size: 18px;
  font-weight: 700;
`;
const InvoiceNoText = styled.div`
  padding: 0px 10px;
  font-size: 15px;
  font-weight: 600;
`;
const InvoiceDate = styled.div``;
const ChildContainer2 = styled.div`
  margin: 25px 0px;
`;
const HeadingText = styled.div`
  font-size: 18px;
  color: #01575c;
  font-weight: 700;
`;
const GuestName = styled.div``;
const GuestAddress = styled.div``;
const GuestPhone = styled.div``;
const GuestEmail = styled.div``;
const ChildContainer3 = styled.div``;
const Wrapper1 = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0px;
`;
const CheckInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const CheckInHeading = styled.div`
  // padding: 0px 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: normal;
  ${(p) =>
    p.xyz &&
    `
  margin-left:5px;
  `}
`;
const CheckInValue = styled.div``;
const Wrapper2 = styled.div`
  display: flex;
`;
const HotelDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0px;
`;
const Wrapper3 = styled.div`
  display: flex;
  margin: 10px 0px;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`;
const ChildContainer4 = styled.div``;
const TabularData = styled.div`
  margin: 13px 0px;
`;
const HotelInputPrice = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
`;
const TotalActivitiesPrice = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
`;
const TotalDiscountPrice = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
`;
const TotalPayblePrice = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  align-items: center;
`;
const HotelInputPriceHeading = styled.div`
  color: #01575c;
  font-size: 20px;
  font-weight: 700;
`;
const HotelInputPriceValue = styled.div``;
const ChildContainer6 = styled.div`
  text-align: right;
  margin: 15px 0px 60px 0px;
`;
const ChildContainer5 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 12px;
`;
const boldTextCss = {
  fontWeight: 700,
  backgroundColor: "#01575c",
  color: "white",
  width: "20%",
};

const socket = io(`${environmentVariables?.apiUrl}`);
const GenerateInvoice = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [discountAmount, setDiscountAmount] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);
  // api data
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [payMethod, setPayMethod] = useState("upi");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const InputCheckIn = useRef(null);
  const InputCheckOut = useRef(null);
  const [numOfDays, setNumOfDays] = useState(0);
  const [isSendInvoice, setIsSendInvoice] = useState(false);
  const [noofpersons, setNoofPerons] = useState(state.adult);
  const [noofchildren, setNoofChildren] = useState(state.children);
  const [noofrooms, setNoofRooms] = useState(state.noOfRooms);
  const [currency, setCurrency] = useState("INR");

  const [isBreakfast, setIsBreakfast] = useState(state.isBreakfast);
  const [isLunch, setIsLinch] = useState(state.isLunch);
  const [isDinner, setIsDinner] = useState(state.isDinner);
  const [activitiesData, setActivitiesData] = useState(state.activities);
  const [activityAdult, setActivityAdult] = useState("");
  const [totalActivitiesAmount, setTotalActivitiesAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [allActivitiesData, setAllActivitiesData] = useState([]);
  // const [sendInvoiceEnabled, setSendInvoiceEnabled] = useState(false);

  console.log(
    hotelPrice,
    totalActivitiesAmount,
    totalDiscountAmount,
    totalPayableAmount,
    typeof totalDiscountAmount
  );
  const sendInvoice = () => {
    // console.log(checkIn,checkOut,noofpersons,Number(noofchildren),noofrooms,state._id,amount.toString(),Number(discountAmount),new Date(checkIn).getTime(),new Date(checkOut).getTime())
    // console.log(state._id,totalPayableAmount,Number(totalDiscountAmount),new Date(checkIn).getTime(),noofpersons,Number(noofchildren),currency,state.type !== undefined ? state.type : "hotel",new Date(checkOut).getTime(),noofrooms,activitiesData)
    const limitedFieldsArray = activitiesData.map(
      ({ _id, checkIn, adult, children, price }) => ({
        _id,
        checkIn: Number(checkIn),
        adult,
        children,
        price,
        includeWithHotel: true,
        discount: "0",
      })
    );

    // console.log(limitedFieldsArray);
    if (hotelPrice && Number(hotelPrice) - Number(discountAmount) > 0) {
      let amount = Number(hotelPrice) - Number(discountAmount);
      let data = {
        bookingID: state._id,
        amount: hotelPrice.toString(),
        discount: Number(totalDiscountAmount),
        checkIn: new Date(checkIn).getTime(),
        persons: noofpersons,
        children: Number(noofchildren),
        currency: currency,
        isBreakfast: false,
        isLunch: false,
        isDinner: false,
        isCombined: false,
        type: state.type !== undefined ? state.type : "hotel",
      };
      if (state.type === "hotel") {
        data.checkOut = new Date(checkOut).getTime();
        data.rooms = noofrooms;
        data.isBreakfast = isBreakfast;
        data.isLunch = isLunch;
        data.isDinner = isDinner;
      }
      if (limitedFieldsArray.length !== 0) {
        data.activities = limitedFieldsArray;
        data.isCombined = true;
        data.totalActivitiesAmount = totalActivitiesAmount;
      }
      setIsSendInvoice(true);
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
          setIsSendInvoice(false);
          if (response.data.status) {
            Swal.fire({
              icon: "success",
              title: "Invoice sent successfully",
              timer: "800",
            });
            let redirect =
              state.type !== undefined && state.type === "activity"
                ? "/activityBookings"
                : "/bookinghistoryofadmin";
            navigate(redirect);
            socket.emit("admin_booking_approved");
          } else {
            Swal.fire({
              icon: "error",
              title: response.data.message,
              timer: "800",
            });
          }
        })
        .catch((err) => {
          setIsSendInvoice(false);
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
    const limitedFieldsArray = activitiesData.map(({ _id }) => ({
      _id,
    }));
    let url =
      authData.data.isadmin === "true"
        ? `${environmentVariables.apiUrl}/admin/getPaymentdetail`
        : `${environmentVariables.apiUrl}/vendor/getPaymentdetail`;
    let requestBody = {
      bookingID: state._id,
    };
    if (limitedFieldsArray.length !== 0) {
      requestBody.activities = limitedFieldsArray;
    }
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
          // console.log({responsedata.hotelPaymentDetail});
          if (responsedata.activitiesPaymentDetails) {
            const totalActivitiesAmountAmount =
              responsedata.activitiesPaymentDetails.reduce(
                (total, payment) => total + payment.payAmount,
                0
              );
            setAllActivitiesData(responsedata.activitiesPaymentDetails);
            setTotalActivitiesAmount(totalActivitiesAmountAmount);

            setHotelPrice(
              responsedata.hotelPaymentDetail.payAmount +
                responsedata.hotelPaymentDetail.discount
            );
            setTotalPayableAmount(
              responsedata.hotelPaymentDetail.payAmount +
                totalActivitiesAmountAmount
            );
          } else {
            setHotelPrice(
              responsedata.hotelPaymentDetail.payAmount +
                responsedata.hotelPaymentDetail.discount
            );
            setTotalPayableAmount(responsedata.hotelPaymentDetail.payAmount);
          }
          setTotalDiscountAmount(
            Number(+responsedata.hotelPaymentDetail.discount)
          );

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
  }, [state]);
  useEffect(() => {
    // console.log(activitiesData)
    const sum = activitiesData.reduce(
      (acc, item) => acc + Number(item.price),
      0
    );
    setTotalActivitiesAmount(sum);
  }, [activitiesData]);
  useEffect(() => {
    if (state.isCombined) {
      if (state.status === "pending" || state.status === "approved") {
        setTotalPayableAmount(
          Number(hotelPrice) +
            Number(totalActivitiesAmount) -
            Number(totalDiscountAmount)
        );
      }
    } else {
      if (state.status === "pending" || state.status === "approved") {
        setTotalPayableAmount(Number(hotelPrice) - Number(totalDiscountAmount));
      }
    }
  }, [hotelPrice, totalActivitiesAmount, totalDiscountAmount]);

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
    setNoofPerons(e.target.value);
  };
  const handleChangeChildren = (e) => {
    setNoofChildren(e.target.value);
  };
  const handleChangeRooms = (e) => {
    setNoofRooms(e.target.value);
  };

  const handleChangeActivityAdult = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.adult = event.target.value;
      }

      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };
  const handleChangeActivityChildren = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.children = event.target.value;
      }
      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };
  const handleActiveDateChange = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.checkIn = event;
      }
      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };
  const handleActiveCheckedIn = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.isChecked = event.target.checked;
      }
      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };
  const handleChangeActivityPrice = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.price = event.target.value;
      }
      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };

  const handleChangeActivityDiscountPrice = (event, item) => {
    let collectAllActivities = [];
    for (let index = 0; index < activitiesData.length; index++) {
      let element = activitiesData[index];
      if (element._id === item._id) {
        element.discountPrice = event.target.value;
      }
      collectAllActivities.push(element);
    }
    setActivitiesData(collectAllActivities);
    // setActivityAdult(event.target.value);
  };

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
    const parsedCheckInDate = moment(checkIn, "MM/DD/YYYY", true);
    const parsedCheckOutDate = moment(checkOut, "MM/DD/YYYY", true);

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
  const handleHotelPriceChange = (e) => {
    setHotelPrice(e.target.value);
  };

  const handleTotalDiscountAmountChange = (e) => {
    const newDiscountAmount = e.target.value;

    if (
      Number(newDiscountAmount) <=
      Number(hotelPrice) + Number(totalActivitiesAmount)
    ) {
      setTotalDiscountAmount(newDiscountAmount);
    } else {
      // Optionally, you can show a message or handle the situation in some way
      // For example, you can set an error state or display an error message
      console.error("Discount amount cannot be less than hotel price");
    }
  };

  // useEffect(() => {
  //   if (state.isCombined) {
  //     setSendInvoiceEnabled(hotelPrice > 0 && totalActivitiesAmount > 0);
  //   } else {
  //     setSendInvoiceEnabled(hotelPrice > 0);
  //   }
  // }, [state.isCombined, hotelPrice, totalActivitiesAmount]);

  const sendInvoiceEnabled = () => {
    if (state.isCombined) {
      return (
        hotelPrice > 0 && activitiesData.every((activity) => activity.price > 0)
      );
    } else {
      return hotelPrice > 0;
    }
  };

  // console.log({ isDinner, isLunch, isBreakfast, state, allActivitiesData });
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
      <MainContainer>
        <MainContainer1>
          <ChildContainer0>
            <First>
              <img src={logo} height={100} />
            </First>
          </ChildContainer0>
          <ChildContainer1>
            <First>
              <Address>B2 Sec-4, Noida, Uttar Pradesh 201301, India</Address>
              <Address>8880036677</Address>
              <Address>https://travel.floxypay.com/</Address>
            </First>
            <Second>
              <InvoiceNo>
                <InvoiceNoHeading>Invoice No:</InvoiceNoHeading>
                <InvoiceNoText>
                  INV-{state.invoiceNumber.toString().padStart(9, 0)}
                </InvoiceNoText>
              </InvoiceNo>
              {/* <InvoiceDate>
                <InvoiceNoHeading>Invoice :</InvoiceNoHeading>
                <InvoiceNoText></InvoiceNoText>
              </InvoiceDate> */}
            </Second>
          </ChildContainer1>
          <ChildContainer2>
            <HeadingText>Customer Details : </HeadingText>
            <ChildContainer1>
              <First>
                <GuestName>
                  Name : {state.customer.title}. {state.customer.name}
                </GuestName>
                {/* <GuestAddress>8880036677</GuestAddress> */}
                <GuestPhone>
                  Phone : {state.customer.countryCode}-{state.customer.mobile}
                </GuestPhone>
                <GuestEmail>Email : {state.customer.email}</GuestEmail>
              </First>
            </ChildContainer1>
          </ChildContainer2>
          {state.type === "hotel" && (
            <ChildContainer3>
              <HeadingText>Hotel Details : </HeadingText>
              <HotelDetailsWrapper>
                <Wrapper1>
                  <CheckInWrapper>
                    <CheckInHeading>
                      {state.type === "activity"
                        ? "Activity Date"
                        : "CheckIn Date"}
                    </CheckInHeading>
                    <CheckInValue>
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <div style={{ position: "relative" }}>
                          <div
                            onClick={() => {
                              InputCheckIn.current.setOpen(true);
                            }}
                            style={{
                              position: "absolute",
                              top: "20%",
                              left: "10%",
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
                      ) : (
                        <>{moment(checkIn).format("DD/MM/YYYY")}</>
                      )}
                    </CheckInValue>
                  </CheckInWrapper>
                  {state.type === "activity" ? null : (
                    <>
                      <CheckInWrapper>
                        <CheckInHeading> CheckOut Date </CheckInHeading>
                        <CheckInValue>
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <div style={{ position: "relative" }}>
                              <div
                                onClick={() =>
                                  InputCheckOut.current.setOpen(true)
                                }
                                style={{
                                  top: "20%",
                                  left: "10%",
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
                          ) : (
                            <>{moment(checkOut).format("DD/MM/YYYY")}</>
                          )}
                        </CheckInValue>
                      </CheckInWrapper>
                    </>
                  )}
                  <CheckInWrapper>
                    <CheckInHeading>Days</CheckInHeading>
                    <CheckInValue style={{ fontWeight: 600 }}>
                      {numOfDays}
                    </CheckInValue>
                  </CheckInWrapper>
                </Wrapper1>
                <Wrapper2>
                  {state.type === "activity" ? null : (
                    <>
                      <CheckInWrapper>
                        <CheckInHeading> Number of Rooms </CheckInHeading>
                        <CheckInValue>
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <FormControl
                              sx={{ width: "71%" }}
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
                          ) : (
                            <>{noofrooms}</>
                          )}
                        </CheckInValue>
                      </CheckInWrapper>
                    </>
                  )}
                  <CheckInWrapper>
                    <CheckInHeading> Number of Persons </CheckInHeading>
                    <CheckInValue>
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <FormControl
                          sx={{ width: "71%" }}
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
                      ) : (
                        <>{noofpersons}</>
                      )}
                    </CheckInValue>
                  </CheckInWrapper>

                  <CheckInWrapper>
                    <CheckInHeading> Number of Children </CheckInHeading>
                    <CheckInValue>
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <FormControl
                          sx={{ width: "71%" }}
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
                      ) : (
                        <>{noofchildren}</>
                      )}
                    </CheckInValue>
                  </CheckInWrapper>
                </Wrapper2>
                <Wrapper3>
                  <CheckBoxWrapper>
                    <CheckInValue>Breakfast </CheckInValue>
                    <CheckInHeading xyz>
                      {" "}
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <FormControl
                          sx={{ width: "70%" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox
                            checked={isBreakfast}
                            onChange={(e) => setIsBreakfast(e.target.checked)}
                          />
                        </FormControl>
                      ) : (
                        <>{isBreakfast ? "Yes" : "No"}</>
                      )}{" "}
                    </CheckInHeading>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckInValue>Lunch </CheckInValue>
                    <CheckInHeading xyz>
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <FormControl
                          sx={{ width: "70%" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox
                            checked={isLunch}
                            onChange={(e) => setIsLinch(e.target.checked)}
                          />
                        </FormControl>
                      ) : (
                        <>{isLunch ? "Yes" : "No"}</>
                      )}
                    </CheckInHeading>
                  </CheckBoxWrapper>
                  <CheckBoxWrapper>
                    <CheckInValue>Dinner </CheckInValue>
                    <CheckInHeading xyz>
                      {state.status === "pending" ||
                      state.status === "approved" ? (
                        <FormControl
                          sx={{ width: "70%" }}
                          variant="standard"
                          className="pull-right"
                        >
                          <Checkbox
                            checked={isDinner}
                            onChange={(e) => setIsDinner(e.target.checked)}
                          />
                        </FormControl>
                      ) : (
                        <>{isDinner ? "Yes" : "No"}</>
                      )}
                    </CheckInHeading>
                  </CheckBoxWrapper>
                </Wrapper3>
              </HotelDetailsWrapper>
            </ChildContainer3>
          )}
          {/* <HotelInputPrice>
            <DetailContainer style={{ padding: "10px 0" }}>
              <Detailkey> Hotel Amount </Detailkey>
              <DetailValue>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "37px",
                    paddingRight: "10px",
                  }}
                >
                  {currency}
                </span>
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
            <DetailContainer style={{ padding: "8px 0" }}>
              <Detailkey>Discount Amount</Detailkey>
              <DetailValue>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "37px",
                    paddingRight: "10px",
                  }}
                >
                  {currency}
                </span>
                {state.status === "pending" || state.status === "approved" ? (
                  <FormControl variant="standard" className="pull-right">
                    <Input
                      type="number"
                      onKeyDown={handleKeyPress}
                      style={{ width: "80px" }}
                      id="standard-adornment-amount"
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
          </HotelInputPrice> */}
          {state.type === "activity" && (
            <ChildContainer4>
              <HeadingText>Activity Details : </HeadingText>
              <TabularData>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCellStyle>Activity Name</TableCellStyle>
                        <TableCellStyle align="left">
                          Activity Date
                        </TableCellStyle>
                        <TableCellStyle align="left">
                          Total Adults
                        </TableCellStyle>
                        <TableCellStyle align="left">
                          Total Children
                        </TableCellStyle>
                        <TableCellStyle align="left">Price</TableCellStyle>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {state.hotelname}
                        </TableCell>
                        <TableCell align="left">
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <div style={{ position: "relative" }}>
                              <div
                                onClick={() => {
                                  InputCheckIn.current.setOpen(true);
                                }}
                                style={{
                                  position: "absolute",
                                  top: "20%",
                                  left: "10%",
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
                          ) : (
                            <>{formatDate(checkIn)}</>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <FormControl
                              sx={{ width: "71%" }}
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
                          ) : (
                            <>{noofpersons}</>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <FormControl
                              sx={{ width: "71%" }}
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
                          ) : (
                            <>{noofchildren}</>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {state.status === "pending" ||
                          state.status === "approved" ? (
                            <FormControl
                              sx={{ width: "71%" }}
                              variant="standard"
                              className="pull-right"
                            >
                              <Input
                                type="number"
                                placeholder="Price*"
                                name="price"
                                onChange={(e) => setHotelPrice(e.target.value)}
                                value={hotelPrice}
                              />
                            </FormControl>
                          ) : (
                            <>{Number(hotelPrice).toFixed(2)}</>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabularData>
            </ChildContainer4>
          )}
          {state.isCombined && (
            <ChildContainer4>
              <HeadingText>Activity Details : </HeadingText>
              <TabularData>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCellStyle>Activity Name</TableCellStyle>
                        <TableCellStyle align="left">
                          Activity Date
                        </TableCellStyle>
                        <TableCellStyle align="left">
                          Total Adults
                        </TableCellStyle>
                        <TableCellStyle align="left">
                          Total Children
                        </TableCellStyle>
                        <TableCellStyle align="left">Price</TableCellStyle>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.status === "pending" || state.status === "approved"
                        ? activitiesData &&
                          activitiesData.map((item, key) => {
                            return (
                              <TableRow
                                key={key}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {item.hotelname}
                                </TableCell>
                                <TableCell align="left">
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <div style={{ position: "relative" }}>
                                      <div
                                        onClick={() => {
                                          InputCheckIn.current.setOpen(true);
                                        }}
                                        style={{
                                          position: "absolute",
                                          top: "20%",
                                          left: "10%",
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
                                        selected={new Date(item.checkIn)}
                                        onChange={(event) =>
                                          handleActiveDateChange(event, item)
                                        }
                                        selectsStartcheckIn
                                        startDate={checkIn}
                                        endDate={checkOut}
                                        ref={InputCheckIn}
                                        minDate={checkIn}
                                        maxDate={checkOut}
                                      ></DatePickerStyled2>
                                    </div>
                                  ) : (
                                    <>{formatDate(item.checkIn)}</>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Total Adults*"
                                        name="adults"
                                        value={item.adult}
                                        onChange={(event) =>
                                          handleChangeActivityAdult(event, item)
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.adult}</>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Total Children*"
                                        name="children"
                                        value={item.children}
                                        onChange={(event) =>
                                          handleChangeActivityChildren(
                                            event,
                                            item
                                          )
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.children}</>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Price*"
                                        name="price"
                                        value={item.price || ""}
                                        onChange={(event) =>
                                          handleChangeActivityPrice(event, item)
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.children}</>
                                  )}
                                </TableCell>
                                {/* <TableCell align="right">
                                <FormControl
                                  sx={{ width: "70%" }}
                                  variant="standard"
                                  className="pull-right"
                                >
                                  <Checkbox
                                    checked={item.isChecked}
                                    onChange={(event) =>
                                      handleActiveCheckedIn(event, item)
                                    }
                                  />
                                </FormControl>
                              </TableCell> */}
                              </TableRow>
                            );
                          })
                        : allActivitiesData.length !== 0 &&
                          allActivitiesData.map((item, key) => {
                            return (
                              <TableRow
                                key={key}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {item.bookinghistory.hotelname}
                                </TableCell>
                                <TableCell align="left">
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <div style={{ position: "relative" }}>
                                      <div
                                        onClick={() => {
                                          InputCheckIn.current.setOpen(true);
                                        }}
                                        style={{
                                          position: "absolute",
                                          top: "20%",
                                          left: "10%",
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
                                        selected={new Date(item.checkIn)}
                                        onChange={(event) =>
                                          handleActiveDateChange(event, item)
                                        }
                                        selectsStartcheckIn
                                        startDate={checkIn}
                                        endDate={checkOut}
                                        ref={InputCheckIn}
                                        minDate={checkIn}
                                        maxDate={checkOut}
                                      ></DatePickerStyled2>
                                    </div>
                                  ) : (
                                    <>
                                      {formatDate(item.bookinghistory.checkIn)}
                                    </>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Total Adults*"
                                        name="adults"
                                        value={item.adult}
                                        onChange={(event) =>
                                          handleChangeActivityAdult(event, item)
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.bookinghistory.adult}</>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Total Children*"
                                        name="children"
                                        value={item.children}
                                        onChange={(event) =>
                                          handleChangeActivityChildren(
                                            event,
                                            item
                                          )
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.bookinghistory.children}</>
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {state.status === "pending" ||
                                  state.status === "approved" ? (
                                    <FormControl
                                      sx={{ width: "71%" }}
                                      variant="standard"
                                      className="pull-right"
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Price*"
                                        name="price"
                                        value={item.price || ""}
                                        onChange={(event) =>
                                          handleChangeActivityPrice(event, item)
                                        }
                                        onKeyDown={handleKeyPress}
                                      />
                                    </FormControl>
                                  ) : (
                                    <>{item.payAmount}</>
                                  )}
                                </TableCell>
                                {/* <TableCell align="right">
                                <FormControl
                                  sx={{ width: "70%" }}
                                  variant="standard"
                                  className="pull-right"
                                >
                                  <Checkbox
                                    checked={item.isChecked}
                                    onChange={(event) =>
                                      handleActiveCheckedIn(event, item)
                                    }
                                  />
                                </FormControl>
                              </TableCell> */}
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabularData>
            </ChildContainer4>
          )}
          <ChildContainer5>
            {state.type === "hotel" && (
              <HotelInputPrice>
                <HotelInputPriceHeading>Hotel Amount</HotelInputPriceHeading>
                <HotelInputPriceValue>
                  {state.status === "pending" || state.status === "approved" ? (
                    <FormControl variant="standard" className="pull-right">
                      <Input
                        type="number"
                        onKeyDown={handleKeyPress}
                        id="standard-adornment-amount"
                        size="small"
                        onChange={handleHotelPriceChange}
                        value={hotelPrice}
                      />
                    </FormControl>
                  ) : (
                    Number(hotelPrice).toFixed(2)
                  )}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "37px",
                      paddingRight: "10px",
                    }}
                  >
                    {currency}
                  </span>
                </HotelInputPriceValue>
              </HotelInputPrice>
            )}
            {state.type === "activity" && (
              <TotalActivitiesPrice>
                <HotelInputPriceHeading>Total Amount</HotelInputPriceHeading>
                <HotelInputPriceValue>
                  {" "}
                  {state.status === "pending" || state.status === "approved" ? (
                    <FormControl variant="standard" className="pull-right">
                      <Input
                        type="number"
                        onKeyDown={handleKeyPress}
                        id="standard-adornment-amount"
                        size="small"
                        onChange={(e) => setHotelPrice(e.target.value)}
                        value={hotelPrice}
                      />
                    </FormControl>
                  ) : (
                    Number(hotelPrice).toFixed(2)
                  )}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "37px",
                      paddingRight: "10px",
                    }}
                  >
                    {currency}
                  </span>
                </HotelInputPriceValue>
              </TotalActivitiesPrice>
            )}
            {state.isCombined && (
              <TotalActivitiesPrice>
                <HotelInputPriceHeading>
                  Total Activities Amount
                </HotelInputPriceHeading>
                <HotelInputPriceValue>
                  {" "}
                  {state.status === "pending" || state.status === "approved" ? (
                    <FormControl variant="standard" className="pull-right">
                      <Input
                        type="number"
                        onKeyDown={handleKeyPress}
                        id="standard-adornment-amount"
                        size="small"
                        onChange={(e) =>
                          setTotalActivitiesAmount(e.target.value)
                        }
                        value={totalActivitiesAmount}
                        readOnly
                      />
                    </FormControl>
                  ) : (
                    totalActivitiesAmount.toFixed(2)
                  )}{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "37px",
                      paddingRight: "10px",
                    }}
                  >
                    {currency}
                  </span>
                </HotelInputPriceValue>
              </TotalActivitiesPrice>
            )}
            <TotalDiscountPrice>
              <HotelInputPriceHeading>
                Total Discount Amount
              </HotelInputPriceHeading>
              <HotelInputPriceValue>
                {" "}
                {state.status === "pending" || state.status === "approved" ? (
                  <FormControl variant="standard" className="pull-right">
                    <Input
                      type="number"
                      onKeyDown={handleKeyPress}
                      id="standard-adornment-amount"
                      size="small"
                      onChange={handleTotalDiscountAmountChange}
                      value={totalDiscountAmount}
                    />
                  </FormControl>
                ) : (
                  totalDiscountAmount.toFixed(2)
                )}{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "37px",
                    paddingRight: "10px",
                  }}
                >
                  {currency}
                </span>
              </HotelInputPriceValue>
            </TotalDiscountPrice>
            <TotalPayblePrice>
              <HotelInputPriceHeading>
                Total Payable Amount
              </HotelInputPriceHeading>
              <HotelInputPriceValue>
                {" "}
                {state.status === "pending" || state.status === "approved" ? (
                  <FormControl variant="standard" className="pull-right">
                    <Input
                      type="number"
                      onKeyDown={handleKeyPress}
                      id="standard-adornment-amount"
                      size="small"
                      onChange={(e) => setTotalPayableAmount(e.target.value)}
                      value={totalPayableAmount}
                      readOnly
                    />
                  </FormControl>
                ) : (
                  totalPayableAmount.toFixed(2)
                )}{" "}
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    lineHeight: "37px",
                    paddingRight: "10px",
                  }}
                >
                  {currency}
                </span>
              </HotelInputPriceValue>
            </TotalPayblePrice>
          </ChildContainer5>
          {state.status === "pending" || state.status === "approved" ? (
            <ChildContainer6>
              <LoadingButton
                loading={isSendInvoice}
                disabled={!sendInvoiceEnabled()}
                variant="contained"
                onClick={sendInvoiceHandler}
                // sx={{cursor: "not-allowed"}}
                style={{
                  backgroundColor: sendInvoiceEnabled() && "#01575c",
                }}
              >
                Send Invoice
              </LoadingButton>
            </ChildContainer6>
          ) : null}
        </MainContainer1>
      </MainContainer>
      {/* <Container maxWidth="lg">
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
                  <p>{state.customer.title}. {state.customer.name}</p>
                  <p>{state.customer.email}</p>
                  <p>{state.customer.countryCode}-{state.customer.mobile}</p>
                </Grid>
              </Grid>
              <hr />

              <BilingDetailsContainer>
                <DetailContainer>
                  <Detailkey> Payment method </Detailkey>
                  <DetailValue>{payMethod.toUpperCase()}</DetailValue>
                </DetailContainer>

                <DetailContainer>
                  <Detailkey> {state.type =='activity' ? 'Activity Date' : 'CheckIn Date'} </Detailkey>
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
                {
                  state.type =='activity' ? 
                  null
                  :
                  <>
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
                  </>
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
                {
                  state.type=='activity' ? 
                  null
                  :
                  <>
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
                  </>
                }
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
      </Container > */}
    </>
  );
};

export default GenerateInvoice;
