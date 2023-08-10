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
import HistoryIcon from '@mui/icons-material/History'
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
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

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
  padding-left: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const HeadingWrapper = styled.div`
  position: relative;
  // display: flex;
  display: -webkit-box;
  // justify-content: center;
  // align-items: center;
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
  const [activityList, setActivityList] = useState([]);
  const [selectHotel, setSelectHotel] = useState("all");
  const [selectCity, setSelectCity] = useState("all");
  const [selectedHotel, setSelectedHotel] = useState('all'); 
  const [selectedActivity, setSelectedActivity] = useState('all');
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
  const payoutRequestHandler = (payLinkObjectIds, hotelIds, payOutAmount, payoutFrom, payoutTo) => {
    handleClickOpen();
    setPayoutRequestData({ payLinkObjectIds, hotelIds, payOutAmount, payoutFrom, payoutTo });
  };
  const savePayout = async () => {
    let data = {
      payLinkId: payoutRequestData.payLinkObjectIds,
      hotelId: payoutRequestData.hotelIds,
      payoutAmount: payoutRequestData.payOutAmount,
      payoutFrom: payoutRequestData.payoutFrom,
      payoutTo: payoutRequestData.payoutTo
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
        setIsButtonLoading(false);
        handleClose();
        Swal.fire({
          icon: "error",
          title: err.response.data.message,
          timer: "800",
        });
      });
  };

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
            <span>No payouts found.</span>
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
          // row.hotelsData.lastPayoutDate
          // row.hotelsData.payoutInterval
          let dayCount =
            row.hotelsData.payoutInterval != undefined ? row.hotelsData.payoutInterval : 0;
          let payoutInterval =
            row.hotelsData.payoutInterval != undefined ? row.hotelsData.payoutInterval : 0;
          let lastPayoutDate =
            row.hotelsData.lastPayoutDate != undefined ? row.hotelsData.lastPayoutDate : 0;
          if (lastPayoutDate){
            let a = moment(new Date(lastPayoutDate));
            var b = moment(new Date());
            dayCount = Number(b.diff(a, "days")); // 1
            // console.log("dayCount",dayCount);
            // console.log("a",a.format('YYYY-MM-DD'))
            // console.log("b",b.format('YYYY-MM-DD'))
          }
          // console.log("lastPayoutDate",lastPayoutDate);
          let payoutFrom = lastPayoutDate ? moment(new Date(lastPayoutDate)).format('YYYY-MM-DD') : '1950-01-19';
          let payoutTo = moment().format('YYYY-MM-DD');

          // console.log("payoutFrom",payoutFrom);
          // console.log("currentDate",currentDate)
          // payoutInterval = -1
          // console.log("dayCount",dayCount);
          // console.log("payoutInterval",payoutInterval)
          // console.log("row",row)
          return (
            <HotelCard>
              <HotelImageWrapper>
                <HotelImage
                  src={`${environmentVariables.apiUrl}/uploads/${imageSrc}`}
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
                  {
                    (row.hotelsData.type == undefined || row.hotelsData.type == 'hotel') ?
                      <>
                        <HotelInfoText>Theme : {row.hotelsData.theme}</HotelInfoText>
                        <HotelInfoText>
                          Category : {row.hotelsData.hotelCategory}
                        </HotelInfoText>
                      </>
                      : null
                  }
                  <HotelInfoText> Type : 
                    {
                      (row.hotelsData.type == undefined || row.hotelsData.type == 'hotel') ? 
                      <>
                      <span className="text-primary fw-bold"> Hotel</span>
                      </>
                      :
                      <>
                      <span className="text-primary fw-bold"> Activity</span>
                      </>
                    }
                  </HotelInfoText>
                </HotelIconWrapper>
              </HotelInfoWrapper>
              <PayOutInfoWrapper>
                <ul style={{ listStyle: "none" }}>
                  <li><b>TotalPaid amount : </b> {totalEarnings.toFixed(2)} INR</li>
                  <li><b>Fee amount : </b> {feeAmount.toFixed(2)} ({adminFee}%) INR</li>
                  <li><b>Payout amount : </b> {payOutAmount.toFixed(2)} INR</li>
                  <li><b>Payout Time periods : </b> {moment(payoutFrom).format('LL')} to {moment(payoutTo).format('LL')}</li>
                  <li>
                      <Button
                        variant="contained"
                        size="small"
                        loading={true}
                        disabled={!(dayCount >= payoutInterval)}
                        onClick={() =>
                          payoutRequestHandler(
                            payLinkObjectIds,
                            hotelIds,
                            payOutAmount,
                            payoutFrom,
                            payoutTo
                          )
                        }
                      >
                        Request Payout
                      </Button>
                      {
                        !(dayCount >= payoutInterval) ? 
                        <p className="text-warning">if you complete {payoutInterval}  days from last payout date of  this {row.hotelsData.type}. then you  can make new Payout Request to admin.</p>
                        :null
                      }
                  </li>
                </ul>

              </PayOutInfoWrapper>
            </HotelCard>
          );
        });
      }
    }
  };
  const getPayoutHistory = () => {
    navigate("/payoutHistory");
  }
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
        `${environmentVariables.apiUrl}/vendor/vendorget`,
        {
          headers: { _token: authData.data.token },
          params:{
            page : 1,
            limit : 10000,
            type: "hotel"
          }
        }
      )
      .then((response) => {
        setHotelList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getActivitiesListData = async ()=>{
    await axios
      .get(
        `${environmentVariables.apiUrl}/vendor/vendorget`,
        {
          headers: { _token: authData.data.token },
          params:{
            page : 1,
            limit : 10000,
            type: "activity"
          }
        }
      )
      .then((response) => {
        // console.log("response.data.  ",response.data);
        setActivityList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  const handleCityChange = (city) => {
    console.log(city);
    setSelectCity(city);
  };
  

  const handleHotelChange = (hotel) => {
    setSelectHotel(hotel);
    // reset data of another dropdown 
    setSelectedHotel(hotel)
    setSelectedActivity('all');
  };
  const handleActivityChange = (activity)=>{
    setSelectHotel(activity);
    // reset data of another dropdown 
    setSelectedHotel('all')
    setSelectedActivity(activity);
  }

  useEffect(() => {
    setIsLoading(true);
    getAllListData();
  }, [page, rowsPerPage, selectCity, selectHotel]);

  useEffect(() => {
    getHotelListData();
    getActivitiesListData();
    getAllCities();
  }, []);
  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <HeadingWrapper>
              <IconButton title="Back" onClick={() => navigate(-1)} size="small" sx={{ backgroundColor: "#e1e1e1", color: "#01575c", marginTop: "4px" }}>
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <Heading>Payout</Heading>
              <div style={{ marginTop: "4px", position: "absolute", right: "0px" }}>
                Payout History {" "}
                <IconButton title="History" onClick={() => getPayoutHistory()} size="small" sx={{ backgroundColor: "#e1e1e1", color: "#01575c" }}>

                  <HistoryIcon />
                </IconButton>
              </div>

            </HeadingWrapper>
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
              {
                hotelList.length ?
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <label>
                      Hotels
                    </label>
                    <select
                      style={{ height: '45px', border: "1px solid #cccc", marginTop: "10px", borderRadius: "6px" }}
                     value={selectedHotel} onChange={(event) => handleHotelChange(event.target.value)}
                    >
                      <option value={"all"}>All</option>
                      {hotelList.map((row, index) => {
                        return (
                          <option key={index} value={row.hotelname}>
                            {row.hotelname}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                </Grid>
                : null
              }
              {
                activityList.length ? 
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <label>
                      Activity
                    </label>
                    <select
                      style={{ height: '45px', border: "1px solid #cccc", marginTop: "10px", borderRadius: "6px" }}
                      value={selectedActivity} onChange={(event) => handleActivityChange(event.target.value)}
                    >
                      <option value={"all"}>All</option>
                      {activityList.map((row, index) => {
                        return (
                          <option key={index} value={row.hotelname}>
                            {row.hotelname}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                </Grid>
                : null
              }
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <label>
                    City
                  </label>
                  <select
                    style={{ height: '45px', border: "1px solid #cccc", marginTop: "10px", borderRadius: "6px" }}
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
                  </select>
                </FormControl>
              </Grid>
              <Grid item xs={3} mt={3}>
                <b>Total Payout: </b>
                <span>{(mainResponse.allHotelPayoutAmount) ? mainResponse.allHotelPayoutAmount.toFixed(2) : '0.00'} INR</span>{" "}
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
