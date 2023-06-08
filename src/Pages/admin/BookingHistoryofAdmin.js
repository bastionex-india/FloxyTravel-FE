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

import moment from "moment";
const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px 0px;
  width: 967px;
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const DocInfo = styled.div`
  // display: flex;
`;
const DocName = styled.div`
  margin-left: 4px;
  // font-weight: 600;
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
const RecentlyUploaded = styled.div`
  background: #fff;
  display: grid;
  grid-template-columns: 18% 27% 12% 18% 15% 9%;
  -webkit-box-align: center;
  align-items: center;
  // margin: 15px 2%;
  // padding: 14px 15px;
  margin: 4px 2%;
  padding: 4px 0px;

  box-shadow: 0px 0px 5px 5px #0000;
  border-radius: 5px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const RecentlyUploadedDate = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedType = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedStatus = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 0px;
  font-size: 14px;
  background-color: #6836ed;
  color: #fff;
  text-align: center;
  @media (max-width: 768px) {
    padding: 5px 13px;
  }
`;

const RecentlyUploadedHeader = styled.div`
  display: grid;
  grid-template-columns: 18% 27% 12% 18% 15% 9%;
  margin: 15px 2%;
  padding: 14px 15px;
  font-weight: 500;
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedHeaderElem = styled.div`
  color: #6c7074;
  padding-left: 4px;
`;

const RecentlyUploadedButtonWrapper = styled.div``;

const DocImage = styled.img`
  /* width:50px;  */
`;

const SideBar = styled.div`
  background-color: black;
`;
const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const BookingHistoryofAdmin = () => {
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [select1, setSelect1] = useState("");
  const { authData, setAuthData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigation = useNavigate();

  const handleClick = (item) => {
    console.log("hcjhcjhf", item);
    navigation("/bookinghistorybyorderid", { state: item });
  };
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

  const getAllUsers = async () => {
    console.log("aaa", select1);
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
        setData(response?.data?.data.sort((a, b) => b.createdAt - a.createdAt));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllUsers();
  }, [select, select1]);

  const ApprovedData = () => {};
  const PendingData = () => {};
  const boldTextCss = {
    fontWeight: 700,
  };
  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
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

export default BookingHistoryofAdmin;
