import React from 'react';
import HolidaySection from './HolidaySection';
import styled from 'styled-components';
import InfoSection from './InfoSection';

const Root = styled.div`
padding:40px 20px 20px 20px;
display: flex;
width:100%;
`;
function LeaveBalance(props) {
    return (
        <Root>
            
            <InfoSection/>
            <HolidaySection/>
        </Root>
    );
}

export default LeaveBalance;