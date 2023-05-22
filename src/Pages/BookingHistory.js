import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../ContextApi/ContextApi";
import { environmentVariables } from "../config/config";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
// import AdharCard from "../../Component/Images/sample_aadhar.jpg";
// import LeftSlideBar from '../../Component/LeftSlideBar/LeftSlideBar';

// import { DocName } from '../Dashboard/Dashboard.styles';
// import { DocInfo } from '../Dashboard/Dashboard.styles';

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
  display: flex;
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

const BookingHistory = () => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [data, setData] = useState("");
  const navigation = useNavigate();
  const [select, setSelect] = useState("");
  const [data1, setData1] = useState([]);
  const [confirm, setConfirm] = useState();
  const [completed, setCompleted] = useState();
  const [cancelled, setCancelled] = useState();

  useEffect(() => {
    if (window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  const handleClick = (item) => {
    // console.log("hcjhcjhf",item)
    navigation("/bookinghotelbyid", { state: item });
  };

  const getAllUsers = async () => {
    const config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getallbooking/${authData.data.vendorId}`,
      headers: { _token: authData.data.token },
    };
    await axios
      .request(config)
      .then((response) => {
        // console.log("response.data",response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  // console.log("dssasd",data)

  return (
    // <div style={{display: 'flex',width: "100%",justifyContent: "space-around", marginTop: "7%",backgroundColor: 'white'}}>
    //   {
    //     data.data && data.data.map((item,index)=>{
    //       return (
    //       <div style={{cursor:'pointer'}} onClick={()=>navigation('/bookinghotelbyid',{state:item})}>
    //          <div>
    //           {item.hotelname}
    //          </div>
    //           <div>
    //             {item.area}
    //           </div>
    //       </div>
    //       )
    //     })
    //   }
    // </div>
    <>
      <TextMainWrapper>
        {/* <SideBar><LeftSlideBar/></SideBar>  */}
        <TextRoot>
          <Root>
            <TextWrapper>
              <Heading> Booking History</Heading>
              {/* <TextSelectField>
                <Select
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                  value={select}
                  required
                >
                  <option value="" hidden>
                    All
                  </option>
                  <option value="1"> Confirmed Booking</option>
                  <option value="2">Completed Booking</option>
                  <option value="3">Cancelled Booking</option>
                </Select>
              </TextSelectField> */}
            </TextWrapper>
          </Root>
          <RecentlyUploadedHeader>
            <RecentlyUploadedHeaderElem>Hotel Name</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Booking Id</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>
              Booking Name
            </RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>
              Booking Date
            </RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Status</RecentlyUploadedHeaderElem>
            <RecentlyUploadedHeaderElem>Action</RecentlyUploadedHeaderElem>
          </RecentlyUploadedHeader>

          {data.data &&
            data.data.map((item, key) => {
              const bookingDate = new Date(item.createdAt);
              //  console.log("------www-",bookingDate.toLocaleDateString(),item.createdAt,typeof(bookingDate))

              return (
                <RecentlyUploaded key={key}>
                  <DocInfo>
                    <DocImage />
                    <DocName>{item.hotelname}</DocName>
                  </DocInfo>
                  <RecentlyUploadedDate>{item.id}</RecentlyUploadedDate>
                  <RecentlyUploadedDate>
                    {item.customer.name}
                  </RecentlyUploadedDate>
                  <RecentlyUploadedDate>
                    {bookingDate.toLocaleDateString()}
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

export default BookingHistory;
