import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../../Component/CircularLoader/CircularLoader";
import styled from "styled-components";
import axios from "axios";
import Check from "../Check";
import { environmentVariables } from "../../../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../ContextApi/ContextApi";
import io, { socketIOClient } from "socket.io-client";
import Swal from "sweetalert2";

import { Button } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

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

const HeadingWrapper = styled.div`
  position: relative;
  // display: flex;
  display: -webkit-box;
  // justify-content: center;
  // align-items: center;
`;
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
const Lable = styled.div`
  font-size: 16px;
  margin-bottom: -10px;
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
const DocInfo = styled.div`
  // display: flex;
`;
const DocName = styled.div`
  margin-left: 4px;
  // font-weight: 600;
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
  /* ; */
  @media (max-width: 768px) {
    display: none;
  }
`;

const TextSelectField = styled.div`
  margin: 10px 0px 0px 10px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;
const SelectVendor = styled.select`
  /* width: 85%; */
  font-size: 14px;
  border-radius: 5px;
  min-width: 400px;
  padding: 10px;
`;
const SelectOption = styled.option`
  font-size: 14px;
`;
const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;
const RecentlyUploaded = styled.div`
  background: #fff;
  display: grid;
  grid-template-columns: 18% 27% 12% 18% 15% 9%;
  -webkit-box-align: center;
  align-items: center;
  // margin: 15px 2%;
  // padding: 14px 15px;
  margin: 4px 2%;
  padding: 4px 0px;

  box-shadow: 0px 0px 5px 5px #0000;
  border-radius: 5px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const RecentlyUploadedDate = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedType = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedStatus = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedButton = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 0px;
  font-size: 14px;
  background-color: #6836ed;
  color: #fff;
  text-align: center;
  @media (max-width: 768px) {
    padding: 5px 13px;
  }
`;

const RecentlyUploadedHeader = styled.div`
  display: grid;
  grid-template-columns: 18% 27% 12% 18% 15% 9%;
  margin: 15px 2%;
  padding: 14px 15px;
  font-weight: 500;
  @media (max-width: 768px) {
    display: none;
  }
`;
const RecentlyUploadedHeaderElem = styled.div`
  color: #6c7074;
  padding-left: 4px;
`;
const AddButton = styled.div`
  background-color: #01575c;
  height: 40px;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  // font-weight: 700;
  margin-left: 20px;
  cursor: pointer;
`;
const RecentlyUploadedButtonWrapper = styled.div``;

const DocImage = styled.img`
  /* width:50px;  */
`;

const SideBar = styled.div`
  background-color: black;
`;
const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const TextCenter = styled.div`
  color: red;
  text-align: center;
`;

const ManageAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { authData, setAuthData } = useContext(AuthContext);
  const [addVendorPopUp, setAddVendorPopUp] = useState(false);
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [response, setResponse] = useState();
  const [vendorlist, setVendorList] = useState(null);
  const [open, setOpen] = useState(false);
  const [hotelDetails, setHotelDetails] = useState();
  const [vendorId, setVendorId] = useState(null);

  const navigate = useNavigate();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getallhotels`, {
        headers: { _token: authData.data.token },
        params: {
          page: page + 1,
          limit: rowsPerPage,
          type: "hotel",
        },
      })
      .then((response) => {
        setResponse(response.data.data);
        // setPage(response.data.data.currentpage - 1);
        setData(response.data.data.totalrecords);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const getHotelByVendorId = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/admin/gethoteldetailbyvendorid/${vendorId}`,
        {
          headers: { _token: authData.data.token },
          params: {
            page:page + 1,
            limit: rowsPerPage,
            type: "hotel",
          },
        }
      )
      .then((response) => {
        setResponse(response.data.data);
        setData(response.data.data.hotels);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const getVendorList = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setVendorList(response.data.data.records);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    if (vendorId !== null) {
      getHotelByVendorId();
    } else {
      getAllListData();
    }
    getVendorList();
  }, [page, rowsPerPage, vendorId, open]);

  const vendorHandler = (e) => {
    setIsLoading(true);
    setPage(0);
    setRowsPerPage(10);
    if (e.target.value === "all") {
      setVendorId("all");
    } else {
      setVendorId(e.target.value);
    }
  };
  const DeleteHotel = (item) => {
    const config = {
      method: "delete",
      url: `${environmentVariables.apiUrl}/admin/deletehotel/${item._id}`,
      headers: {
        _token: authData.data.token,
      },
    };

    axios(config)
      .then(function (response) {
        Swal.fire("Deleted", "Hotel Deleted Successfully", "success");
        setOpen(false);
        getHotelByVendorId();
        getAllListData();
      })
      .catch(function (error) {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (item) => {
    setHotelDetails(item);
    setOpen(true);
  };
  const deleteRecord = (item) => {
    DeleteHotel(item);
  };
  const getComponents = () => {
    if (data === null || data === undefined) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <CircularLoader />
        </div>
      );
    } else {
      if (isLoading === true) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <CircularLoader />
          </div>
        );
      } else {
        if (data.length === 0) {
          return (
            <TextCenter>
              <span>No hotels Found</span>
            </TextCenter>
          );
        } else {
          return (
            <>
              {data.map((row, index) => {
                let imageSrc = row.image.length
                  ? row.image[0]
                  : "1675936089112-teanest1.jpg";
                return (
                  <>
                    {" "}
                    <HotelCardsWrapper>
                      <HotelCard key={index}>
                        <HotelImageWrapper>
                          <HotelImage
                            src={`https://uat-travel-api.floxypay.com/uploads/${imageSrc}`}
                          />
                        </HotelImageWrapper>
                        <HotelInfoWrapper>
                          <HotelBigText>{row.hotelname}</HotelBigText>

                          <HotelIconWrapper>
                            {" "}
                            <HotelIcon></HotelIcon>
                            {/* <HotelInfoText>City : {row.city}</HotelInfoText>
                    <HotelInfoText>State : {row.state}</HotelInfoText>
                    <HotelInfoText>Country : {row.country}</HotelInfoText> */}
                            <HotelInfoText>{`Address : ${row?.city}, ${row?.state} - ${row?.country}
                  `}</HotelInfoText>
                            <HotelInfoText>Theme : {row.theme}</HotelInfoText>
                            <HotelInfoText>
                              Category : {row.hotelCategory}
                            </HotelInfoText>
                          </HotelIconWrapper>
                        </HotelInfoWrapper>
                        <HotelButtonWrapper>
                          <HotelActionButtons
                            onClick={() => navigate(`/addhotels/${row._id}`)}
                          >
                            Edit
                          </HotelActionButtons>
                          <HotelActionButtons
                            onClick={() => handleClickOpen(row)}
                          >
                            Delete
                          </HotelActionButtons>
                          {/* <HotelActionButtons>Hide</HotelActionButtons> */}
                        </HotelButtonWrapper>
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Delete
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <Typography gutterBottom>
                              Are you sure you want to delete the Hotel?
                            </Typography>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteRecord(hotelDetails)}
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </HotelCard>
                    </HotelCardsWrapper>
                  </>
                );
              })}{" "}
              <TablePagination
                component="div"
                count={response?.records}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          );
        }
      }
    }
  };
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
              <Heading> Manage Hotels</Heading>
            </HeadingWrapper>
            {/* <Lable>Select Vendor</Lable> */}
            <TextWrapper>
              <SelectVendor onChange={vendorHandler}>
                {/* <SelectOption value={"all"}>Select Vendor*</SelectOption> */}
                <SelectOption value={"all"}>All Vendors</SelectOption>
                {vendorlist &&
                  vendorlist.map((row, index) => {
                    return (
                      <SelectOption key={index} value={row.vendorId}>
                        {row.name}
                      </SelectOption>
                    );
                  })}
              </SelectVendor>
              <AddButton onClick={() => navigate("/addhotels")}>
                Add Hotel
              </AddButton>
            </TextWrapper>
          </Root>
          <>{getComponents()}</>
        </TextRoot>
      </TextMainWrapper>
    </>
  );
};

export default ManageAdmin;
