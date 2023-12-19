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

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { IconButton } from "@mui/material";
import { styled as newStyle } from "@mui/material/styles";
const Item = newStyle(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  // width: 25%;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
  // width: 74vw;
  width:100%;
  @media(max-width:1240px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media(max-width:1024px){
    grid-template-columns: 1fr 1fr 1fr;
  }

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
    const vendorid = authData !== null && (authData.data.vendorId || vendorId);

    axios
      .get(`${environmentVariables.apiUrl}/admin/getVendorSummary/${vendorid}`)
      .then((res) => {
        console.log("res.data.data",res.data.data)
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
            <Card
              elevation={0}
              style={{ padding: "50px 0px" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Item elevation={0}>
                      <IconButton
                        size="medium"
                        sx={{ backgroundColor: "#E1F6F8" }}
                      >
                        <AttachMoneyOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingLeft: "10px !important" }}
                  >
                    <Item elevation={0}>
                      <p
                        style={{ textAlign: "left", margin: "0 !important" }}
                        className="card-title"
                      >
                        <b>Earnings</b>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          color: "#008080",
                          margin: "0",
                        }}
                      >
                        ₹ {summaryData?.totalEarnings.toFixed(2)}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </CardWrapper>

          <CardWrapper>
            <Card
              elevation={0}
              style={{ padding: "50px 0px" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Item elevation={0}>
                      <IconButton
                        size="medium"
                        sx={{ backgroundColor: "#E1F6F8" }}
                      >
                        <AccountBalanceWalletOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingLeft: "10px !important" }}
                  >
                    <Item elevation={0}>
                      <p
                        style={{ textAlign: "left", margin: "0 !important" }}
                        className="card-title"
                      >
                        <b>Payouts</b>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          color: "#008080",
                          margin: "0",
                        }}
                      >
                        ₹ {summaryData?.allPayoutAmount.toFixed(2)}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card
              elevation={0}
              style={{ padding: "50px 0px" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Item elevation={0}>
                      <IconButton
                        size="medium"
                        sx={{ backgroundColor: "#E1F6F8" }}
                      >
                        <BedroomChildOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingLeft: "10px !important" }}
                  >
                    <Item elevation={0}>
                      <p
                        style={{ textAlign: "left", margin: "0 !important" }}
                        className="card-title"
                      >
                        <b>Hotels</b>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          color: "#008080",
                          margin: "0",
                        }}
                      >
                        {summaryData?.totalHotels}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card
              elevation={0}
              style={{ padding: "50px 0px" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Item elevation={0}>
                      <IconButton
                        size="medium"
                        sx={{ backgroundColor: "#E1F6F8" }}
                      >
                        <BedroomChildOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingLeft: "10px !important" }}
                  >
                    <Item elevation={0}>
                      <p
                        style={{ textAlign: "left", margin: "0 !important" }}
                        className="card-title"
                      >
                        <b>Activities</b>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          color: "#008080",
                          margin: "0",
                        }}
                      >
                        {summaryData?.totalActivities}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </CardWrapper>
          <CardWrapper>
            <Card
              elevation={0}
              style={{ padding: "50px 0px" }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Item elevation={0}>
                      <IconButton
                        size="medium"
                        sx={{ backgroundColor: "#E1F6F8" }}
                      >
                        <RequestQuoteOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{ paddingLeft: "10px !important" }}
                  >
                    <Item elevation={0}>
                      <p
                        style={{ textAlign: "left", margin: "0 !important" }}
                        className="card-title"
                      >
                        <b>Bookings</b>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          color: "#008080",
                          margin: "0",
                        }}
                      >
                        {summaryData?.totalBookings}
                      </p>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </CardWrapper>
        </CardsWrapper>
      )}
      <VendorGraphCheck />
    </>
  );
}
