import React from "react";
import styled from "styled-components";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@material-ui/core/Card";
import Button from "@mui/material/Button";
import { environmentVariables } from "../../config/config";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import { ButtonBase, TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { VendorRegisterSchema } from "./schemas/VendorRegisterSchems";
import Check from "./Check.js";
import { Modal } from "react-bootstrap";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import GraphCheck from "./GraphCheck";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";

// Money
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

// apartment
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

// Vendor
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// Hotel
import BedroomChildOutlinedIcon from "@mui/icons-material/BedroomChildOutlined";
// Total Booking
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

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
`;
const CardWrapper = styled.div`
  // width: 25%;
`;

const CardsWrapperContainer = styled.div``;
const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;
// const Card = styled.div``;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`;
const CardsWrapper1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 20px;


`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const boldTextCss = {
  fontWeight: 700,
};

const VendorList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const getSummaryData = () => {
    axios
      .get(`${environmentVariables.apiUrl}/admin/getSummaryData`)
      .then((res) => {
        setSummaryData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setIsLoading(true);
    getSummaryData();
  }, []);


  return (
    <div>
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
        <CardsWrapperContainer>
          <CardsWrapper1>
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
                      <Item elevation={0} style={{display:"flex",justifyContent:"space-between", flexDirection:"column",alignItems:"flex-start",textAlign:"start"}}>
                        <p
                          style={{ textAlign: "left", margin: "0 !important", justifyContent:"center", display:"flex" }}
                          className="card-title"
                        >
                          <b>Earnings</b>
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            color: "#008080",
                            margin: "0",
                           
                            fontSize: "18px",
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
                             fontSize: "18px",
                        
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
                          <AccountCircleOutlinedIcon fontSize="inherit" />
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
                          <b>Vendors</b>
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            color: "#008080",
                            margin: "0",
                             fontSize: "18px",
                          }}
                        >
                          {summaryData?.totalVendors}
                        </p>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
          </CardsWrapper1>
          <CardsWrapper1>
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
                             fontSize: "18px",
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
                          <b>Activities</b>
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            color: "#008080",
                            margin: "0",
                             fontSize: "18px",
                          }}
                        >
                          {summaryData?.totalActivity}
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
                             fontSize: "18px",
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
          </CardsWrapper1>
        </CardsWrapperContainer>
      )}

      <GraphCheck />
    </div>
  );
};

export default VendorList;
