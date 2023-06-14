import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import Cardbg1 from "../../Images/bg.jpg";
import { useNavigate } from "react-router-dom";
import { environmentVariables } from "../../config/config";
import { Modal, Button } from "react-bootstrap";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

const LeftCardWrapper = styled.div`
  width: calc(60% - 10px);
  /* height: 100%; */
  @media (max-width: 648px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${(p) =>
    p.bgImage &&
    `
    background-image:url(${p.bgImage});
  `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
`;
const CardText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export default function LeaveRecord() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // console.log("jjjjjjjjjjjjjj",data)
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const componentClicked = (item) => {
    navigate("/hoteldetails", { state: item });
  };

  const getVendorData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/auth/vendorget`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log('rrrrrrrrrrrr',response.data.data.hotels)
        setData(response.data.data.hotels);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  useEffect(() => {
    getVendorData();
  }, []);

  const [showModal,setShowModel] = useState(false);

  function deleteConfirmation()
  {
    setShowModel(true);
  }

  function hideModal()
  {
    setShowModel(false);
  }

  const boldTextCss = {
    fontWeight: 700
  }

  return (
    <>
    <div class="row row-cols-4 g-4" style={{width: '70rem'}}>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" >
      <div  class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">PENDING</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $80
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total pendings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">EARNINGS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $50
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total earnings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">BOOKINS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        68
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total bookings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">SERVICES</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        25
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total services</p>
      </div>
    </div>
  </div>
</div>

<TableContainer component={Paper} style={{width: '70rem'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell style={boldTextCss}>HotelName</TableCell>
                  <TableCell style={boldTextCss} align="left">City</TableCell>
                  <TableCell style={boldTextCss} align="left">State</TableCell>
                  <TableCell style={boldTextCss} align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data && data.map((item, key) => {
                    const bookingDate = new Date(item.createdAt);
                    return (
                      item.active !== true &&(
                        <TableRow
                        key={item}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                        {item.hotelname}             
                        </TableCell>
                        <TableCell align="left">{item.city}</TableCell>
                        <TableCell align="left">{item.state}</TableCell>
                        <TableCell align="left"><Button size="small" variant="contained" type="button"><DeleteIcon style={{color: '#008080'}} onClick={deleteConfirmation} /></Button></TableCell>
                        <Modal show={showModal} onHide={hideModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><div className="alert alert-danger">Are you sure you want to delete the vendor?</div></Modal.Body>
                        <Modal.Footer>
                          <Button variant="default" onClick={hideModal}>
                          {/*  */}
                            Cancel
                          </Button>
                          <Button variant="danger" >
                          {/*  */}
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      </TableRow>

                      
                      )
                      
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>


    {/* <div>
      <div>
        {data.map((item, key) => {
          console.log(".................", item, key);
          return (
            <LeftCardWrapper>
              <Card
                bgImage={`${environmentVariables.apiUrl}/uploads/${item.image[0]}`}
                onClick={() => componentClicked(item)}
              >
                <TextWrapper>
                  <TextWrapper>
                    <CardText>{item.hotelname}</CardText>
                    <CardText>
                      {item.city} , {item.state}
                    </CardText>
                  </TextWrapper>
                </TextWrapper>
              </Card>
            </LeftCardWrapper>
          );
        })}
      </div>
    </div> */}
    </>
  );
}
