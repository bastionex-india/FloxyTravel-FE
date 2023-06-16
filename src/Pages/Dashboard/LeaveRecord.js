import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import Cardbg1 from "../../Images/bg.jpg";
import { useNavigate } from "react-router-dom";
import { environmentVariables } from "../../config/config";
import { Modal, Button } from "react-bootstrap";
import VendorGraphCheck from "./VendorGraphCheck.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

const LeftCardWrapper = styled.div`
  width: calc(60% - 10px);
  /* height: 100%; */
  @media (max-width: 648px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${(p) =>
    p.bgImage &&
    `
    background-image:url(${p.bgImage});
  `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
`;
const CardText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export default function LeaveRecord() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const componentClicked = (item) => {
    navigate("/hoteldetails", { state: item });
  };
  const getSummaryData = () => {
    axios
      .get(
        `${environmentVariables.apiUrl}/vendor/getVendorSummary/${authData.data.vendorId}`
      )
      .then((res) => setSummaryData(res.data.data))
      .catch((err) => console.log(err));
  };
  const getVendorData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/auth/vendorget`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setData(response.data.data.hotels);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getVendorData();
    getSummaryData();
  }, []);

  const [showModal, setShowModel] = useState(false);

  function deleteConfirmation() {
    setShowModel(true);
  }

  function hideModal() {
    setShowModel(false);
  }

  const boldTextCss = {
    fontWeight: 700,
  };

  return (
    <>
      <div class="row row-cols-4 g-4" style={{ width: "70rem" }}>
        <div class="col">
          <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-body">
              <h6 style={{ textAlign: "center" }} class="card-title">
                EARNINGS
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.totalEarnings}
              </h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-body">
              <h6 style={{ textAlign: "center" }} class="card-title">
                HOTELS
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.totalHotels}
              </h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-body">
              <h6 style={{ textAlign: "center" }} class="card-title">
                BOOKINGS
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.totalBookings}
              </h1>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="card-body">
              <h6 style={{ textAlign: "center" }} class="card-title">
                PENDING
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.pendingBookings}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <VendorGraphCheck />
    </>
  );
}
