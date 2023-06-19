import React from "react";
import LeaveRecord from "../../Dashboard/LeaveRecord";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
const Root = styled.div`
  margin: 20px;
`;
const VendorDetails = () => {
  const [vendorId, setVendorId] = useState(null);
  useEffect(() => {
    if (window !== undefined) {
      const id = window.location.href.split("/").pop();
      setVendorId(id);
      console.log(id);
    }
  }, []);
  return (
    <Root>
      <LeaveRecord vendorId={vendorId} />
    </Root>
  );
};

export default VendorDetails;
