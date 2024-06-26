import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { environmentVariables } from "../../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext, useAuth } from "../../ContextApi/ContextApi";
import { Button } from "@mui/material";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import TablePagination from "@mui/material/TablePagination";
import Swal from "sweetalert2";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import moment from "moment";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import FormControl from "@mui/material/FormControl";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";



const CustomTablePagination = styled(TablePagination)`
  display: flex !important;
  justify-content: flex-end !important;
  align-items: baseline !important;
  p {
    margin: 0px !important;
  }

`;
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

const HotelInfoWrapper = styled.div`
  width: 50%;
  margin: 10px 15px;
`;

const PayOutInfoWrapper = styled.div`
  width: 50%;
  margin: 10px 15px;
  padding: 0;
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

const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const PayoutRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
 const { authData } = useAuth();
  const [data, setData] = useState(null);
  const [vendorlist, setVendorList] = useState([]);
  const [mainResponse, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [payoutRequestData, setPayoutRequestData] = useState(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");
  const [cityList, setCityList] = useState([]);
  const [hotelList, setHotelList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [selectHotel, setSelectHotel] = useState("all");
  const [selectCity, setSelectCity] = useState("all");
  const [selectVendor, setSelectVendor] = useState("all");
  const [selectStatus, setSelectStatus] = useState("all");
  const navigate = useNavigate();

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
        _token: authData.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsButtonLoading(false);
        handleClose();
        if (response.data.success) {
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
  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getPayoutRequestList`, {
        headers: { _token: authData.token },
        params: {
          hotelid: selectHotel,
          cityname: selectCity,
          vendorid: selectVendor,
          status: selectStatus,
          page: page + 1,
          limit: rowsPerPage,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setResponse(response.data.data);
        setData(response.data.data.records);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const updatePayoutRequest = (status, requestId) => {
    let data = {
      requestId,
      status,
    };
    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/updatePayoutRequest`,
      headers: {
        _token: authData.token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // setIsButtonLoading(false);
        // handleClose();
        console.log(response.data.success)
        if (response.data.success) {
          // load all data
          getAllListData();
          Swal.fire({
            icon: "success",
            title: "Request updated.",
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
  const handleChangeStatus = (e, item) => {
    // console.log("target", item)

    updatePayoutRequest(e.target.value, item._id);
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
            <span>No payouts requests found.</span>
          </TextCenter>
        );
      } else {
        return data.map((row, index) => {

          let imageSrc = row.hotelsData.image.length
            ? row.hotelsData.image[0]
            : "1675936089112-teanest1.jpg";

      
          return (
            <HotelCard key={index}>
              <HotelImageWrapper>
                <HotelImage
                  src={`https://bastionex-travels.b-cdn.net/uploads/${imageSrc}`}
                  height={244}
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
                    Country :{" "}
                    {row.hotelsData.country ? row.hotelsData.country : "NA"}
                  </HotelInfoText>
                  {row.hotelsData.type === undefined ||
                  row.hotelsData.type !== "activity" ? (
                    <>
                      <HotelInfoText>
                        Theme :{" "}
                        {row.hotelsData.theme ? row.hotelsData.theme : "NA"}
                      </HotelInfoText>
                      <HotelInfoText>
                        Category :{" "}
                        {row.hotelsData.hotelCategory
                          ? row.hotelsData.hotelCategory
                          : "NA"}
                      </HotelInfoText>
                    </>
                  ) : null}
                  <HotelInfoText>
                    {" "}
                    Type :
                    {row.hotelsData.type === undefined ||
                    row.hotelsData.type === "hotel" ? (
                      <>
                        <span className="text-primary fw-bold"> Hotel</span>
                      </>
                    ) : (
                      <>
                        <span className="text-primary fw-bold"> Activity</span>
                      </>
                    )}
                  </HotelInfoText>
                </HotelIconWrapper>
              </HotelInfoWrapper>
              <PayOutInfoWrapper>
                <ul style={{ listStyle: "none", padding:"0" }}>
                  <li>
                    <b>Vendor Name : </b> {row.vendorData.name}
                  </li>
                  <li>
                    <b>Status : </b>{" "}
                    <Chip
                      sx={{
                        borderRadius: "3px",
                        border: "1px solid black",
                      }}
                      label={row.status}
                      color={row.status === "pending" ? "warning" : "success"}
                    />
                  </li>
                  <li>
                    <b>Payout amount : </b> {row.payoutAmount.toFixed(2)} INR
                  </li>
                  <li>
                    <b>Requested Date : </b>{" "}
                    {moment(row.createdAt).format("LL")}
                  </li>
                  <li>
                    <b>Payout Time periods : </b>{" "}
                    {moment(row.payoutFrom).format("LL")} to{" "}
                    {moment(row.payoutTo).format("LL")}
                  </li>
                  <li>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        disabled={row.status === "approved"}
                        defaultValue={row.status}
                        onChange={(e) => handleChangeStatus(e, row)}
                        displayEmpty
                        size="small"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                      </Select>
                    </FormControl>
                  </li>
                </ul>
              </PayOutInfoWrapper>
            </HotelCard>
          );
        });
      }
    }
  };

  const getAllCities = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getPayoutReqCities`, {
        headers: { _token: authData.token },
      })
      .then((response) => {
        setCityList(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getAllVendors = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/admin/getallvendor`,
        {
          headers: { _token: authData.token },
        }
      )
      .then((response) => {
        setVendorList(response.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getHotelListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getallhotels`, {
        headers: { _token: authData.token },
        params: {
          page: 1,
          limit: 10000,
          type: "hotel",
        },
      })
      .then((response) => {
        setHotelList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const getActivitiesListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getallhotels`, {
        headers: { _token: authData.token },
        params: {
          page: 1,
          limit: 10000,
          type: "activity",
        },
      })
      .then((response) => {
        setActivityList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleCityChange = (city) => {
    setSelectCity(city);
  };
  const handleStatusChange = (status) => {
    setSelectStatus(status);
  };
  const handleHotelChange = (hotel) => {
    setSelectHotel(hotel);
    // reset data of another dropdown
    setSelectedHotel(hotel);
    setSelectedActivity("all");
  };
  const handleActivityChange = (activity) => {
    setSelectHotel(activity);
    // reset data of another dropdown
    setSelectedHotel("all");
    setSelectedActivity(activity);
  };
  const handleVendorChange = (vendor) => {
    setSelectVendor(vendor);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllListData();
  }, [page, rowsPerPage, selectCity, selectHotel, selectVendor, selectStatus]);

  useEffect(() => {
    getHotelListData();
    getActivitiesListData();
    getAllCities();
    getAllVendors();
  }, []);

  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <HeadingWrapper>
              <IconButton
                title="Back"
                onClick={() => navigate(-1)}
                size="small"
                sx={{
                  backgroundColor: "#e1e1e1",
                  color: "#01575c",
                  marginTop: "4px",
                }}
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <Heading>Vendor's Payout Requests</Heading>
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
              {hotelList.length ? (
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <label>Hotels</label>
                    <select
                      style={{
                        height: "45px",
                        border: "1px solid #cccc",
                        marginTop: "10px",
                        borderRadius: "6px",
                      }}
                      value={selectedHotel}
                      onChange={(event) =>
                        handleHotelChange(event.target.value)
                      }
                    >
                      <option value="all">All</option>
                      {hotelList.map((row, index) => {
                        return (
                          <option key={index} value={row._id}>
                            {row.hotelname}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                </Grid>
              ) : null}
              {activityList.length ? (
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <label>Activity</label>
                    <select
                      style={{
                        height: "45px",
                        border: "1px solid #cccc",
                        marginTop: "10px",
                        borderRadius: "6px",
                      }}
                      value={selectedActivity}
                      onChange={(event) =>
                        handleActivityChange(event.target.value)
                      }
                    >
                      <option value="all">All</option>
                      {activityList.map((row, index) => {
                        return (
                          <option key={index} value={row._id}>
                            {row.hotelname}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                </Grid>
              ) : null}
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <label>Vendor</label>
                  <select
                    style={{
                      height: "45px",
                      border: "1px solid #cccc",
                      marginTop: "10px",
                      borderRadius: "6px",
                    }}
                    onChange={(event) => handleVendorChange(event.target.value)}
                  >
                    <option value={"all"}>All</option>
                    {vendorlist.map((row, index) => {
                      return (
                        <option key={index} value={row.vendorId}>
                          {row.name}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <label>City</label>
                  <select
                    style={{
                      height: "45px",
                      border: "1px solid #cccc",
                      marginTop: "10px",
                      borderRadius: "6px",
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
                  </select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <label>Status</label>
                  <select
                    style={{
                      height: "45px",
                      border: "1px solid #cccc",
                      marginTop: "10px",
                      borderRadius: "6px",
                    }}
                    onChange={(event) => handleStatusChange(event.target.value)}
                  >
                    <option value={"all"}>All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                  </select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <HotelCardsWrapper>{getComponents()}</HotelCardsWrapper>
        </TextRoot>

        {isLoading === true ||
        mainResponse.totalrecords === undefined ||
        mainResponse.totalrecords === 0 ? (
          <></>
        ) : (
          <CustomTablePagination
            component="div"
            count={mainResponse.totalrecords}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{  display:"flex", justifyContent:"flex-end",alignItems:"baseline"}}
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

export default PayoutRequest;
