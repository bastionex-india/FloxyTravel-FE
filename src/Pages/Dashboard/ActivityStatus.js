import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";

const Root = styled.div``;
const P = styled.div`
  color: #01575c;
  font-size: 26px;
  font-weight: bold;
`;
const Div = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom:20px;
`;
export default function ActivityStatus() {
  const { authData, setAuthData } = useContext(AuthContext);

  return (
    <Root>
      <P>Welcome {authData?.data?.name}!</P>
      <Div>
        Have a nice {new Date().toLocaleString("en-us", { weekday: "long" })}!
      </Div>
    </Root>
  );
}
