import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext, useAuth } from "../../ContextApi/ContextApi";
import axios from "axios";
import { environmentVariables } from "../../config/config";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InsideRoot = styled.div``;
const P = styled.div`
  color: #01575c;
  font-size: 26px;
  font-weight: bold;
`;
const Div = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const Amount = styled.div`
  color: #01575c;
  font-size: 26px;
  font-weight: bold;
  // margin-left: 5px;

`;
const Div1 = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px 10px 10px;
`;
const HeadingDiv = styled.div`
font-weight: bolder;
font-size: 15px;
margin: 10px 10px 0px 10px;

`;
const CodeDiv = styled.div`
    font-weight: bolder;
    font-size: 20px;
`;
const MainDiv = styled.div`
   margin-right:20px;
`;
export default function ActivityStatus() {
  const { authData } = useAuth();
  const [ resData, setResData] = useState();
  const getWalletBalance = ()=>{

    let config = {
      method: 'get',
      url: `${environmentVariables.apiUrl}/admin/getwalletbalance`,
      headers: { _token: authData.token },
    };

    axios.request(config)
    .then((response) => {
      setResData(response?.data?.data)
    })
    .catch((error) => {
      setResData()
    });

  }
  useEffect(()=>{
    getWalletBalance()
  },[])

  return (
    <Root>
      <InsideRoot>
        <P>Welcome {authData?.username}!</P>
        <Div>
          Have a nice {new Date().toLocaleString("en-us", { weekday: "long" })}!
        </Div>
      </InsideRoot>
      <InsideRoot>
        <MainDiv>
          <HeadingDiv>Wallet Balance</HeadingDiv>
          <Div1>
            <Amount>{resData?.currencyCode}</Amount>
            <Amount style={{paddingLeft:"5px"}}>{resData?.balance}</Amount>
          </Div1>
        </MainDiv>
      </InsideRoot>

     
    </Root>
  );
}
