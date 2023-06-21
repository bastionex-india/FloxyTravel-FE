import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { environmentVariables } from "../config/config";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/ContextApi";
import { Button } from "@mui/material";
import CircularLoader from "../Component/CircularLoader/CircularLoader";
const HotelCardsWrapper = styled.div``;
const HotelCard = styled.div`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #aec5c5;
  border-radius: 5px;
`;

const HotelImage = styled.img`
  width: 280px;
`;

const HotelBigText = styled.div`
  font-size: 18px;
  padding-bottom: 10px;
`;

const HotelInfoText = styled.div`
  font-size: 14px;
`;
const HotelIcon = styled.i``;
const HotelIconWrapper = styled.div``;
const HotelActionButtons = styled.div`
  background-color: #17a2b8;
  color: #fff;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const HotelInfoWrapper = styled.div`
  width: 50%;
  margin: 10px 30px;
`;
const HotelButtonWrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const HotelImageWrapper = styled.div``;

const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px;
  /* width: 967px; */
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const TextCenter = styled.div`
  color: red;
  text-align: center;
`;

const Root = styled.div`
  // margin: 0px 60px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin: 0px 20px;
  }
`;

const Heading = styled.div`
  font-size: 1.75rem;
  @media (max-width: 768px) {
    display: none;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Payouts = ()=>{

    const [select, setSelect] = useState("");
    const [select1, setSelect1] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { authData, setAuthData } = useContext(AuthContext);
    const [addVendorPopUp, setAddVendorPopUp] = useState(false);
    const [data, setData] = useState(null);
    const [vendorlist, setVendorList] = useState(null);
    const navigate = useNavigate();

    const handleClick = (item) => {
        console.log("hcjhcjhf", item);
        navigate("/bookinghistorybyorderid", { state: item });
    };
    const getComponents = () => {
        if (isLoading === true) {
            return (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "30px",
                    }}
                >
                    <CircularLoader></CircularLoader>
                </div>
            );
        } else if (data) {
            if (data && data.length === 0) {
                return (
                    <TextCenter>
                        <span>No hotels found.</span>
                    </TextCenter>
                );
            } else {
                return data.map((row, index) => {
                    let imageSrc = row.image.length
                        ? row.image[0]
                        : "1675936089112-teanest1.jpg";
                    return (
                        <HotelCard>
                            <HotelImageWrapper>
                                <HotelImage
                                    src={`https://uat-travel-api.floxypay.com/uploads/${imageSrc}`}
                                />
                            </HotelImageWrapper>
                            <HotelInfoWrapper>
                                <HotelBigText>{row.hotelname}</HotelBigText>

                                <HotelIconWrapper>
                                    {" "}
                                    {row._id}
                                    <HotelIcon></HotelIcon>
                                    <HotelInfoText>City : {row.city}</HotelInfoText>
                                    <HotelInfoText>State : {row.state}</HotelInfoText>
                                    <HotelInfoText>Country : {row.country}</HotelInfoText>
                                    <HotelInfoText>Theme : {row.theme}</HotelInfoText>
                                    <HotelInfoText>Category : {row.hotelCategory}</HotelInfoText>
                                </HotelIconWrapper>
                            </HotelInfoWrapper>
                            {/* <HotelButtonWrapper>
                                <HotelActionButtons>Edit</HotelActionButtons>
                                <HotelActionButtons>Delete</HotelActionButtons>
                                <HotelActionButtons>Hide</HotelActionButtons>
                            </HotelButtonWrapper> */}
                        </HotelCard>
                    );
                });
            }
        }
    };
    const getAllListData = async () => {
        await axios
            .get(`${environmentVariables.apiUrl}/vendor/vendorget`, {
                headers: { _token: authData.data.token },
            })
            .then((response) => {
                console.log(response.data.data.records);
                setData(response.data.data.records);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("error", err);
                setIsLoading(false);
            });
    };

    const [vendor, setVendor] = useState();

    const getVendor = async () => {
        await axios
            .get(`https://travel-api.floxypay.com/auth/vendorget`, {
                headers: { _token: authData.data.token },
            })
            .then((response) => {
                setVendor(response.data.data.hotels);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("error", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        // getVendorList();
        getVendor();
        const lclstorage = JSON.parse(localStorage.getItem("authdata"));
        getAllListData();
    }, []);

    const boldTextCss = {
        fontWeight: 700,
    };

    return (
        <>
            <TextMainWrapper>
                <TextRoot>
                    <Root>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {" "}
                            <i
                                style={{ cursor: "pointer", marginRight: "50px" }}
                                onClick={() => navigate(-1)}
                                class="fa-solid fa-chevron-left fa-2x"
                            ></i>
                            <Heading> Hotel`s Payout</Heading>
                        </div>
                        <TextWrapper></TextWrapper>
                    </Root>
                    <HotelCardsWrapper>{getComponents()}</HotelCardsWrapper>
                    {/* )} */}
                </TextRoot>
            </TextMainWrapper>
        </>
    );
}

export default Payouts;