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
import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
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

const HotelCardsWrapper = styled.div``;
const HotelCard = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #aec5c5;
  border-radius: 5px;
`;

const HotelImage = styled.img`
  width: 280px;
  height: 100%;
`;

const HotelBigText = styled.div`
  font-size: 18px;
  padding-bottom: 10px;
`;

const HotelInfoText = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
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
  width: 85%;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 10px;
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
  justify-content: space-between;
  margin-top: 20px;
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

const HeadingWrapper = styled.div`
  position: relative;
  // display: flex;
  display: -webkit-box;
  // justify-content: center;
  // align-items: center;
`;
const OuterDiv = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
`;
const InnerDiv = styled.div`
  margin: 0px 10px;
  padding: 6px 5px;
  background-color: white;
  text-align: center;
`;

const ManageAdmin = () => {
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
  const handleClickOpen = (item) => {
    setHotelDetails(item);
    setOpen(true);
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
            <span>No hotels found.</span>
          </TextCenter>
        );
      } else {
        return data.map((row, index) => {
          // console.log("row",row);
          let imageSrc = row.image.length
            ? row.image[0]
            : "1675936089112-teanest1.jpg";
          return (
            <HotelCard>
              <HotelImageWrapper>
                <HotelImage
                  src={`https://floxy-travels.b-cdn.net/uploads/${imageSrc}`}
                />
              </HotelImageWrapper>
              <HotelInfoWrapper>
                <HotelBigText>{row.hotelname}</HotelBigText>

                <HotelIconWrapper>
                  {" "}
                  <HotelIcon></HotelIcon>
                  <HotelInfoText>City : {row.city}</HotelInfoText>
                  <HotelInfoText>State : {row.state}</HotelInfoText>
                  <HotelInfoText>Country : {row.country}</HotelInfoText>
                  <HotelInfoText>
                    Theme :{" "}
                    <OuterDiv>
                      {row.hotelTheme.map((item, key) => (
                        <InnerDiv key={key}>{item}</InnerDiv>
                      ))}
                    </OuterDiv>
                  </HotelInfoText>
                  <HotelInfoText>Category : {row.hotelCategory}</HotelInfoText>
                </HotelIconWrapper>
              </HotelInfoWrapper>
              <HotelButtonWrapper>
                <HotelActionButtons
                  onClick={() => navigate(`/edithotels/${row._id}`)}
                >
                  Edit
                </HotelActionButtons>
                <HotelActionButtons onClick={() => handleClickOpen(row)}>
                  Delete
                </HotelActionButtons>
                {/* <HotelActionButtons>Hide</HotelActionButtons> */}
              </HotelButtonWrapper>
            </HotelCard>
          );
        });
      }
    }
  };
  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/vendor/vendorget`, {
        headers: { _token: authData.data.token },
        params: {
          page: page + 1,
          limit: rowsPerPage,
          type: "hotel",
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

  const [vendor, setVendor] = useState();

  const getVendor = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/auth/vendorget`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setVendor(response.data.data.hotels);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };

  const DeleteHotel = (item) => {
    const config = {
      method: "delete",
      url: `${environmentVariables.apiUrl}/vendor/deletehotel/${item._id}`,
      headers: {
        _token: authData.data.token,
      },
    };

    axios(config)
      .then(function (response) {
        Swal.fire("Deleted", "Hotel Deleted Successfully", "success");
        setOpen(false);
        getAllListData();
      })
      .catch(function (error) {
        Swal.fire("Error", "Something went wrong", "error");
      });
  };
  const deleteRecord = (item) => {
    DeleteHotel(item);
  };

  useEffect(() => {
    setIsLoading(true);
    getVendor();
    getAllListData();
  }, [page, rowsPerPage]);

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
          </Root>
          <HotelCardsWrapper>{getComponents()}</HotelCardsWrapper>
          {/* )} */}
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
            Delete
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Are you sure you want to delete the Hotel?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleClose}>
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
      </TextMainWrapper>
    </>
  );
};

export default ManageAdmin;
