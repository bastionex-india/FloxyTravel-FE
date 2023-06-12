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
import { Button,ButtonGroup,Modal } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import moment from "moment";
import CreateAdminVendor from "../CreateAdminVendor/CreateAdminVendor";
const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px 0px;
  width: 967px;
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
  margin-right: 360px;
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
  justify-content: space-between;
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
  const [select, setSelect] = useState("");
  const [select1, setSelect1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [addVendorPopUp, setAddVendorPopUp] = useState(false);
  const [data, setData] = useState("");
  const navigate = useNavigate();


  const [showModal,setShowModel] = useState(false);

  function deleteConfirmation()
  {
    setShowModel(true);
  }

  function hideModal()
  {
    setShowModel(false);
  }

  const handleClick = (item) => {
    navigate(`/managehotels/${item}`);
  };

  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/auth/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log("vendorlist", response.data);
        setData(response.data.message);
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
  }, []);

  const ApprovedData = () => {};
  const PendingData = () => {};
  const boldTextCss = {
    fontWeight: 700,
  };
  return (
    <>
      <TextMainWrapper>
        {/* <Check open={addVendorPopUp} setOpen={setAddVendorPopUp}></Check> */}
        {addVendorPopUp && (
          <CreateAdminVendor
            open={addVendorPopUp}
            setOpen={setAddVendorPopUp}
          ></CreateAdminVendor>
        )}
        <TextRoot>
          <Root>
            <TextWrapper>
            <Button variant="outlined" onClick={() => navigate(-1)} type="button"> <i className="fa-solid fa fa-arrow-circle-left"
                ></i> Back</Button>
              <Heading> Manage Admin/Vendor</Heading>
              <AddButton onClick={() => setAddVendorPopUp(true)}>
                Add Vendor/Admin
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
                         
                            
                            <ButtonGroup size="small" type="button" variant="outlined" aria-label="outlined button group">
                              <Button>View</Button>
                              <Button>Edit</Button>
                              <Button>Delete</Button>
                            </ButtonGroup>
                            {/* <Button
                              size="small"
                              variant="contained"
                              type="button"
                              onClick={(e) => handleClick(item?._id)}
                            >
                              View
                            </Button> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TextRoot>
        
      </TextMainWrapper>
    </>
  );
};

export default ManageAdmin;
