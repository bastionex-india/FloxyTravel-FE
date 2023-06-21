import React from "react";
import LeaveRecord from "../../Dashboard/LeaveRecord";
import { useEffect,useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../ContextApi/ContextApi";
import axios from "axios";
import { environmentVariables } from "../../../config/config";
const Root = styled.div`
  margin: 20px;
`;
const P = styled.div`
  color: #012e31;
  font-size: 26px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const VendorDetails = () => {
  const [vendorId, setVendorId] = useState(null);
  const [vendorData,setVendorData]  = useState(null)
  const { authData } = useContext(AuthContext);

  const getVendorData = async () => {
    const vendorid = window.location.href.split("/").pop();
    
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getvendorById/${vendorid}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log("response vendor data ",response)
        setVendorData(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (window !== undefined) {
      const id = window.location.href.split("/").pop();
      setVendorId(id);
    }
    getVendorData()
  }, []);
  
  return (
    <Root>
      <P>{vendorData ? vendorData.name : null}</P>
      <LeaveRecord vendorId={vendorId} />
    </Root>
  );
};

export default VendorDetails;
