import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import Cardbg1 from "../../Images/bg.jpg";
import { useNavigate } from "react-router-dom";
import { environmentVariables } from "../../config/config";
import { Modal, Button } from "react-bootstrap";
import VendorGraphCheck from "./VendorGraphCheck.js";
import Card from "@material-ui/core/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";

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

const CardWrapper = styled.div`
  width: 25%;
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 74vw;
`;
const CardText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export default function LeaveRecord({ vendorId }) {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const componentClicked = (item) => {
    navigate("/hoteldetails", { state: item });
  };
  const getSummaryData = () => {
    const vendorid = authData.data.vendorId || vendorId;

    axios
      .get(`${environmentVariables.apiUrl}/admin/getVendorSummary/${vendorid}`)
      .then((res) => {
        setSummaryData(res.data.data);
        setIsLoadingCards(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoadingCards(true);
    getSummaryData();
  }, [vendorId]);

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
      {isLoadingCards === true ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularLoader></CircularLoader>
        </div>
      ) : (
        <CardsWrapper>
          <CardWrapper>
            <Card style={{ padding: "50px 0px", marginRight: "20px" }}>
              <h6 style={{ textAlign: "center" }} class="card-title">
                EARNINGSuu
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                ₹ {summaryData?.totalEarnings}
              </h1>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card style={{ padding: "50px 0px", marginRight: "20px" }}>
              <h6 style={{ textAlign: "center" }} class="card-title">
                PAYOUT
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                ₹ {summaryData?.allPayoutAmount}
              </h1>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card style={{ padding: "50px 0px", marginRight: "20px" }}>
              <h6 style={{ textAlign: "center" }} class="card-title">
                HOTELS
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.totalHotels}
              </h1>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card style={{ padding: "50px 0px" }}>
              <h6 style={{ textAlign: "center" }} class="card-title">
                BOOKINGS
              </h6>
              <h1
                style={{ textAlign: "center", color: "#008080" }}
                class="card-text"
              >
                {summaryData?.totalBookings}
              </h1>
            </Card>
          </CardWrapper>
        </CardsWrapper>
      )}
      <VendorGraphCheck />
    </>
  );
}
