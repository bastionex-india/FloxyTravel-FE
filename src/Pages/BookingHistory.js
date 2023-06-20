import React, { useState, useEffect, useContext } from "react";
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
  margin: 10px 0px 0px 10px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-item: center;

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
  padding: 0px 50px;
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

const BookingHistory = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
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

  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  useEffect(() => {
    const socket = io.connect(environmentVariables?.apiUrl);

    socket.on("admin_notification", (data) => {
      // console.log(data, "sr");
      getAllUsers();
    });

    socket.on("admin_cancellation_notification", (data) => {
      // console.log(data, "sr");
      getAllUsers();
    });

    socket.on("admin_booking_notification", (data) => {
      // console.log(data, "sr");
      getAllUsers();
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleClick = (item) => {
    // console.log("hcjhcjhf",item)
    navigate("/bookinghotelbyid", { state: item });
  };

  const getAllUsers = async () => {
    // console.log("aaa", select1,select,fromDate,toDate,searchByName);
    let data={
      // status:select,
      // startDate:new Date(),
      // endDate:select1,
      calenderStartDate:fromDate,
      calenderEndDate:toDate,
      id:searchByName
    }
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
        // console.log("res",response.data.data)
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };
  const getAllHotels=async()=>{
    try {
      const response = await axios.get(`${environmentVariables.apiUrl}/vendor/getallhotelsbyvendorid/${authData.data.vendorId}`, {
        headers:  { _token: authData.data.token }
      });
      setAllHotels(response.data.data)
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1, searchByName, fromDate, toDate]);


  useEffect(() => {
    getAllHotels()
  }, []);
  
  console.log(":data",data)
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
                 <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSearchByName(e.target.value);
                  }}
                  //   value={select1}
                  required
                >
                  <option value="" hidden>
                    Select Hotel
                  </option>
                  {
                    allHotels.map((item,index)=>{
                      return(
                        <option key={index} value={item._id}>{item.hotelname}</option>
                      )
                    })
                  }
                </Select>
              </TextSelectField>


              <FilterWrapper>
                <FilterComponent>
                  {/* <FilterLabel>From</FilterLabel> */}
                  <DateIcon>
                    <BsCalendarDay size="1.5rem" />
                  </DateIcon>
                  <DatePicker
                    placeholderText="Start Date"
                    selected={fromDate}
                    onChange={(date) => {
                      setFromDate(date);
                      // setPageNo(1);
                    }}
                    selectsStart
                    startDate={fromDate}
                    endDate={toDate}
                  />
                </FilterComponent>
                <FilterComponent>
                  {/* <FilterLabel>To</FilterLabel> */}
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
              </FilterWrapper>

              {/* <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                  value={select}
                  required
                >
                  <option value="" hidden>
                    Select Type
                  </option>
                  <option value="">
                    All
                  </option>
                  <option value="completed">
                    Completed Booking
                  </option>
                  <option value="upcoming">
                    Upcoming Booking
                  </option>
                </Select>
              </TextSelectField> */}
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
                    <TableCell style={boldTextCss} align="right">
                      CheckIn Date
                    </TableCell>
                    <TableCell style={boldTextCss} align="right">
                      Checkout Date
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
                  {data && data.length!==0?
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
                          <TableCell align="right">{item.checkIn}</TableCell>
                          <TableCell align="right">{item.checkOut}</TableCell>
                          <TableCell align="right">
                            {bookingDate.toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">{item.status}</TableCell>
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
                    }):<h3>Data Not Found</h3>}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TextRoot>
      </TextMainWrapper>
    </>
  );
};

export default BookingHistory;
