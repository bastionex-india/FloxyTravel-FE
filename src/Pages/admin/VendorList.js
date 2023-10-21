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
  width: 25%;
`;
const Headtext = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
`;
const Subtext = styled.div`
  text-align: left;
  font-size: 28px;
  font-weight: 600;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;
// const Card = styled.div``;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`;
const CardsWrapper1 = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const boldTextCss = {
  fontWeight: 700,
};

const VendorList = () => {
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [adminResponseData, setAdminResponseData] = useState([]);
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [vendorValue, setVendorValue] = useState("");
  const [adminValue, setAdminValue] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setData(response.data.message);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
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
    getAllListData();
    getSummaryData();
  }, []);

  const getAnotherComponent = (item) => {
    navigate("/gethotelsbyvendorid", { state: item });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (adminValue === "vendor") {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/auth/addvendor`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          mobile: number,
          password: password,
          cpassword: cpassword,
          adminType: adminValue,
        },
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          // setUpdatedHotelData(response.data.message)
          setResponseData(response.data.data);

          setName("");
          setEmail("");
          setNumber("");
          setPassword("");
          setCPassword("");
          setAdminValue("");

          toast(response.data.message);
          setOpen(false);
        })
        .catch((error) => {
          console.log("///////////////", error);
          // setError('Details are not valid');
        });
    } else {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/auth/admin/register`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          username: name,
          email: email,
          mobile: number,
          password: password,
          cpassword: cpassword,
          adminType: adminValue,
        },
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          setAdminResponseData(response.data.data);

          setName("");
          setEmail("");
          setNumber("");
          setPassword("");
          setCPassword("");
          setAdminValue("");

          toast(response.data.message);
          setOpen(false);
        })
        .catch((error) => {
          console.log("///////////////", error);
        });
    }
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  const deleteVendor = (item) => {
    axios
      .delete(`${environmentVariables.apiUrl}/auth/deletevendor/${item._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log(response.data.data);
        getAllListData();
        setShowModel(false);
        navigate("/");
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: VendorRegisterSchema,
      onSubmit: async (values, action) => {
        console.log("aaaa", values, adminValue);
        if (adminValue === "") {
          setError("Options must be selected");
        } else {
          if (adminValue === "vendor") {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/addvendor`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                name: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                setResponseData(response.data.data);

                action.resetForm();
                getAllListData();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
              });
          } else {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/admin/register`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                username: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                setAdminResponseData(response.data.data);

                action.resetForm();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
              });
          }
        }
      },
    });

  function deleteConfirmation() {
    setShowModel(true);
  }

  function hideModal() {
    setShowModel(false);
  }

  return (
    <>
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
        <CardsWrapper>
          <CardsWrapper1>
            <CardWrapper>
              <Card
                elevation={0}
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Earnings
                        </Headtext>
                        <Subtext>
                          ₹ {summaryData?.totalEarnings.toFixed(2)}
                        </Subtext>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <Card
                elevation={0}
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Payouts
                        </Headtext>
                        <Subtext>
                          ₹ {summaryData?.allPayoutAmount.toFixed(2)}
                        </Subtext>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <Card
                elevation={0}
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Vendors
                        </Headtext>
                        <Subtext>
                          {summaryData?.totalVendors}
                        </Subtext>
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
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Hotels
                        </Headtext>
                        <Subtext>
                          {summaryData?.totalHotels}
                        </Subtext>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <Card
                elevation={0}
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Activities
                        </Headtext>
                        <Subtext>
                          {summaryData?.totalActivity}
                        </Subtext>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
            <CardWrapper>
              <Card
                elevation={0}
                style={{ padding: "50px 0px", marginRight: "20px" }}
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
                        <Headtext>
                          Bookings
                        </Headtext>
                        <Subtext>
                        {summaryData?.totalBookings}
                        </Subtext>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </CardWrapper>
          </CardsWrapper1>
        </CardsWrapper>
      )}

      <GraphCheck />
    </>
  );
};

export default VendorList;
