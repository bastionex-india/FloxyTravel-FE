import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import ActivityStatus from "../Dashboard/ActivityStatus";
import VendorList from "./VendorList";


const Root = styled.div`
  width: 70%;
  padding-right: 30px;
`;

const MainSection = () => {
  return (
    <Root>
      <ActivityStatus/>      
      < VendorList/>
    </Root>
  )
}

export default MainSection