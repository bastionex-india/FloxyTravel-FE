import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/ContextApi";
import { environmentVariables } from "../config/config";
// import { Carousel } from 'react-carousel-minimal';
import styled from "styled-components";
// import Hotel1 from '../../../images/hotelimg1.jpg';
// import Deals from '../Deals/Deals';
// import SimilarHotels from './SimilarHotels';

const Root = styled.div`
  background-color: #e9e9e9;
  padding-bottom: 30px;
`;
const Container = styled.div`
  width: 1370px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const RightsideWrapper = styled.div`
  /* padding: 0 10px; */
  width: 40%;
  margin: 15px 0;
`;
const LeftsideSection = styled.div`
  background-color: #fff;
  margin-top: 15px;
  width: 60%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  padding: 20px 20px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const Text = styled.text`
  font-size: 27px;
  font-weight: 300;
  line-height: 33px;
  margin: 15px 0;
  ${(p) =>
    p.heading &&
    `
font-size:18px;
font-weight: 400;
align-item:center;
margin: 0px;
padding: 10px 15px;
text-align: center;

`}
`;
const ParagraphWrapper = styled.div`
  padding: 15px 0;
`;
const Paragraph = styled.p`
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  padding: 16px 0 0px 0px;
`;

const SidewrapperContainer = styled.div`
  display: flex;
`;

const SimilarHotelWrapper = styled.div``;
const Circle = styled.div`
  width: 11px;
  height: 11px;
  color: #000;
  background-color: #000;
  border-radius: 5px;
`;
const PointWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Locationwrapper = styled.text`
  color: #0497e1;
  font-size: 21px;
  align-items: center;
  ${(p) =>
    p.details &&
    `
color: gray;
`}

  ${(p) =>
    p.LocationDetail &&
    `
  font-size: 16px;
  color: gray;
  margin: 20px 0 ;
`}
`;
const Horizontalwrapper = styled.div``;
const ImageWrapper = styled.div`
  padding: 15px 0;
`;
const PriceText = styled.text``;
const Image = styled.img`
  height: 200px;
`;
const LocationiconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const IconWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const PhotoWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin: 25px 0 15px 0;
  padding: 0 10px;
  :hover {
    color: white;
  }
`;
const Icon = styled.div`
  position: absolute;
  :hover {
    color: "white";
  }
`;

const Headingwrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  align-items: center;
`;

const FacilitiesNameWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10p x;
`;

const CustomerName = styled.text`
  ${(p) =>
    p.Name &&
    `
display: flex;

`}
`;
const DetailWrapper = styled.div`
  // margin-left:20px;
  width: 27%;
  display: flex;
  justify-content: flex-start;
  margin-left: 3rem;
`;
const CustomerWrapper = styled.div`
  width: 100%;
`;
const Facilitiesname = styled.text`
  margin: 0px 30px 0px 15px;
`;
const Button = styled.button`
  // background-color: gray;
  color: #000;
  font-size: 18px;
  padding: 10px 50px;
  border: #0098d4;
  border-radius: 5px;
  cursor: pointer;
  ${(p) =>
    p.checkOut &&
    `
 margin-left:20px;
 `}
`;

const PriceWrapper = styled.div`
  display: flex;
`;
const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ImageCarousel = styled.div`
  /* display: flex;
flex-direction: column; */
`;
const LastHeadingwrapper = styled.div`
  margin-top: 15px;
`;
const Caption = styled.text``;

const BookingHotelById = () => {
  const { state } = useLocation();
  const { authData } = useContext(AuthContext);
  // console.log("fdsfsdf",state)

  const [data, setData] = useState("");
  const [arr, setArr] = useState([]);
  const [checkInToggle, setCheckInToggle] = useState(true);
  const [checkOutToggle, setCheckOutToggle] = useState(false);
  const [btnState, setBtnState] = useState(false);
  const location = useLocation();

  console.log("------------------",state)
  const getAllUsers = async () => {
    await axios
      .get(
        `http://localhost:4000/vendor/getallbookingbyorderid/${authData.data.vendorId}/${state.orderid}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        console.log("response.data", response.data.data[0]);
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  
  useEffect(() => {
    getAllUsers();
  }, [data.checkInStatus, data.checkOutStatus]);
  // console.log("iyyyyyyyyyyy",data)
  const checkIn = () => {
    // setCheckInToggle(true)
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/checkinpermissionbyvendor/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data, "00000000000001111111111");
        getAllUsers();
      })
      .catch((error) => {
        console.log("///////////////", error);
      });
  };
  const checkOut = () => {
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/checkoutpermissionbyvendor/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data, "00000000000001111111111");
        getAllUsers();
      })
      .catch((error) => {
        console.log("///////////////", error);
      });
  };

  return (
    <Root>
      <Container>
        <SidewrapperContainer>
          <LeftsideSection>
            {/* <ButtonWrapper>
            <PhotoWrapper>
            <Icon style={{left: "23%"}}><i class="fa-regular fa-image"></i></Icon>
            <a href='#GalleryDetails' style={{textDecoration:"none"}}> <ScrollWrapper><Button>Photo</Button></ScrollWrapper></a>
            </PhotoWrapper>

            <PhotoWrapper>
            <Icon style={{left: "21%"}}><i class="fa-solid fa-dungeon"></i></Icon>
            <a href='#ActivitiesDetails' style={{textDecoration:"none"}}><ScrollWrapper><Button>Facilities</Button></ScrollWrapper></a>
            </PhotoWrapper>

            <PhotoWrapper>
            <Icon style={{left: "18%"}}><i class="fa-solid fa-location-dot"></i></Icon>
            <a href="#LocationDetails" style={{textDecoration:"none"}} > <ScrollWrapper><Button>Location Details</Button></ScrollWrapper></a>
            </PhotoWrapper>
        </ButtonWrapper> */}

            <LocationiconWrapper>
              <IconWrapper>
                <i class="fa-solid fa-calendar-week"></i>
              </IconWrapper>
              <Locationwrapper details>Hotel Details</Locationwrapper>
            </LocationiconWrapper>

            <Horizontalwrapper>
              <hr />
            </Horizontalwrapper>

            <PriceWrapper>
              <TextWrapper>
                <Text>{data.hotelname}</Text>
                <LocationiconWrapper>
                  <IconWrapper>
                    <i class="fa-solid fa-location-dot"></i>
                  </IconWrapper>
                  <Locationwrapper>
                    {data.area} , {data.state}
                  </Locationwrapper>
                </LocationiconWrapper>
              </TextWrapper>
              <PriceText>
                <span style={{ fontSize: "30px" }}>&#8377;</span>
                <span
                  style={{
                    fontSize: "larger",
                    fontWeight: "600",
                    fontSize: "30px",
                  }}
                >
                  {data.price}
                </span>
              </PriceText>
            </PriceWrapper>
            <ImageWrapper id="GalleryDetails">
              {/* <Image src={`${environmentVariables.apiUrl}/uploads/${data.image[0]}`} />             */}
            </ImageWrapper>

            <LocationiconWrapper>
              <IconWrapper>
                <i class="fa-solid fa-calendar-week"></i>
              </IconWrapper>
              <Locationwrapper details>Customer Details</Locationwrapper>
            </LocationiconWrapper>
            <Horizontalwrapper>
              <hr />
            </Horizontalwrapper>
            <LastHeadingwrapper>
              <CustomerWrapper>
                <FacilitiesNameWrapper>
                  <CustomerName> Name </CustomerName>
                  <DetailWrapper>
                    <CustomerName Name>
                      {" "}
                      {data.customer && data.customer.name}{" "}
                    </CustomerName>
                  </DetailWrapper>
                </FacilitiesNameWrapper>
                <FacilitiesNameWrapper>
                  <CustomerName> Email </CustomerName>
                  <DetailWrapper>
                    {" "}
                    <CustomerName Name>
                      {" "}
                      {data.customer && data.customer.email}
                    </CustomerName>
                  </DetailWrapper>
                </FacilitiesNameWrapper>
                <FacilitiesNameWrapper>
                  <CustomerName> Contact </CustomerName>
                  <DetailWrapper>
                    {" "}
                    <CustomerName Name>
                      {" "}
                      {data.customer && data.customer.mobile}{" "}
                    </CustomerName>
                  </DetailWrapper>
                </FacilitiesNameWrapper>
              </CustomerWrapper>

              <hr />
              <LocationiconWrapper>
                <IconWrapper>
                  <i class="fa-solid fa-calendar-week"></i>
                </IconWrapper>
                <Locationwrapper details>Booking Details</Locationwrapper>
              </LocationiconWrapper>

              <FacilitiesNameWrapper>
                <CustomerName> Adult </CustomerName>
                <DetailWrapper>
                  <CustomerName Name> {data.adult} </CustomerName>
                </DetailWrapper>
              </FacilitiesNameWrapper>
              <FacilitiesNameWrapper>
                <CustomerName> Children </CustomerName>
                <DetailWrapper>
                  <CustomerName Name> {data.children}</CustomerName>
                </DetailWrapper>
              </FacilitiesNameWrapper>
              <FacilitiesNameWrapper>
                <CustomerName> Rooms </CustomerName>
                <DetailWrapper>
                  {" "}
                  <CustomerName Name> {data.noOfRooms} </CustomerName>
                </DetailWrapper>
              </FacilitiesNameWrapper>
              <FacilitiesNameWrapper>
                <CustomerName> CheckIn Time </CustomerName>
                <DetailWrapper>
                  {" "}
                  <CustomerName Name> {data.checkIn} </CustomerName>
                </DetailWrapper>
              </FacilitiesNameWrapper>
              <FacilitiesNameWrapper>
                <CustomerName> CheckOut Time </CustomerName>
                <DetailWrapper>
                  {" "}
                  <CustomerName Name> {data.checkOut} </CustomerName>
                </DetailWrapper>
              </FacilitiesNameWrapper>

              <hr />

              <ButtonWrapper>
                {data.checkInStatus === true ? (
                  <Button disabled checkOut>
                    CheckIn
                  </Button>
                ) : (
                  <Button
                    checkOut
                    onClick={() => checkIn()}
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    CheckIn
                  </Button>
                )}
                {data.checkInStatus === true &&
                data.checkOutStatus === false ? (
                  <Button
                    checkOut
                    onClick={() => checkOut()}
                    style={{ backgroundColor: "grey", color: "white" }}
                  >
                    CheckOut
                  </Button>
                ) : (
                  <Button disabled checkOut onClick={() => checkOut()}>
                    CheckOut
                  </Button>
                )}
              </ButtonWrapper>
            </LastHeadingwrapper>
          </LeftsideSection>
        </SidewrapperContainer>
      </Container>
    </Root>
  );
};

export default BookingHotelById;
