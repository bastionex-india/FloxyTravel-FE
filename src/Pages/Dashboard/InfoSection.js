import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import ActivityStatus from "./ActivityStatus";
import LeaveRecord from "./LeaveRecord";

const Root = styled.div`
// width: 70%;
  width: 100%;
  // padding-right: 30px;
  padding-right: 0px;
`;
const Heading = styled.div`
  color: #012e31;
  font-size: 26px;
  font-weight: bold;
  
  // @media(max-width: 1440px){
  //   font-size:5px;
  // }
`;
const Card = styled.div`
  width: calc(33.33% - 20px);
  box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.17);
  background-color: #fff;
  border-radius: 5px;
`;
const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const HeadText = styled.div`
  ${(p) =>
    p.bgColor &&
    `
 background-color:${p.bgColor};
 color:#fff;
 text-align:center;
`};
  border-radius: 5px 5px 0px 0px;
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
`;
const Data = styled.div`
  color: #3d3d3d;
  font-size: 32px;
  margin-bottom: 9px;
`;

const DataWrapper = styled.div`
  padding: 20px 20px;
  font-size:12px;
  text-align: center;
`;
const Text = styled.div`
  color: #888888;
  margin-bottom:0px;
`;
const LeaveCard = ({ headText, color, data, data1, value }) => {
  return (
    <Card>
      <HeadText bgColor={color}>{headText}</HeadText>
      <DataWrapper>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Data style={{fontWeight:'500'}}>{data}</Data><Text style={{fontSize:'20px'}}>{data1}</Text>
        </div>
        <Text>{value}</Text>
      </DataWrapper>
    </Card>
  );
};

function InfoSection(props) {
  return (
    <Root>
      <ActivityStatus/>
      <LeaveRecord />
    </Root>
  );
}

export default InfoSection;
