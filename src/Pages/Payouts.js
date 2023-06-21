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

import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";



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

const Payouts = ()=>{

    
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [addVendorPopUp, setAddVendorPopUp] = useState(false);
  const [data, setData] = useState(null);
  const [vendorlist, setVendorList] = useState(null);
  const [mainResponse, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [hotelDetails, setHotelDetails] = useState();
  const [buttonStatus,setButtonStatus] = useState('Request')
  const navigate = useNavigate();

  const handleClick = (item) => {
    console.log("hcjhcjhf", item);
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
    // setHotelDetails(item);
    setOpen(true);
  };
  const payoutRequestHandler = (totalEarnings,adminFee,payouts)=>{
        // console.log({totalEarnings,adminFee,payouts})
        handleClickOpen({totalEarnings,adminFee,payouts})

  }
  const savePayout = async ()=>{
    await axios
      .get(`${environmentVariables.apiUrl}/vendor/savePayout`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setButtonStatus('Request');
        handleClose()
        Swal.fire({
            icon: "success",
            title: "Request send Successfully.",
            timer: "800",
        });
        // setResponse(response.data.data);
        // setData(response.data.data.records);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        // setIsLoading(false);
      });
  }
//   
  const makePayOutRequest = ()=>{
    setButtonStatus('Wait...')
    savePayout();
  }
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
            <span>No hotels found.</span>
          </TextCenter>
        );
      } else {
        return data.map((row, index) => {
          let imageSrc = row.hotelsData.image.length
            ? row.hotelsData.image[0]
            : "1675936089112-teanest1.jpg";
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
                  <HotelInfoText>Country : {row.hotelsData.country}</HotelInfoText>
                  <HotelInfoText>Theme : {row.hotelsData.theme}</HotelInfoText>
                  <HotelInfoText>Category : {row.hotelsData.hotelCategory}</HotelInfoText>
                </HotelIconWrapper>
                
              </HotelInfoWrapper>
              <PayOutInfoWrapper>
                <p><b>TotalPaid amount : </b>{row.totalEarnings} INR</p>
                <p><b>Fee amount : </b>{ (row.totalEarnings*row.hotelsData.adminFee)/100 } ({row.hotelsData.adminFee}%) INR</p>
                <p><b>Payout amount : </b>{row.totalEarnings - ((row.totalEarnings*row.hotelsData.adminFee)/100) } INR</p>
                <Button variant="contained" loading={true} onClick={()=> payoutRequestHandler(row.totalEarnings,((row.totalEarnings*row.hotelsData.adminFee)/100),(row.totalEarnings - ((row.totalEarnings*row.hotelsData.adminFee)/100)))}>Payout</Button>
              </PayOutInfoWrapper>
              
            </HotelCard>
          );
        });
      }
    }
  };
  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/vendor/getPayoutList?page=${page + 1}&limit=${rowsPerPage}`, {
        headers: { _token: authData.data.token },
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

  



  useEffect(() => {
    setIsLoading(true);
    getAllListData();
  }, [page, rowsPerPage]);


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
              <Heading>Hotel`s Payout</Heading>
            </div>
            <TextWrapper></TextWrapper>
          </Root>
          <HotelCardsWrapper>{getComponents()}</HotelCardsWrapper>
          {/* )} */}
        </TextRoot>
          <TablePagination
            component="div"
            count={mainResponse.totalrecords}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
            <Button
              variant="contained"
              color="success"
              onClick={makePayOutRequest}
            >
              {buttonStatus}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </TextMainWrapper>
    </>
  );
}

export default Payouts;