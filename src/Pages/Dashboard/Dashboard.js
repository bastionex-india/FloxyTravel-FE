import React from 'react'
import styled from 'styled-components';
import HolidaySection from './HolidaySection';
import InfoSection from './InfoSection';

const Root = styled.div`
padding:40px 20px 20px 20px;
display: flex;
width:100%;
`;
export default function Dashboard() {
  return (
    <Root>

      <InfoSection/>
      {/* <HolidaySection/> */}
    </Root>
  )
}
