import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../ContextApi/ContextApi";
import { environmentVariables } from "../config/config";
import { useNavigate } from "react-router-dom";
import io, { socketIOClient } from "socket.io-client";
import CircularLoader from "../Component/CircularLoader/CircularLoader";
import styled from "styled-components";
// import AdharCard from "../../Component/Images/sample_aadhar.jpg";
// import LeftSlideBar from '../../Component/LeftSlideBar/LeftSlideBar';

// import { DocName } from '../Dashboard/Dashboard.styles';
// import { DocInfo } from '../Dashboard/Dashboard.styles';
import { BsCalendarDay } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import SearchIcon from ".././Images/SearchIconNavbar.png";
import Typography from "@mui/material/Typography";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

const boldTextCss = {
  fontWeight: 700,
};

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
  @media (max-width: 768px) {
    display: none;
  }
`;

const TextSelectField = styled.div`
  /* margin: 10px 0px 0px 10px; */
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Select = styled.select`

width: 100%;
  height: 30px;
  padding: 0px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    height: 50px;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  text-align:center;
  margin-top: 25px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const InputIconWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  outline: none;
  background: white;
  // color:black;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;

const IconSearch = styled.div`
  width: 5%;
  top: -3px;
  left: 15px;
  font-size: 26px;
  /* background-color: #0cb09b; */
  display: inline-block;
  position: absolute;
  height: 59px;
  line-height: 55px;
  text-align: center;
  @media (max-width: 768px) {
    width: 59px;
  }
`;
const Input = styled.input`
  width: 95%;
  height: 55px;
  /* font-size: 20px; */
  // color: #fff;
  outline: none;
  background-color: transparent;
  padding: 0 10px 0 50px;
  /* opacity: 1; */
  font-size: 16px;
  /* border: 1px solid rgba(75, 233, 245, 0.541); */
  border: none;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0px 50px; */
`;
const FilterComponent = styled.div`
  margin-left: 10px;
  position: relative;
`;
const DateIcon = styled.div`
  position: absolute;
  right: 5%;
  z-index: 1;
`;
const DatePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: Center;
`;
const FromDateInput = styled.div`
  position: absolute;
  top: 18%;
  right: 35px;
  font-size: 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    top: 14%;
    left: 90%;
    z-index: 1;
  }
`;



const BookingHistory = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState();
  const [data1, setData1] = useState([]);
  const [confirm, setConfirm] = useState();
  const [completed, setCompleted] = useState();
  const [cancelled, setCancelled] = useState();
  const [select1, setSelect1] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchByName, setSearchByName] = useState("");
  const [allHotels, setAllHotels] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDatePickerOpen1, setIsDatePickerOpen1] = useState(false);
  const [response, setResponse] = useState({});
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

  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  useEffect(() => {
    const socket = io.connect(environmentVariables?.apiUrl);

    socket.on("admin_notification", (data) => {
      getAllUsers();
    });

    socket.on("admin_cancellation_notification", (data) => {
      getAllUsers();
    });

    socket.on("admin_booking_notification", (data) => {
      getAllUsers();
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleClick = (item) => {
    navigate("/bookinghotelbyid", { state: item });
  };

  const getAllUsers = async () => {
    let data = {
      status: select,
      // startDate:new Date(),
      // endDate:select1,
      calenderStartDate: fromDate,
      calenderEndDate: toDate,
      id: searchByName,
    };
    data.page = page + 1;
    data.pageSize = rowsPerPage;
    // if (select1 !== "") {
    //   data = {
    //     status: select,
    //     startDate: new Date(),
    //     endDate: select1,
    //   };
    // } else {
    //   data = {
    //     status: select,
    //   };
    // }
    const config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getallbooking/${authData.data.vendorId}`,
      headers: { _token: authData.data.token },
      data: data,
    };
    await axios
      .request(config)
      .then((response) => {
        // setData(response.data.sort((a, b) => b.createdAt - a.createdAt));
        console.log(response.data);
        const { totalItems, totalPages, currentPage, data } = response.data;
        setData(data);
        setTotalPages(totalPages);
        setPage(currentPage - 1);
        setIsLoading(false);
        setTotalItems(totalItems);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };
  const getAllHotels = async () => {
    try {
      const response = await axios.get(
        `${environmentVariables.apiUrl}/vendor/getallhotelsbyvendorid/${authData.data.vendorId}`,
        {
          headers: { _token: authData.data.token },
        }
      );
      setAllHotels(response.data.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1, searchByName, fromDate, toDate, page, rowsPerPage]);

  useEffect(() => {
    getAllHotels();
  }, []);

  const handleStartDateChange = (date) => {
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
  function formatDate(timestamp) {
    const options = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(timestamp).toLocaleString('en-IN', options);
    return formattedDate;
  }
  // function convertToUnixTimestamp(dateString) {
  //   const [day, month, year] = dateString.split('/');
  //   const formattedDateString = `${month}/${day}/${year}`;
  //   return new Date(formattedDateString).getTime();
  // }
  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <i
                style={{ cursor: "pointer", marginRight: "50px" }}
                onClick={() => navigate(-1)}
                class="fa-solid fa-chevron-left fa-2x"
              ></i>
              <Heading> Booking History</Heading>
            </div>

            <TextWrapper>
              {/* {
                select!=="upcoming" && (
                  <TextSelectField>
                    <Select
                      onChange={(e) => {
                        setSelect1(e.target.value);
                      }}
                      //   value={select1}
                      required
                    >
                      <option value="" hidden>
                        Select Range
                      </option>
                      <option value="">All</option>
                      <option
                        value={
                          new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
                        }
                      >
                        Past Two days
                      </option>
                      <option
                        value={
                          new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                        }
                      >
                        Past one week
                      </option>
                      <option
                        value={
                          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
                        }
                      >
                        Past one month
                      </option>
                    </Select>
                  </TextSelectField>
                )
              } */}

              {/* <IconSearch>
                  <img src={SearchIcon} />
                </IconSearch>
                <Input
                  type="search"
                  placeholder={"Search by City"}
                  value={search}
                  onChange={(e) => {
                    setSearchByName(e.target.value);
                  }}
                  // onKeyDown={(e) => KeyDown(e)}
                  autoComplete="false"
                /> */}
              <TextSelectField 
              style={{width:"20%"}}
              >
                <Select
                  onChange={(e) => {
                    setSearchByName(e.target.value);
                  }}
                  value={searchByName}
                  required
                  style={{width:"100%"}}
                >
                  <option value="" hidden>
                    Select Hotel
                  </option>
                  {allHotels.map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.hotelname}
                      </option>
                    );
                  })}
                </Select>
              </TextSelectField>

              {/* <FilterWrapper>
                <FilterComponent>
                  <DateIcon>
                    <BsCalendarDay size="1.5rem" />
                  </DateIcon>
                  <DatePicker
                    placeholderText="Start Date"
                    selected={fromDate}
                    onChange={(date) => {
                      setFromDate(date);
                    }}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                  />
                </FilterComponent>
                <FilterComponent>
                  <DateIcon>
                    <BsCalendarDay size="1.5rem" />
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
                  />
                </FilterComponent>
              </FilterWrapper> */}

              <div style={{display:'flex'}}>
                <DatePickerContainer>
                  <div onClick={handleToggleDatePicker} style={{position:'relative'}}>
                    <DatePicker
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
                     
                    ></DatePicker>
                    <FromDateInput onClick={refHandle}>
                      <i class="fas fa-calendar-alt"></i>
                    </FromDateInput>
                  </div>
                </DatePickerContainer>
                <DatePickerContainer>
                <div onClick={handleToggleDatePicker2} style={{position:'relative'}}>
                    <DatePicker
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
                    ></DatePicker>
                    <FromDateInput onClick={refHandle1}>
                      <i class="fas fa-calendar-alt"></i>
                    </FromDateInput>
                  </div>
                </DatePickerContainer>
                </div>
              <TextSelectField 
               style={{width:"20%"}}
              >
                <Select
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                  value={select}
                  required
                >
                  <option value="" hidden>
                    Select Status
                  </option>
                  <option value="">All</option>
                  <option value="completed">Completed Booking</option>
                  <option value="confirmed">Upcoming Booking</option>
                </Select>
              </TextSelectField>
            </TextWrapper>
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextCss}>Hotel Name</TableCell>
                    <TableCell style={boldTextCss} align="center">
                      CheckIn Date
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Checkout Date
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Creation date
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Status
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data && data.length !== 0 ? (
                    data.map((item, index) => {
                      const bookingDate = new Date(item.createdAt);
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.hotelname}
                          </TableCell>
                          <TableCell align="center">{formatDate(item.checkIn)}</TableCell>
                          <TableCell align="center">{formatDate(item.checkOut)}</TableCell>
                          <TableCell align="center">
                            {bookingDate.toLocaleDateString()}
                          </TableCell>
                          <TableCell align="center">
                            {item.status === "completed"
                              ? "Completed"
                              : item.status === "confirmed" && "Upcoming"}
                          </TableCell>
                          <TableCell align="center">
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
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography variant="body1">Data not found</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[1, 3, 10]}
                component="div"
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </TextRoot>
      </TextMainWrapper>
    </>
  );
};

export default BookingHistory;
