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



import { Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper } from "@mui/material";



const boldTextCss = {
  fontWeight: 700,
};


const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px 0px;
  width: 967px;
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
  margin-right: 360px;
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




const BookingHistory = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [data1, setData1] = useState([]);
  const [confirm, setConfirm] = useState();
  const [completed, setCompleted] = useState();
  const [cancelled, setCancelled] = useState();
  const [select1, setSelect1] = useState("");

  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  useEffect(() => {
    const socket = io.connect(environmentVariables?.apiUrl);

    socket.on("admin_notification", (data) => {
      console.log(data, "sr");
      getAllUsers();
    });

    socket.on("admin_cancellation_notification", (data) => {
      console.log(data, "sr");
      getAllUsers();
    });

    socket.on("admin_booking_notification", (data) => {
      console.log(data, "sr");
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
    // console.log("aaa", select1,select);
    let data;
    if (select1 !== "") {
      data = {
        status: select,
        startDate: new Date(),
        endDate: select1,
      };
    } else {
      data = {
        status: select,
      };
    }
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
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1]);
  const ApprovedData = () => {};
  const PendingData = () => {};

  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
          <Button variant="outlined" onClick={() => navigate(-1)} type="button"> <i className="fa-solid fa fa-arrow-circle-left"
                ></i> Back</Button>
            <TextWrapper>
              
              <Heading> Booking History</Heading>
              <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSelect1(e.target.value);
                  }}
                  //   value={select1}
                  required
                >
                  <option value="">Select Range</option>
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
                  {/* <option value="2" onClick={CompletedData}>
                    Completed Booking
                  </option>
                  <option value="3" onClick={CancelledData}>
                    Cancelled Booking
                  </option> */}
                </Select>
              </TextSelectField>
              <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                  value={select}
                  required
                >
                  <option value="all" onClick={ApprovedData}>
                    All
                  </option>
                  <option value="approved" onClick={ApprovedData}>
                    Approved Booking
                  </option>
                  <option value="pending" onClick={PendingData}>
                    Pending Booking
                  </option>
                  {/* <option value="cancelled" onClick={CancelledData}>
                    Cancelled Booking
                  </option> */}
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
                  {data &&
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
                          <TableCell align="right">{item.checkIn}</TableCell>
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
                    })}
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
