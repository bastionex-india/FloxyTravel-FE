import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { environmentVariables } from "../config/config";
import { AuthContext } from "../ContextApi/ContextApi";
import Avtar from "../Images/avatar.png";
import BrandLogo from "../Images/LogoDark.png";
import bell from "../Images/bell.png";
import io, { socketIOClient } from "socket.io-client";

const Root = styled.div`
  box-shadow: 0 0 49px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99999;
`;
const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const Task = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 15%;
  cursor: pointer;
  // background-color: antiquewhite;
  font-size: 20px;
  font-weight: 600;
  padding: 13px;
`;
const UserImg = styled.img``;
const DropDown = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
const ListWrapper = styled.div`
  width: 150px;
  background-color: #fff;
  box-shadow: 0 0 49px 0 rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 36px;
  right: 0;
  z-index: 1000;
`;
const Option = styled.div`
  padding: 15px;
  cursor: pointer;
  :hover {
    background-color: #f1f7fc;
  }
`;

const RightWrapper = styled.div`
  display: flex;
`;

const NotificationBell = styled.img`
  width: 24px;
  margin-right: 20px;
  cursor: pointer;
`;
const NotificationsWrapper = styled.div`
  position: relative;
`;

const NotificationNameTime = styled.div`
  background-color: #FAFAFA;
  /* background-color:red; */
  width:100%;
  margin: 5px 0px;
  padding: 0px 15px;
`;


const Notifications = styled.div`
  position: absolute;
    background-color: #fff;
    color: #000;
    width: 390px;
    padding: 20px 10px;
    height: 410px;
    right: -2px;
    top: 53px;
    overflow: scroll;
    border: none;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Notification = styled.div`
  /* padding: 5px; */
  text-transform: capitalize;
  color:#4D4D4D;
  font-weight:400;
  font-size:16px;
  padding-bottom:5px;

`;
const NotificationTime = styled.div`
  font-size: 12px;
  margin-right: 5px;
  color:#4D4D4DCC;
  /* padding-top:5px; */

`;
const NotificationDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: ${(props) => (props.opened === true ? "#fff" : "#f8f8fa")}; */
  margin: 12px 0;
  ${({ isLatest }) =>
    isLatest &&
    `
   border: 1px solid #ccc;
   border-radius:5px;


  `}
`;
const NotificationNumber = styled.div`
  position: absolute;
  height: 18px;
  width: 18px;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  background-color: #01515b;
  top: -3px;
  right: 13px;
  font-size: 13px;
`;
const NotificationWrapper = styled.div``;
const NotificationText = styled.text`
    color: #4D4D4D;
    font-size: 18px;
    font-weight: 600;
`;


function Navigation({
  showNotifications,
  setShowNotifications,
  showDropDown,
  setShowDropDown,
}) {
  const { authData, setAuthData } = useContext(AuthContext);
  const [notificationData, setNotificationData] = useState(null);
  const [notificationLength, setNotificationLength] = useState(0);
  const navigation = useNavigate();
  const getTimeNotification = (time) => {
    console.log((Date.now() - time) / 3600000);
    if (
      (Date.now() - time) / 3600000 >= 1 &&
      (Date.now() - time) / 3600000 < 24
    ) {
      return `${Math.ceil((Date.now() - time) / 3600000)} h ago`;
    } else if ((Date.now() - time) / 3600000 < 1) {
      if ((Date.now() - time) / 60000 >= 1) {
        return `${Math.ceil((Date.now() - time) / 60000)} min ago`;
      } else {
        return `${Math.ceil((Date.now() - time) / 1000)} sec ago`;
      }
    } else {
      return `${Date(time).toString().split(" ")[1]} ${
        Date(time).toString().split(" ")[2]
      }`;
    }
  };
  const handleNotificationBell = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowDropDown(false);
    console.log(authData?.data?.id);
    const url = authData?.data?.isadmin
      ? `${environmentVariables?.apiUrl}/admin/addidstonotification/${authData?.data?.id}`
      : `${environmentVariables?.apiUrl}/vendor/addidstonotification/${authData?.data?.id}`;
    let config = {
      method: "post",
      url: url,
      headers: {
        _token: authData?.data?.token,
      },
      data: "",
    };
    axios
      .request(config)
      .then((response) => {
        getNotificationData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const Logout = async() => {
  //     localStorage.removeItem("authdata");
  //     setAuthData("");
  //     const time = new Date();
  //     const response = await axios.post('/logout',{
  //         // method:'POST',
  //         headers:{
  //             Acccept:"application/json",
  //             "Content-Type":"application/json"
  //         },
  //         loginTime:authData.data.time,
  //         logoutTime:time,
  //         credentials:"include"
  //      })
  //       .then((response) => {
  //         navigation("/")
  //         // console.log(response);
  //       })
  //       .catch((error) => {
  //         // console.log(error);
  //       });
  //   };
  const setShow = (e) => {
    e.stopPropagation();
    setShowDropDown(!showDropDown);
    setShowNotifications(false);
    // props.data()
  };
  const getNotificationData = () => {
    const url = authData?.data?.isadmin
      ? `${environmentVariables?.apiUrl}/admin/getregisterednotification`
      : `${environmentVariables?.apiUrl}/vendor/getregisterednotification/${authData?.data?.vendorId}`;
    axios
      .get(url, {
        headers: { _token: authData?.data?.token },
      })
      .then((response) => {
        setNotificationData(
          response.data.data.sort((a, b) => b.createdAt - a.createdAt)
        );
        const openedData = response?.data?.data.filter((val) =>
          val?.openedId.includes(authData?.data?.id)
        );
        setNotificationLength(response.data.data.length - openedData.length);
      });
  };
  useEffect(() => {
    // socket.emit("fetchData", authData?.data?.token);
    // socket.on("dataFetched", (data) => {
    //   console.log(data, "fetched data");
    //   setNotificationData(data.data);
    //   setNotificationLength(data.data.length);
    // });
    // return () => {
    //   socket.disconnect();
    // };
    getNotificationData();
  }, []);
  useEffect(() => {
    const socket = io.connect(environmentVariables?.apiUrl);

    socket.on("admin_notification", (data) => {
      console.log(data, "sr");
      getNotificationData();
    });

    socket.on("admin_cancellation_notification", (data) => {
      console.log(data, "sr");
      getNotificationData();
    });

    socket.on("admin_booking_notification", (data) => {
      console.log(data, "sr");
      getNotificationData();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const Logout = async () => {
    localStorage.removeItem("authdata");
    setAuthData("");
    // const time = new Date();
    // const response = await axios.post('/logout',{
    //     // method:'POST',
    //     headers:{
    //         Acccept:"application/json",
    //         "Content-Type":"application/json"
    //     },
    //     loginTime:authData.data.time,
    //     logoutTime:time,
    //     credentials:"include"
    //  })
    //   .then((response) => {
    //     navigation("/")
    //     // console.log(response);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });
  };
  return (
    <Root>
      <Logo>
        <img width={`180px`} src={BrandLogo} />
      </Logo>
      <RightWrapper>
        <NotificationsWrapper>
          <NotificationBell
            onClick={(e) => handleNotificationBell(e)}
            src={bell}
          ></NotificationBell>
          <NotificationNumber>{notificationLength || 0}</NotificationNumber>
          {showNotifications && (
            <>
              <Notifications>
               <NotificationWrapper>
                <NotificationText>
                Notifications
                </NotificationText>
               </NotificationWrapper>
                {notificationData &&
                  notificationData?.map((val, key) => (
                    <NotificationDiv key={key}
                    isLatest={key === 0}
                      opened={val?.openedId.includes(authData?.data?.id)}
                    >
                    
                     <NotificationNameTime>
                     <Notification>{`${val?.status} by ${val?.username} `}</Notification>
                      <NotificationTime>
                        {getTimeNotification(val?.createdAt)}
                      </NotificationTime>
                     </NotificationNameTime>
                    </NotificationDiv>
                  ))}
              </Notifications>
            </>
          )}
        </NotificationsWrapper>
        <UserInfo>
          {/* {authData?.data?.profile?<Image src={`http://http://139.59.82.13:4000/:1999/uploads/${authData?.data?.profile}`} style={{height:"50px",width:"50px"}} roundedCircle alt='image'/>:<UserImg src={Avtar} alt="hello" />} */}
          <DropDown onClick={(e) => setShow(e)}>
            {authData?.data?.name}{" "}
            <i className="fa-sharp fa-solid fa-caret-down"></i>
          </DropDown>
          {showDropDown && (
            <ListWrapper>
              <Option
                onClick={() => {
                  setShowDropDown(false);
                  navigation("/profile");
                }}
              >
                Profile
              </Option>
              <Option
                onClick={() => {
                  setShowDropDown(false);
                  Logout();
                }}
              >
                Logout
              </Option>
            </ListWrapper>
          )}
        </UserInfo>
      </RightWrapper>
    </Root>
  );
}

export default Navigation;
