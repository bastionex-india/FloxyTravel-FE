import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import moment from "moment";
const TextRoot = styled.div`
  background-color: #9f94942b;
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
  font-weight: 600;
`;

const Root = styled.div`
  margin: 0px 60px;
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
  margin: 15px 2%;
  padding: 14px 15px;
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
  const [select1, setSelect1] = useState("");
  const { authData, setAuthData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigation = useNavigate();

  const handleClick = (item) => {
    // console.log("hcjhcjhf",item)
    navigation("/bookinghistorybyorderid", { state: item });
  };

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
      url: `http://localhost:4000/admin/getallbooking`,
      headers: {
        _token: authData.data.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, [select, select1]);

  const ConfirmedData = () => {};
  const ConfirmedData1 = () => {};
  const CompletedData = () => {};
  const CancelledData = () => {};

  return (
    <>
      <TextMainWrapper>
        {/* <SideBar><LeftSlideBar/></SideBar>  */}
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
                  <option value="all" onClick={ConfirmedData}>
                    All
                  </option>
                  <option value="confirmed" onClick={ConfirmedData}>
                    Confirmed Booking
                  </option>
                  <option value="completed" onClick={CompletedData}>
                    Completed Booking
                  </option>
                  <option value="cancelled" onClick={CancelledData}>
                    Cancelled Booking
                  </option>
                </Select>
              </TextSelectField>
            </TextWrapper>
          </Root>
          <RecentlyUploadedHeader>
            <RecentlyUploadedHeaderElem>Hotel Name</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Booking Id</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>
              Creation date
            </RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>
              Booking Date
            </RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Status</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Action</RecentlyUploadedHeaderElem>
          </RecentlyUploadedHeader>

          {data &&
            data.map((item, key) => {
              const bookingDate = new Date(item.createdAt);
              //  console.log("------www-",item)

              return (
                <RecentlyUploaded key={key}>
                  <DocInfo>
                    <DocImage />
                    <DocName>{item.hotelname}</DocName>
                  </DocInfo>
                  <RecentlyUploadedDate>{item.orderid}</RecentlyUploadedDate>
                  <RecentlyUploadedDate>
                    {bookingDate.toLocaleDateString()}
                  </RecentlyUploadedDate>
                  <RecentlyUploadedDate>
                    {moment(item.checkIn).format("DD/MM/YYYY")}
                  </RecentlyUploadedDate>
                  <RecentlyUploadedStatus>{item.status}</RecentlyUploadedStatus>
                  <RecentlyUploadedButtonWrapper>
                    <RecentlyUploadedButton onClick={() => handleClick(item)}>
                      View
                    </RecentlyUploadedButton>
                  </RecentlyUploadedButtonWrapper>
                </RecentlyUploaded>
              );
            })}
        </TextRoot>
      </TextMainWrapper>
    </>
  );
};

export default BookingHistoryofAdmin;