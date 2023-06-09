import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { environmentVariables } from "../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/ContextApi";
import { Button } from "@mui/material";
import CircularLoader from "../Component/CircularLoader/CircularLoader";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";

import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import moment from "moment";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const Item = newStyle(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapDialog = newStyle(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const HotelCardsWrapper = styled.div``;

const HotelCard = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #aec5c5;
  border-radius: 5px;
`;

const HotelImage = styled.img`
  width: 280px;
`;

const HotelBigText = styled.div`
  font-size: 18px;
  padding-bottom: 10px;
`;

const HotelInfoText = styled.div`
  font-size: 14px;
`;
const HotelIcon = styled.i``;
const HotelIconWrapper = styled.div``;
const HotelActionButtons = styled.div`
  background-color: #17a2b8;
  color: #fff;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const HotelInfoWrapper = styled.div`
  width: 50%;
  margin: 10px 30px;
`;

const PayOutInfoWrapper = styled.div`
  width: 50%;
  margin: 10px 30px;
`;
const HotelButtonWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const HotelImageWrapper = styled.div``;

const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px;
  /* width: 967px; */
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const TextCenter = styled.div`
  color: red;
  text-align: center;
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
  @media (max-width: 768px) {
    display: none;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const NewRow = styled.div`
  width: 100%;
`;
const Payouts = () => {
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [addVendorPopUp, setAddVendorPopUp] = useState(false);
  const [data, setData] = useState(null);
  const [vendorlist, setVendorList] = useState(null);
  const [mainResponse, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [payoutRequestData, setPayoutRequestData] = useState(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [selectHotel, setSelectHotel] = useState("all");
  const [selectCity, setSelectCity] = useState("all");

  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate("/bookinghistorybyorderid", { state: item });
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (page === 0) {
      getAllListData();
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (item) => {
    setOpen(true);
  };
  const payoutRequestHandler = (payLinkObjectIds, hotelIds, payOutAmount) => {
    handleClickOpen();
    setPayoutRequestData({ payLinkObjectIds, hotelIds, payOutAmount });
  };
  const savePayout = async () => {
    let data = {
      payLinkId: payoutRequestData.payLinkObjectIds,
      hotelId: payoutRequestData.hotelIds,
      payoutAmount: payoutRequestData.payOutAmount,
    };
    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/savePayout`,
      headers: {
        _token: authData.data.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsButtonLoading(false);
        handleClose();
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: "Request send Successfully.",
            timer: "800",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: response.data.message,
            timer: "800",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          timer: "800",
        });
      });
  };
  //
  const makePayOutRequest = () => {
    setIsButtonLoading(true);
    savePayout();
  };
  const getComponents = () => {
    if (isLoading === true) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <CircularLoader></CircularLoader>
        </div>
      );
    } else if (data) {
      if (data && data.length === 0) {
        return (
          <TextCenter>
            <span>No data found.</span>
          </TextCenter>
        );
      } else {
        return data.map((row, index) => {
          let totalEarnings = Number(row.totalEarnings);
          let feeAmount = 0;
          let adminFee =
            row.hotelsData.adminFee != undefined ? row.hotelsData.adminFee : 0;
          if (adminFee) {
            feeAmount =
              (Number(row.totalEarnings) * Number(row.hotelsData.adminFee)) /
              100;
          }
          let payOutAmount = Number(row.totalEarnings) - feeAmount;

          let payLinkObjectIds = row.objectIds;
          let hotelIds = [row.hotelId];

          let imageSrc = row.hotelsData.image.length
            ? row.hotelsData.image[0]
            : "1675936089112-teanest1.jpg";
          // lastPayoutDate
          // payoutInterval
          let dayCount =
            row.payoutInterval != undefined ? row.payoutInterval : 0;
          let payoutInterval =
            row.payoutInterval != undefined ? row.payoutInterval : 0;
          let lastPayoutDate =
            row.lastPayoutDate != undefined ? row.lastPayoutDate : 0;
          if (lastPayoutDate) {
            let a = moment(new Date(lastPayoutDate));
            var b = moment(new Date());
            dayCount = Number(a.diff(b, "days")); // 1
          }

          return (
            <HotelCard>
              <HotelImageWrapper>
                <HotelImage
                  src={`https://uat-travel-api.floxypay.com/uploads/${imageSrc}`}
                />
              </HotelImageWrapper>
              <HotelInfoWrapper>
                <HotelBigText>{row.hotelsData.hotelname}</HotelBigText>

                <HotelIconWrapper>
                  {" "}
                  <HotelIcon></HotelIcon>
                  <HotelInfoText>City : {row.hotelsData.city}</HotelInfoText>
                  <HotelInfoText>State : {row.hotelsData.state}</HotelInfoText>
                  <HotelInfoText>
                    Country : {row.hotelsData.country}
                  </HotelInfoText>
                  <HotelInfoText>Theme : {row.hotelsData.theme}</HotelInfoText>
                  <HotelInfoText>
                    Category : {row.hotelsData.hotelCategory}
                  </HotelInfoText>
                </HotelIconWrapper>
              </HotelInfoWrapper>
              <PayOutInfoWrapper>
                <p>
                  <b>TotalPaid amount : </b>
                  {totalEarnings} INR
                </p>
                <p>
                  <b>Fee amount : </b>
                  {feeAmount} ({adminFee}%) INR
                </p>
                <p>
                  <b>Payout amount : </b>
                  {payOutAmount} INR
                </p>
                {dayCount >= payoutInterval ? (
                  <Button
                    variant="contained"
                    size="small"
                    loading={true}
                    onClick={() =>
                      payoutRequestHandler(
                        payLinkObjectIds,
                        hotelIds,
                        payOutAmount
                      )
                    }
                  >
                    Payout
                  </Button>
                ) : null}
              </PayOutInfoWrapper>
            </HotelCard>
          );
        });
      }
    }
  };
  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/vendor/getPayoutList`, {
        headers: { _token: authData.data.token },
        params: {
          hotelname: selectHotel,
          cityname: selectCity,
          page: page + 1,
          limit: rowsPerPage,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setResponse(response.data.data);
        setData(response.data.data.records);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const getAllCities = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/vendor/getVendorCities`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setCityList(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getHotelListData = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/vendor/vendorget?page=1&limit=3000`,
        {
          headers: { _token: authData.data.token },
        }
      )
      .then((response) => {
        setHotelList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleCityChange = (city) => {
    console.log(city);
    setSelectCity(city);
  };
  const handleHotelChange = (hotel) => {
    setSelectHotel(hotel);
  };
  useEffect(() => {
    setIsLoading(true);
    getAllListData();
  }, [page, rowsPerPage, selectCity, selectHotel]);

  useEffect(() => {
    getHotelListData();
    getAllCities();
  }, []);
  // console.log({selectCity,selectHotel});
  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              <i
                style={{ cursor: "pointer", marginRight: "50px" }}
                onClick={() => navigate(-1)}
                class="fa-solid fa-chevron-left fa-2x"
              ></i>
              <Heading>Hotel's Payout</Heading>
            </div>
            <TextWrapper></TextWrapper>
          </Root>
          {/* <NewRow>
            <PayoutSection2>
              <b>Total Payout amount : {mainResponse.allHotelPayoutAmount}</b>
              <Button variant="contained" onClick={() => { alert("hi") }}>Payout</Button>
            </PayoutSection2>
            <PayoutSection>
              <input type="text" />
              <Button variant="contained" onClick={() => { alert("hi") }}>Payout</Button>
            </PayoutSection>
          </NewRow> */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}
              p={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Hotels
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"all"}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                    onChange={(event) => handleHotelChange(event.target.value)}
                  >
                    <option value={"all"}>All</option>
                    {hotelList.map((row, index) => {
                      return (
                        <option key={index} value={row.hotelname}>
                          {row.hotelname}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    City
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"all"}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                    onChange={(event) => handleCityChange(event.target.value)}
                  >
                    <option value={"all"}>All</option>
                    {cityList.map((row, index) => {
                      return (
                        <option key={index} value={row.city}>
                          {row.city}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item xs={4} mt={3}>
                <b>Total Payout amount :</b>
                <span>{mainResponse.allHotelPayoutAmount} INR</span>{" "}
                {/* <Button variant="contained" size="small" onClick={() => payoutRequestHandler(mainResponse.payLinkIds, mainResponse.hotelIds, mainResponse.allHotelPayoutAmount)}>Payout</Button> */}
              </Grid>
            </Grid>
          </Box>
          <HotelCardsWrapper>{getComponents()}</HotelCardsWrapper>
        </TextRoot>
        {isLoading === true ? (
          <></>
        ) : (
          <TablePagination
            component="div"
            count={mainResponse.totalrecords}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Payout Request
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure you want to Payout Request?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={isButtonLoading}
              disabled={isButtonLoading}
              onClick={makePayOutRequest}
              variant="contained"
              color="success"
            >
              Request
            </LoadingButton>
          </DialogActions>
        </BootstrapDialog>
      </TextMainWrapper>
    </>
  );
};

export default Payouts;
