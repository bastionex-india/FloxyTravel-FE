import React from "react";
import styled from "styled-components";

import MainSection from "./MainSection";

const Root = styled.div`
  padding: 40px 20px 20px 20px;
  /* display: flex; */
  // width:90%;
`;

const Dashboard1 = () => {
  return (
    <Root>
      <MainSection />
    </Root>
  );
};

export default Dashboard1;
