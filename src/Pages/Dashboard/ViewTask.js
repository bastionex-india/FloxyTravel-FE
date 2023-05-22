import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Image } from "react-bootstrap";
import moment from "moment";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../ContextApi/ContextApi";
import ITTask from "./employeeTasks/ITTask";
import CommunityTask from "./employeeTasks/CommunityTask";
import SocialMedia from "./employeeTasks/SocialMedia";
import Graphics from "./employeeTasks/Graphics";
import { environmentVariables } from "../../config/config";

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
`;
const Heading = styled.div`
  color: #012e31;
  font-size: 26px;
  font-weight: bold;
  margin-top: 20px;
`;
const NavigationSecvtion = styled.div`
  color: #858585;
  margin-top: 20px;
`;
const Container = styled.div`
  //   background-color: #fff;
  border-radius: 10px;
  box-shadow: -6.1px 3.5px 27px 0 rgb(0 0 0 / 10%);
`;

const ViewTask = () => {
  const [data, setData] = useState([]);
  const { authData, setAuthData } = useContext(AuthContext);
  const [IT, setIT] = useState("");
  const [community, setCommunity] = useState("");
  const [graphics, setGraphics] = useState("");
  const [sm, setSM] = useState("");
  const [timer, setTimer] = useState(0);
  const increment = useRef(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [refreshTime, setRefreshTime] = useState(timer);

  const TimeAlert = () => {
    clearInterval(increment.current);
    setShow(true);
  };
  const TimeAlert1 = () => {
    setShow(false);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  useEffect(() => {
    if (authData && authData.data.group === "IT") {
      // setIT(authData)
      axios
        .get(`${environmentVariables?.apiUrl}/auth/getsoftwaredevelopmettasks`, {
          headers: { _token: authData.data.token.token },
        })
        .then((res) => {
          const response = res.data;
          // console.log("data",response)
          setIT(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (authData && authData.data.group === "community") {
      axios
        .get(`${environmentVariables?.apiUrl}/auth/getcommunitytasks`, {
          headers: { _token: authData.data.token.token },
        })
        .then((res) => {
          const response = res.data;
          console.log("data", response);
          setCommunity(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (authData && authData.data.group === "sm") {
      axios
        .get(`${environmentVariables?.apiUrl}/auth/getgmtasks`, {
          headers: { _token: authData.data.token.token },
        })
        .then((res) => {
          const response = res.data;
          console.log("data", response);
          setSM(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (authData && authData.data.group === "graphics") {
      axios
        .get(`${environmentVariables?.apiUrl}/auth/gettasks`, {
          headers: { _token: authData.data.token.token },
        })
        .then((res) => {
          const response = res.data;
          console.log("data", response);
          setGraphics(response.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log("ll", IT, community, graphics, sm);
  const formatTime = () => {
    // console.log("030303");
    // if(timer===0){
    //   increment.current = setInterval(() => {
    //     setTimer((timer) => timer + 1)

    //   }, 1000)
    // }
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    // console.log("dfdf",timer,refreshTime,` ${getHours}h ${getMinutes}m ${getSeconds}s`)
    // localStorage.setItem("timing",timer)
    return ` ${getHours}h ${getMinutes}m ${getSeconds}s`;
  };

  return (
    <Root>
      <NavigationSecvtion>
        <b
          style={{ marginRight: "5px", cursor: "pointer", color: "#01575c" }}
          onClick={() => {
            // navigate("/");
          }}
        >
          Dashboard /
        </b>
        <span style={{ cursor: "pointer" }}>view tasks</span>
      </NavigationSecvtion>
      <Heading>View Tasks</Heading>
      {IT ? (
        <ITTask IT={IT} />
      ) : community ? (
        <CommunityTask />
      ) : sm ? (
        <SocialMedia />
      ) : (
        <Graphics />
      )}
    </Root>
  );
};

export default ViewTask;
