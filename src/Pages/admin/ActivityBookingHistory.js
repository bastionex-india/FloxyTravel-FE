import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import { environmentVariables } from "../../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../ContextApi/ContextApi";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import Table from "@mui/material/Table";
import { Button } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { BsCalendarDay } from "react-icons/bs";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Pusher from 'pusher-js';
const HeadingWrapper = styled.div`
  position: relative;
  display: -webkit-box;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;
const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px;
  /* width: 967px; */
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const Root = styled.div`
  // margin: 0px 60px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin: 0px 20px;
  }
`;

const Heading = styled.div`
  font-size: 1.75rem;
  padding-left: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomTablePagination = styled(TablePagination)`
  display: flex !important;
  justify-content: flex-end !important;
  align-items: baseline !important;
  p {
    margin: 0px !important;
  }

`;

const TextSelectField = styled.div`
  // margin: 10px 0px 0px 10px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Select = styled.select`
  width: 15rem;
  height: 50px;
  padding: 0px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  ::-ms-expand {
    margin: "0 20px 0 10px";
    padding: "0 20px 0 10px";
  }
  @media(max-width:1380px){
    width: 500px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  @media(max-width:1380px){
    isplay: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: Center;
`;
const CheckInDateWrapper = styled.input`
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin: 0 10px;
`;
const DatePickerContainerWrapper = styled.div`
display: flex;
@media(max-width:1380px){
  display:flex;
  flex-direction: column;
  margin:0;
}
`;
const CheckOutDateWrapper = styled(CheckInDateWrapper)``;
const SearchContainerWrapper = styled.div``;
const SearchFilterContainer = styled.div`
  position: relative;
`;
const SearchFilterInput = styled.input`
  width: 50%;
  margin: 10px 0 20px 0;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  // box-shadow: rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px;
`;

const Span = styled.span`
  position: absolute;
  bottom: 39%;
  left: 47%;
`;
const FromDateInput = styled.div`
  position: absolute;
  right: 26px;
  font-size: 20px;
  cursor: pointer;
  top: 10px;
  @media (max-width: 1380px) {
    top: 20px;
  }
  @media (max-width: 768px) {
    top: 14%;
    left: 90%;
    z-index: 1;
  }
`;
const DateIcon = styled.div`
  position: absolute;
  left: 37%;
  z-index: 1;
`;

const DatePickerStyled1 = styled(DatePicker)`
  height: 50px;
  padding: 0px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px;
  background-color: white;
  margin: 0 10px;
  @media(max-width:1380px){
    margin: 10px 0;
    width: 500px;
  }
`;

const ActivityBookingHistory = () => {
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [select1, setSelect1] = useState("");
  const [response, setResponse] = useState({});
  const { authData } = useAuth();
  const [data, setData] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDatePickerOpen1, setIsDatePickerOpen1] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigation = useNavigate();
  const navigate = useNavigate();

  const [search, setSearch] = useState();
  const [allVendors, setAllVendors] = useState([]);

  const InputStartsDate = useRef(null);
  const InputEndDate = useRef(null);

  // paginationstart
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // paginationend

  const handleChange = (event) => {
    const data = event.target.value;
    setSelect("");
    setSelect1("");
    setFromDate(null);
    setToDate(null);
    if (data.length >= 3) {
      setSearch(data);
    } else {
      setSearch();
    }
  };
  const handleClick = (item) => {
    navigation("/bookinghistorybyorderid", { state: item });
  };
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('cbb68a6fad0862e7fd60', {
      cluster: 'ap2'
    });
  

    const channelUserBooking = pusher.subscribe('user_booking');
    const handleUserBookingEvent = (receivedData) => {
      console.log("-----")
      getAllUsers()
    };
    channelUserBooking.bind('create', handleUserBookingEvent);

    const channelUserCancelBooking = pusher.subscribe('user_cancel_booking');
    const handleUserCancelBookingEvent = (receivedData) => {
      console.log(".....11")
      getAllUsers();
    };
    channelUserCancelBooking.bind('create', handleUserCancelBookingEvent);

    const channelUserConfirmedBooking = pusher.subscribe('user_confirm_booking');
    const handleUserConfirmedBookingEvent = (receivedData) => {
      console.log(".....")
      getAllUsers();
    };
    channelUserConfirmedBooking.bind('create', handleUserConfirmedBookingEvent);
  
    return () => {
      channelUserBooking.unbind('create', handleUserBookingEvent);
      channelUserCancelBooking.unbind('create', handleUserCancelBookingEvent);
      channelUserConfirmedBooking.unbind('create', handleUserConfirmedBookingEvent);
      pusher.unsubscribe('user_booking');
      pusher.unsubscribe('user_cancel_booking');
      pusher.unsubscribe('user_confirm_booking');
    };
  }, []);

  const getAllUsers = async () => {
    let data = {
      search: search,
      status: select,
      id: select1,
      calenderStartDate: fromDate,
      calenderEndDate: toDate,
      type: "activity",
    };

    data.page = page + 1;
    data.pageSize = rowsPerPage;

    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getallbooking`,
      headers: {
        _token: authData.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const { totalItems, totalPages, currentPage, data } = response.data;
        setData(data);
        setTotalPages(totalPages);
        setPage(currentPage - 1);
        setIsLoading(false);
        setTotalItems(totalItems);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1, page, rowsPerPage, search, fromDate, toDate]);

  const ApprovedData = () => {};
  const PendingData = () => {};
  const boldTextCss = {
    fontWeight: 700,
  };

  const getAllVendors = async () => {
    try {
      const response = await axios.get(
        `${environmentVariables.apiUrl}/admin/getallvendor`,
        {
          headers: { _token: authData.token },
        }
      );
      setAllVendors(response.data.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };
  useEffect(() => {
    getAllVendors();
  }, []);

  function convertDateFormat(inputDate) {
    const possibleFormats = [
      "yyyy-MM-dd",
      "MM-dd-yyyy",
      "MM/dd/yyyy",
      "dd/MM/yyyy",
      "yyyy/MM/dd",
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
      return ""; // Return an empty string or handle the error as needed
    }

    const formattedDate = format(parsedDate, "dd/MM/yyyy");
    return formattedDate;
  }
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
  const handleStartDateChange = (date) => {
    setSearch("");
    setFromDate(date);
    if (toDate && date > toDate) {
      setToDate(null);
    }

    if (!date) {
      setToDate(null);
    }
  };
  const handleToggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };
  const handleToggleDatePicker2 = () => {
    setIsDatePickerOpen1(!isDatePickerOpen1);
  };
  const refHandle = () => {
    InputStartsDate.current.setOpen(true);
  };
  const refHandle1 = () => {
    InputEndDate.current.setOpen(true);
  };
  // const formattedCheckInDate = formatDate(checkIn);
  // const formattedCheckOutDate = formatDate(checkOut);
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
              <Heading> Activity Booking History</Heading>
            </HeadingWrapper>
            <SearchContainerWrapper>
              <SearchFilterContainer>
                <SearchFilterInput
                  placeholder={"Search by activity name"}
                  value={search}
                  onChange={handleChange}
                />
                <Span>
                  {" "}
                  <i class="fa-solid fa-magnifying-glass"></i>
                </Span>
              </SearchFilterContainer>
              <TextWrapper>
                <TextSelectField>
                  <Select
                    onChange={(e) => {
                      setSelect1(e.target.value);
                      setSearch("");
                    }}
                    value={select1}
                    required
                  >
                    <option value="" hidden>
                      Select Vendor
                    </option>
                    <option value="">All</option>
                    {allVendors.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                </TextSelectField>
                <DatePickerContainerWrapper style={{ display: "flex" }}>
                  <DatePickerContainer>
                    {/* <DateIcon>
                    <BsCalendarDay
                      size="1.5rem"
                      onClick={() => InputEndDate.current.setOpen(true)}
                    />
                  </DateIcon>

                  <DatePicker
                    placeholderText="End Date"
                    selected={toDate}
                    onChange={(date) => setToDate(date)}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                    disabled={fromDate ? false : true}
                    minDate={fromDate}
                    style={{ padding: "10px" }}
                    ref={InputEndDate}
                  /> */}
                    <div
                      onClick={handleToggleDatePicker}
                      style={{ position: "relative" }}
                    >
                      <DatePickerStyled1
                        open={isDatePickerOpen}
                        onClickOutside={() => setIsDatePickerOpen(false)}
                        onFocus={() => setIsDatePickerOpen(true)}
                        // minDate={checkIn}
                        placeholderText="Start Date"
                        selected={fromDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}
                        ref={InputStartsDate}
                      ></DatePickerStyled1>
                      <FromDateInput onClick={refHandle}>
                        <i class="fas fa-calendar-alt"></i>
                      </FromDateInput>
                    </div>
                  </DatePickerContainer>
                  <DatePickerContainer>
                    <div
                      onClick={handleToggleDatePicker2}
                      style={{ position: "relative" }}
                    >
                      <DatePickerStyled1
                        open={isDatePickerOpen1}
                        onClickOutside={() => setIsDatePickerOpen1(false)}
                        onFocus={() => setIsDatePickerOpen1(true)}
                        // minDate={checkIn}

                        placeholderText="End Date"
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}
                        disabled={fromDate ? false : true}
                        minDate={fromDate}
                        ref={InputEndDate}
                        style={{ padding: "10px" }}
                      ></DatePickerStyled1>
                      <FromDateInput onClick={refHandle1}>
                        <i class="fas fa-calendar-alt"></i>
                      </FromDateInput>
                    </div>
                  </DatePickerContainer>
                </DatePickerContainerWrapper>
                <TextSelectField>
                  <Select
                    onChange={(e) => {
                      setSelect(e.target.value);
                      setSearch("");
                    }}
                    value={select}
                    required
                  >
                    <option value="" hidden>
                      Select Status
                    </option>
                    <option value="">All</option>
                    <option value="pending">Pending Booking</option>
                    <option value="approved">Approved Booking</option>
                    <option value="confirmed">Confirmed Booking</option>
                    <option value="cancelled">Cancelled Booking</option>
                    <option value="completed">Completed Booking</option>
                    {/* <option value="cancelled" onClick={CancelledData}>
                    Cancelled Booking
                  </option> */}
                  </Select>
                </TextSelectField>
              </TextWrapper>
            </SearchContainerWrapper>
          </Root>
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
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextCss}>Activity Name</TableCell>
                    <TableCell style={boldTextCss}>Vendor Name</TableCell>
                    <TableCell style={boldTextCss} align="right">
                      Activity Date
                    </TableCell>
                    <TableCell style={boldTextCss} align="right">
                      Creation date
                    </TableCell>
                    <TableCell style={boldTextCss} align="right">
                      Status
                    </TableCell>
                    <TableCell style={boldTextCss} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.length !== 0 ? (
                    data.map((item, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.isCombined?`${item.hotelname}(with hotel)`:item.hotelname }
                          </TableCell>
                          <TableCell align="left">
                            {item.vendorData.name}
                          </TableCell>
                          <TableCell align="right">
                            {formatDate(item.checkIn)}
                          </TableCell>
                          <TableCell align="right">
                            {formatDate(item.createdAt)}
                          </TableCell>
                          <TableCell align="right">
                            {item.status === "pending"
                              ? "Pending"
                              : item.status === "cancelled"
                              ? "Cancelled"
                              : item.status === "completed"
                              ? "Completed"
                              : item.status === "approved"
                              ? "Approved"
                              : item.status === "confirmed" && "Confirmed"}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              variant="contained"
                              type="button"
                              onClick={() => handleClick(item)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body1">
                            Data not found
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <CustomTablePagination
                rowsPerPageOptions={[1, 3, 10]}
                component="div"
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{  display:"flex", justifyContent:"flex-end",alignItems:"baseline"}}
              />
            </TableContainer>
          )}
        </TextRoot>
      </TextMainWrapper>
    </>
  );
};

export default ActivityBookingHistory;
