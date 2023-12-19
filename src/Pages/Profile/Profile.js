import React, { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Root = styled.div`
  padding: 20px 20px 0 20px;
`;
const Container = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-wrap:wrap;
`;
const DataWrapper = styled.div`
width:calc(50% - 20px);
margin-bottom:20px;
`;
const Label = styled.div`
  color: #858585;
  font-weight: bold;
`;
const Data = styled.div`
  color: #858585;
`;
const NavigationSecvtion = styled.div`
  color: #858585;
  margin-bottom: 20px;
  align-self: flex-start;
`;
export default function Profile() {
  const { authData } = useContext(AuthContext);
  const navigate=useNavigate();
  return (
    <Root>
      <NavigationSecvtion>
        <b
          style={{ marginRight: "5px", cursor: "pointer", color: "#01575c" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Dashboard /
        </b>
        <span style={{cursor:'pointer'}} onClick={() => {navigate('/profile')}}>Profile</span>
        
      </NavigationSecvtion>
      <Container>
      <DataWrapper>
          <Label>Id</Label>
          <Data>{authData?.data?.vendorId}</Data>
        </DataWrapper>
        <DataWrapper>
          <Label>Name</Label>
          <Data>{authData?.data?.name}</Data>
        </DataWrapper>
       
        <DataWrapper>
          <Label>Email Id</Label>
          <Data>{authData?.data?.email}</Data>
        </DataWrapper>
        <DataWrapper>
          <Label>Contact Number</Label>
          <Data>{authData?.data?.mobile}</Data>
        </DataWrapper>
      </Container>
    </Root>
  );
}
