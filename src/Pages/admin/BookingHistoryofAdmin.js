import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import { environmentVariables } from "../../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import io, { socketIOClient } from "socket.io-client";
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
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
const HeadingWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const TextSelectField = styled.div`
  // margin: 10px 0px 0px 10px;
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
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  
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
display:flex;
justify-content:center;
align-items:center;
text-align:Center;
`;
const CheckInDateWrapper = styled.input`
padding: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    box-shadow: rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px;
    margin:0 10px;
`;
const CheckOutDateWrapper = styled(CheckInDateWrapper)`

`;
const SearchContainerWrapper = styled.div`

`;
const SearchFilterContainer = styled.div`
position:relative;
`;
const SearchFilterInput = styled.input`
width:50%;
margin:10px 0 20px 0;
padding: 10px;
    border-radius: 5px;
    outline: none;
    border: none;
    // box-shadow: rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px;
   
`;

const Span = styled.span`
position:absolute;
bottom: 39%;
left: 47%;
`;
const DateIcon = styled.div`
  position: absolute;
  left: 37%;
  z-index: 1;
`;




const BookingHistoryofAdmin = () => {
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [select1, setSelect1] = useState("");
  const [response, setResponse] = useState({});
  const { authData, setAuthData } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const navigation = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [search, setSearch] = useState();
  const [allVendors, setAllVendors] = useState([]);

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
    if(data.length>=3){
      setSearch(data);
      setSelect("")
      setSelect1("");
      setFromDate(null);
      setToDate(null);
      
    }else{
      setSearch();
    }
  };
  const handleClick = (item) => {
    navigation("/bookinghistorybyorderid", { state: item });
  };
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

  const getAllUsers = async () => {
    let data={
      search:search,
      status:select,
      id:select1,
      calenderStartDate:fromDate,
      calenderEndDate:toDate,
    }
    
    data.page = page + 1;
    data.pageSize = rowsPerPage;

    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getallbooking`,
      headers: {
        _token: authData.data.token,
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
        setIsLoading(false)
        setTotalItems(totalItems)
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1, page, rowsPerPage, search,fromDate, toDate]);

  const ApprovedData = () => {};
  const PendingData = () => {};
  const boldTextCss = {
    fontWeight: 700,
  };

  const getAllVendors=async()=>{
    try {
      const response = await axios.get(`${environmentVariables.apiUrl}/admin/getallvendor`, {
        headers:  { _token: authData.data.token }
      });
      setAllVendors(response.data.data)
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  }
  useEffect(() => {
    getAllVendors();
  }, []);

  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <HeadingWrapper>
              <i
                style={{ position: "absolute", left: "0" }}
                onClick={() => navigation(-1)}
                class="fa-solid fa-chevron-left fa-2x"
              ></i>
              <Heading> Booking History</Heading>
            </HeadingWrapper>
           <SearchContainerWrapper>
            <SearchFilterContainer>
              <SearchFilterInput  
                placeholder={"Search by Hotelname"}
                value={search}
                onChange={handleChange}
              />
              <Span> <i class="fa-solid fa-magnifying-glass"></i></Span>
            </SearchFilterContainer>
           <TextWrapper>
              <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSelect1(e.target.value);
                  }}
                  value={select1}
                  required
                >
                  <option value="" hidden>Select Vendor</option>
                  {
                    allVendors.map((item,index)=>{
                      return(
                        <option key={index} value={item._id}>{item.name}</option>
                      )
                    })
                  }
                </Select>
              </TextSelectField>
              <DatePickerContainer>
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
              </DatePickerContainer>
              <DatePickerContainer>
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
              </DatePickerContainer>
              <TextSelectField>
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
                  {/* <option value="all" onClick={ApprovedData}>
                    All
                  </option> */}
                  <option value="pending">
                    Pending Booking
                  </option>
                  <option value="approved">
                    Confirmed Booking
                  </option>
                  <option value="cancelled">
                    Cancelled Booking
                  </option>
                  <option value="completed">
                    Completed Booking
                  </option>
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextCss}>Hotel Name</TableCell>
                    <TableCell style={boldTextCss}>Vendor Name</TableCell>
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
                  {data && data.length!==0 ?
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
                          <TableCell align="left">{item.vendorData.name}</TableCell>
                          <TableCell align="right">{item.checkIn}</TableCell>
                          <TableCell align="right">{item.checkOut}</TableCell>
                          <TableCell align="right">
                            {bookingDate.toLocaleDateString()}
                          </TableCell>
                          <TableCell align="right">{item.status==="pending"? "Pending":item.status==="cancelled"?"Cancelled":item.status==="completed"?"Completed":item.status==="approved" && "Confirmed"}</TableCell>
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
                    }):<h3>Data Not Found</h3>
                    }
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

export default BookingHistoryofAdmin;
