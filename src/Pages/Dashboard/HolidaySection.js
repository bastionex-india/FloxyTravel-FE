import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import moment from 'moment';
import './css/style.css'

const Root = styled.div`
  background-color: #fff;
  width: 30%;
  min-width: 300px;
  height: calc(100vh - 157px);
  max-height: calc(100vh - 157px);
  border-radius: 5px;
  position: sticky;
  top: 137px;
  overflow-y: scroll;
  z-index: 1;
`;
const Heading = styled.div`
  font-size: 22px;
  padding: 20px;
  font-weight: bold;
`;
const InfoWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid #dadada;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(p) => p.selectqwer && `
     background-color:#01575c;
     border-left:5px solid #0b8f97 ;
     color:#fff;
      
  `};

`;
const TextWrapper = styled.div``;
const Data = styled.div`
  font-weight: bold;
`;
const DayWrapper = styled.div`
  font-weight: bold;
`;
// const LeaveData = ({ date, day, name, arr1}) => {
//   const [letestDate,setLetestDate] = useState(0);
//   const [upcomingDate,setUpcomingDate] = useState(0);
//   const [upcomingMonth,setUpcomingMonth] = useState(0);
//   const [upcomingYear,setUpcomingYear] = useState(0);

//   useEffect(() => {
   
//     setLetestDate(Date.now())
//     setUpcomingDate(Number(moment(date).format('DD')))
//     setUpcomingMonth(Number(moment(date).format('MM')))
//     setUpcomingYear(Number(moment(date).format('YYYY')))
//     console.log("mbmb",arr1)
  
  
//   }, [])
  
//   // console.log(new Date(letestDate).getDate()>upcomingDate && new Date(letestDate).getMonth()+1 >upcomingMonth && new Date(letestDate).getFullYear() < upcomingYear ?false : new Date(letestDate).getFullYear() === upcomingYear?1:0)

  
//   return (
//     <InfoWrapper 
//     id={arr1?'active':'inactive'}
//     // id={new Date(letestDate).getDate()>upcomingDate && new Date(letestDate).getMonth()+1 > upcomingMonth &&  new Date(letestDate).getFullYear() < upcomingYear ?'active':'inactive'}
//     // id={new Date(letestDate).getDate()>upcomingDate && new Date(letestDate).getMonth()+1 >upcomingMonth && new Date(letestDate).getFullYear() < Number(moment(date).format('YYYY')) ?false : new Date(letestDate).getFullYear() === Number(moment(date).format('YYYY'))?'active':'inactive'}
    // id={(new Date(letestDate).getDate() <= Number(moment(date).format('DD')) && new Date(letestDate).getMonth()+1 <= Number(moment(date).format('MM')) && new Date(letestDate).getFullYear() < Number(moment(date).format('YYYY')) ?false : new Date(letestDate).getFullYear() === Number(moment(date).format('YYYY')))  ? 'active' : 'inactive'}
    // id={((new Date(letestDate).getDate() <= Number(moment(date).format('DD')) || new Date(letestDate).getDate() > Number(moment(date).format('DD'))) && (new Date(letestDate).getMonth()+1 <= Number(moment(date).format('MM'))|| new Date(letestDate).getMonth()+1 > Number(moment(date).format('MM')))  && new Date(letestDate).getFullYear() < Number(moment(date).format('YYYY')) ?false : new Date(letestDate).getFullYear() === Number(moment(date).format('YYYY')))? 'active' : 'inactive'}
//     // id={letestDate<=upcomingDate?'active':'inactive'}
//     >
//       <TextWrapper style={{color:''? 'active':'inactive'}}>
//         <Data>
//           {moment(date).format('DD/MM/YYYY')}
//         </Data>
//         <DayWrapper style={{fontWeight: 500}}>{new Date(date).getDay()===0?"Sunday":new Date(date).getDay()===1?"Monday":new Date(date).getDay()===2?"Tuesday":new Date(date).getDay()===3?"Wednesday":new Date(date).getDay()===4?"Thrusday":new Date(date).getDay()===5?"Friday":"Saturday"}</DayWrapper>
//       </TextWrapper>
//       <TextWrapper>
//         {}
//         <Data>{name}</Data>
//       </TextWrapper>
//     </InfoWrapper>
//   );
// };
function HolidaySection() {
  const [leaveData, setLeaveData] = useState();
  const [currentDate, setCurrentDate] = useState();
  
  const [arr1, setArr1] = useState();
  useEffect(() => {
    setCurrentDate(Date.now())
    const url = "/getholidays";
    axios
      .get(url)
      .then((response) => {
        // console.log("dd",response.data.message)
        setLeaveData(response.data.message);

      })
      .catch((error) => console.log(error));
  }, []);
 
//  useEffect(() => {
//   //  console.log(currentDate,leaveData)
//    if(leaveData){
//     for(let i of leaveData){
//       // console.log(i.holidayDate,new Date(i.holidayDate).getTime(),currentDate,new Date(i.holidayDate).getTime()-currentDate)
//       let timeDiff=new Date(i.holidayDate).getTime()-currentDate
//       console.log("hghg",timeDiff)
//       setArr1(timeDiff)
//       break;
//       // if(currentDate<new Date(i.holidayDate).getTime()){
//       //   setArr1(new Date(i.holidayDate))
//       //   console.log(111)
//       //   break;
//       // }
      
      
//      }
//    }
   
//  }, [leaveData])
//  console.log("gfgf",arr1,typeof(arr1))
  return (
    <Root>
      <Heading>Upcoming Holidays</Heading>
      {/* {leaveData?.map((data, index) => {
        
        return (         
          <InfoWrapper key={index} 
          // id={(new Date(Date.now()).getDate() <= Number(moment(data.holidayDate).format('DD')) && new Date(Date.now()).getMonth()+1 <= Number(moment(data.holidayDate).format('MM')) && new Date(Date.now()).getFullYear() < Number(moment(data.holidayDate).format('YYYY')) ?false : new Date(Date.now()).getFullYear() === Number(moment(data.holidayDate).format('YYYY')))  ? 'active' : 'inactive'}
          id={new Date(Date.now()).getDate()<=Number(moment(data.holidayDate).format('DD')) && new Date(Date.now()).getMonth()+1 <=Number(moment(data.holidayDate).format('MM'))?'active':'inactive'}
          // id={new Date(Date.now()).getDate()>Number(moment(data.holidayDate).format('DD')) && new Date(Date.now()).getMonth()+1 > Number(moment(data.holidayDate).format('MM')) &&  new Date(Date.now()).getFullYear() < Number(moment(data.holidayDate).format('YYYY')) ?'active':'inactive'}
          >
            <TextWrapper style={{color:''? 'active':'inactive'}}>
              <Data>
                {moment(data.holidayDate).format('DD/MM/YYYY')}
              </Data>
              <DayWrapper style={{fontWeight: 500}}>{new Date(data.holidayDate).getDay()===0?"Sunday":new Date(data.holidayDate).getDay()===1?"Monday":new Date(data.holidayDate).getDay()===2?"Tuesday":new Date(data.holidayDate).getDay()===3?"Wednesday":new Date(data.holidayDate).getDay()===4?"Thrusday":new Date(data.holidayDate).getDay()===5?"Friday":"Saturday"}</DayWrapper>
            </TextWrapper>
            <TextWrapper>
              <Data>{data.holidayName}</Data>
            </TextWrapper>
          </InfoWrapper>
          
        );
        
      })} */}
    </Root>
  );
}

export default HolidaySection;
