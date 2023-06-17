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
import Table from "@mui/material/Table";
import { Button, ButtonGroup, Modal } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";

import moment from "moment";
import CreateAdminVendor from "../CreateAdminVendor/CreateAdminVendor";

import PropTypes from "prop-types";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import EditVendor from "./../CreateAdminVendor/EditVendor";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px;
  /* width: 967px; */
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const HeadingWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: flex-end;
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
  font-weight: 700;
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
const ManageAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [addVendorPopUp, setAddVendorPopUp] = useState(false);
  const [editVendorPopUp, setEditVendorPopUp] = useState(false);
  const [data, setData] = useState("");
  const [response, setResponse] = useState();
  const [vendorDetails, setVendorDetails] = useState();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (item) => {
    setVendorDetails(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //  pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // //  pagination  End

  const handleClick = (item) => {
    navigate(`/managehotels/${item}`);
  };

  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getvendorlist?page=${page}&limit=${rowsPerPage}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setData(response.data.data.records);
        setResponse(response?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const deleteVendor = async (vendorId) => {
    await axios
      .delete(
        `${environmentVariables.apiUrl}/admin/deletevendor/${vendorId._id}`,
        {
          headers: { _token: authData.data.token },
        }
      )
      .then((response) => {
        setIsLoading(true);
        getAllListData();
        setOpen(false)
        Swal.fire(
          "Deleted",
          "Vendor Deleted Successfully",
          "success"
        );
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getAllListData();
  }, [addVendorPopUp, editVendorPopUp]);
  const deleteRecord = (item) => {
    deleteVendor(item);
  };
  const ApprovedData = () => {};
  const PendingData = () => {};
  const boldTextCss = {
    fontWeight: 700,
  };

  return (
    <>
      <TextMainWrapper>
        {addVendorPopUp && (
          <CreateAdminVendor
            open={addVendorPopUp}
            setOpen={setAddVendorPopUp}
          ></CreateAdminVendor>
        )}

        {editVendorPopUp && (
          <EditVendor
            open={editVendorPopUp}
            setOpen={setEditVendorPopUp}
            vendorDetails={vendorDetails}
          ></EditVendor>
        )}
        <TextRoot>
          <Root>
            <HeadingWrapper>
              {" "}
              <i
                style={{ position: "absolute", left: "0" }}
                onClick={() => navigate(-1)}
                class="fa-solid fa-chevron-left fa-2x"
              ></i>
              <Heading> Manage Vendors</Heading>
            </HeadingWrapper>
            <TextWrapper>
              <AddButton onClick={() => setAddVendorPopUp(true)}>
                Add Vendor
              </AddButton>
            </TextWrapper>
          </Root>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextCss}>Name</TableCell>
                    <TableCell style={boldTextCss} align="left">
                      Email
                    </TableCell>
                    <TableCell style={boldTextCss} align="left">
                      Contact Number
                    </TableCell>
                    {/* <TableCell style={boldTextCss} align="right">
                    Creation date
                  </TableCell> */}
                    {/* <TableCell style={boldTextCss} align="right">
                    Status
                  </TableCell> */}
                    <TableCell style={boldTextCss} align="right">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data &&
                    data.map((item, index) => {
                      const bookingDate = new Date(item.createdAt);
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item?.name}
                          </TableCell>
                          <TableCell align="left">{item?.email}</TableCell>
                          {/* <TableCell align="right">{item.checkIn}</TableCell> */}
                          <TableCell align="left">{item?.mobile}</TableCell>
                          {/* <TableCell align="right">{item.status}</TableCell> */}
                          <TableCell align="right">
                            <ButtonGroup
                              size="small"
                              type="button"
                              variant="outlined"
                              aria-label="outlined button group"
                            >
                              {/* <Button>View</Button> */}
                              <Button
                                onClick={() => {
                                  setEditVendorPopUp(true);
                                  setVendorDetails(item);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => {
                                  handleClickOpen(item);
                                }}
                              >
                                Delete
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={response?.totalrecords}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </TextRoot>
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
              Are you sure you want to delete the vendor?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteRecord(vendorDetails)}
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
