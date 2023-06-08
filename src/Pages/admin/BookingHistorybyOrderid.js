import React from "react";

import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { environmentVariables } from "../../config/config";
import './BookingHistorybyOrderid.css'
import { styled as newStyled } from '@mui/material/styles';
import {Box,Paper,Grid,Container} from '@mui/material';






const Item = newStyled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1)
}));

const Root = styled.div`
  // background-color: #e9e9e9;
  padding-bottom: 30px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px 0px;
  width: 967px;
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const Heading = styled.div`
  font-size: 1.75rem;
  margin-right: 360px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const BookingHistorybyOrderid = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);
  const [data, setData] = useState("");

  

  const getAllUsers = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/admin/getallbookingbyorderid/${state._id}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        console.log("response.data", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <TextMainWrapper>
        <TextRoot>
          <Root>
            <TextWrapper>
              <Heading> Booking Detail</Heading>
            </TextWrapper>
          </Root>
        </TextRoot>
      </TextMainWrapper>
      <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Item>
          <h4>Hotel Location</h4>
          <p>BastionEx, Block B, Sector 4, Noida, Uttar Pradesh</p>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>
          <h4>Customer Details</h4>
          <ul class="list-group list-group-unbordered">
          <li class="list-group-item">
          <b>Followers</b> <Box 
          // display="flex"
  // justifyContent="flex-end"
  // alignItems="flex-end"
  >1,322</Box>
          </li>
          <li class="list-group-item">
          <b>Following</b> <Box class="pull-right">1,322</Box>
          </li>
          <li class="list-group-item">
          <b>Friends</b> <Box class="pull-right">1,322</Box>
          </li>
          </ul>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>
          <h4>Booking Details</h4>
          </Item>
        </Grid>
      </Grid>
      </Container>
      
    </>
  );
};

export default BookingHistorybyOrderid;
