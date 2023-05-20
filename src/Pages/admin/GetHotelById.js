import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Carousel } from "react-carousel-minimal";
import "react-carousel-minimal/dist/components/styles/index.css";
import axios from "axios";
import Checkbox from "./Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = styled.div`
  background-color: #e9e9e9;
  padding-bottom: 30px;
`;
const Container = styled.div`
  width: 1260px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const RightsideWrapper = styled.div`
  padding: 0 10px;
  width: 40%;
`;
const LeftsideSection = styled.div`
  background-color: #fff;
  width: 60%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  padding: 20px 20px;
  margin-left: 4rem;
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
  padding: 10px 0 15px 0px;
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
  border-radius: 11px;
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
const Image = styled.img``;
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
`;
const Icon = styled.div`
  position: absolute;
  left: 12%;
`;

const Headingwrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  align-items: center;
`;

const FacilitiesNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Facilitiesname = styled.text`
  margin: 0px 30px 0 15px;
`;
const Button1 = styled.button`
  /* background-color: gray; */
  color: #000;
  font-size: 16px;
  padding: 10px 40px;
  border: #0098d4;
  border-radius: 10px;
  cursor: pointer;
  :hover {
    color: #fff;
    background-color: #0098d4;
  }
`;

const LastHeadingwrapper = styled.div`
  margin-top: 15px;
`;
const TextWrapper1 = styled.text`
  color: #858585;
  margin: 10px 0;
  display: flex;
`;
const AdditionalDiv = styled.div`
  width: 80%;
  align-items: baseline;
  text-align-last: center;
  padding: 20px;
  display: flex;
  margin: 5px 25px;
`;

const HotelCategoryWrapper = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-around;
  width: 100px;
`;

const GetHotelById = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const { authData } = useContext(AuthContext);
  const [hotelname, setHotelname] = useState("");
  const [overview, setOverview] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [hotelTheme, setHotelTheme] = useState([]);
  const [totalNoOfRooms, setTotalNoOfRooms] = useState("");
  const [general, setGeneral] = useState("");
  const [services, setServices] = useState("");
  const [internet, setInternet] = useState("");
  const [parking, setParking] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [area, setArea] = useState("");

  const [showHotelName, setShowHotelName] = useState(false);
  const [showData, setShowData] = useState(false);
  const [items, setItems] = useState([]);
  const [roomCategory, setRoomCategory] = useState([]);
  const [noOfRooms, setNoOfRooms] = useState();
  const [key1, setKey1] = useState();

  const [theArray, setTheArray] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [hotelByIdData, setHotelByIdData] = useState({});
  const [updatedHotelData, setUpdatedHotelData] = useState({});
  const [roomsData, setRoomsData] = useState([]);

  const [roomCategoryEdit, setRoomCategoryEdit] = useState([]);
  const [noOfRoomsEdit, setNoOfRoomsEdit] = useState([]);
  const [updatedRoomData, setUpdatedRoomData] = useState([]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [theKey, setTheKey] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");

  const [arr, setArr] = useState([]);
  const [price, setPrice] = useState("");
  const [priceEdit, setPriceEdit] = useState("");

  const setHotelName = () => {
    setShowHotelName(!showHotelName);
  };
  const saveHotelName = () => {
    axios({
      method: "put",
      url: `http://188.166.176.89:4000/auth/updatehotel/admin/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        hotelName: hotelname,
        overview: overview,
        hotelCategory: hotelCategory,
        theme: hotelTheme,
        noOfRooms: totalNoOfRooms,
        general: general,
        services: services,
        internet: internet,
        parking: parking,
        city: cityValue,
        state: stateValue,
        area: area,
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        setUpdatedHotelData(response.data.message);
        setHotelname("");
        setOverview("");
        setGeneral("");
        setHotelCategory("");
        setServices("");
        setInternet("");
        setParking("");
        setCityValue("");
        setStateValue("");
        setArea("");
      })
      .catch((error) => {
        console.log("///////////////", error);
        // setError('Details are not valid');
      });
    setShowHotelName(!showHotelName);
  };
  const callApi = (x) => {
    axios({
      method: "post",
      url: `http://188.166.176.89:4000/auth/selectstateconutryadmin`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        citiByState: x,
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        setCitiesData(response.data.message);
      })
      .catch((error) => {
        console.log("///////////////", error);
      });
  };
  const addDiv = async () => {
    axios({
      method: "post",
      url: `http://188.166.176.89:4000/auth/addroomdetails1`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        roomCategory: roomCategory,
        noOfRooms: noOfRooms,
        hotelId: state._id,
        price: price,
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        // console.log(response.data.data.room,"00000000000001111111111")
        // setUpdatedHotelData(response.data.message)
        setRoomsData(response.data.data.room);
        setRoomCategory("");
        setNoOfRooms("");
        setPrice("");
      })
      .catch((error) => {
        console.log("///////////////", error);
        // setError('Details are not valid');
      });
    // setItems((oldItems)=>{
    //     return [...oldItems,{roomCategory,noOfRooms}];
    // })
  };
  const saveData = (key) => {
    setShowData(!showData);
    setKey1(key);
  };

  const saveRoomsData = (itemVal) => {
    // alert(noOfRoomsEdit)
    axios({
      method: "put",
      url: `http://188.166.176.89:4000/auth/updaterooms/admin/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        roomCategoryEdit: roomCategoryEdit,
        noOfRoomsEdit: noOfRoomsEdit,
        roomId: itemVal._id,
        priceEdit: priceEdit,
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log("dsffsdssd", response.data);
        setUpdatedRoomData(response.data.message);

        setRoomCategoryEdit("");
        setNoOfRoomsEdit("");
        setPriceEdit("");
        setShowData(!showData);
      })
      .catch((error) => {
        console.log("///////////////", error);
        // setError('Details are not valid');
      });
  };

  const getAllHotelData = async () => {
    await axios
      .get(`http://188.166.176.89:4000/auth/gethoteldetailbyid1/${state._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setHotelByIdData(response.data.data.hotels);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getAllHotelData();
    // let arr=[];
  }, [roomsData, updatedRoomData.rooms]);
  useEffect(() => {
    for (let i of state.image) {
      setArr((oldItems) => [
        ...oldItems,
        { image: `http://188.166.176.89:4000/uploads/${i}` },
      ]);
    }
  }, []);
  useEffect(() => {
    setList(arr);
  }, [list]);

  const handleClick = (e, index, image) => {
    const { checked } = e.target;
    // console.log("list uper wala", checked,id);
    setIsCheck([...isCheck, image]);
    // console.log("list niche wala", checked,isCheck);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== image));
    }
  };

  console.log(isCheck);

  const catalog = list.map(({ image }, index) => {
    console.log("fsddfs", image);
    return (
      <>
        <Checkbox
          key={index}
          type="checkbox"
          name={image}
          id={index}
          handleClick={(e) => handleClick(e, index, image)}
          isChecked={isCheck.includes(image)}
        />
        <Image src={image} alt="image" height={150} width={150} />
      </>
    );
  });
  const imageDelete = () => {
    axios({
      method: "post",
      url: `http://188.166.176.89:4000/auth/deletehotelimages/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: isCheck,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data, "00000000000001111111111");
        // setUpdatedHotelData(response.data.message)
        toast(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log("///////////////", error);
        // setError('Details are not valid');
      });
  };
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const imageAdd = () => {
    const formdata = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaa",multipleFiles[i])
      formdata.append("myFiles", multipleFiles[i]);
    }
    axios({
      method: "post",
      url: `http://188.166.176.89:4000/auth/addhotelimages/${state._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formdata,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data, "00000000000001111111111");

        // setUpdatedHotelData(response.data.message)
        toast(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log("///////////////", error);
        // setError('Details are not valid');
      });
  };
  return (
    <Root>
      <LeftsideSection>
        <TextWrapper>
          <Text>
            {showHotelName ? (
              <TextField
                id="outlined-basic"
                label="Hotel Name"
                variant="outlined"
                value={hotelname}
                onChange={(e) => setHotelname(e.target.value)}
              />
            ) : (
              `${
                updatedHotelData.hotelname !== undefined
                  ? updatedHotelData.hotelname
                  : state.hotelname
              }`
            )}
            {showHotelName ? (
              <span
                onClick={() => {
                  saveHotelName();
                }}
                style={{ cursor: "pointer" }}
              >
                Save
              </span>
            ) : (
              <IconWrapper
                onClick={() => {
                  setHotelName();
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </IconWrapper>
            )}
          </Text>

          <LocationiconWrapper>
            <IconWrapper>
              <i class="fa-solid fa-location-dot"></i>
            </IconWrapper>
            <Locationwrapper>
              {showHotelName ? (
                <div style={{ display: "flex" }}>
                  {/* <TextField id="outlined-basic" label="location" variant="outlined" /> */}
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={stateValue}
                        label="State"
                        onChange={(e) => setStateValue(e.target.value)}
                      >
                        <MenuItem
                          value="Maharashtra"
                          onClick={() => callApi("MH")}
                        >
                          Maharashtra
                        </MenuItem>
                        <MenuItem
                          value="Karnataka"
                          onClick={() => callApi("KA")}
                        >
                          Karnataka
                        </MenuItem>
                        <MenuItem
                          value="Rajasthan"
                          onClick={() => callApi("RJ")}
                        >
                          Rajasthan
                        </MenuItem>
                        <MenuItem value="Delhi" onClick={() => callApi("DL")}>
                          Delhi
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cityValue}
                        label="City"
                        onChange={(e) => setCityValue(e.target.value)}
                      >
                        {citiesData.map((item, key) => {
                          return (
                            <MenuItem value={item} key={key}>
                              {item}
                            </MenuItem>
                            // <MenuItem value='Nagpur'>Nagpur</MenuItem>
                            // <MenuItem value='Kolhapur'>Kolhapur</MenuItem>
                            // <MenuItem value='Nashik'>Nashik</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <TextField
                    id="outlined-basic"
                    label="location"
                    variant="outlined"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  {/* <TextField id="outlined-basic" label="location" variant="outlined" /> */}
                </div>
              ) : (
                `${
                  updatedHotelData.area !== undefined
                    ? updatedHotelData.area
                    : state.area
                } ${
                  updatedHotelData.city !== undefined
                    ? updatedHotelData.city
                    : state.city
                } ${
                  updatedHotelData.state !== undefined
                    ? updatedHotelData.state
                    : state.state
                }`
              )}
            </Locationwrapper>
          </LocationiconWrapper>
        </TextWrapper>

        <ButtonWrapper>
          <PhotoWrapper>
            <Icon>
              <i class="fa-regular fa-image"></i>
            </Icon>
            <a href="#GalleryDetails">
              {" "}
              <Button1>Photo</Button1>
            </a>
          </PhotoWrapper>

          <PhotoWrapper>
            <Icon>
              <i class="fa-solid fa-dungeon"></i>
            </Icon>
            <a href="#ActivitiesDetails">
              <Button1>Gateway Activities</Button1>
            </a>
          </PhotoWrapper>

          <PhotoWrapper>
            <Icon>
              <i class="fa-solid fa-location-dot"></i>
            </Icon>
            <a href="#LocationDetails">
              {" "}
              <Button1>Location Details</Button1>
            </a>
          </PhotoWrapper>

          <PhotoWrapper>
            <input
              type="file"
              multiple
              name="myFiles"
              onChange={(e) => MultipleFileChange(e)}
            />
            <Button1 onClick={() => imageAdd()}> Add</Button1>
            <Button1 onClick={() => imageDelete()}> Remove</Button1>
          </PhotoWrapper>
        </ButtonWrapper>
        <ToastContainer />

        {/* <ImageWrapper id='GalleryDetails'>
        <div style={{ textAlign: "center"}}>
          <div style={{
            padding: "0 20px"
          }}>
            {
              arr.length!==0 && (
                <Carousel
                    data={arr}
                    time={2000}
                    // width="850px"
                    height="500px"
                    // captionStyle={captionStyle}
                    radius="10px"
                    slideNumber={false}
                    // slideNumberStyle={slideNumberStyle}
                    captionPosition="top"
                    automatic={true}
                    dots={false}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    // slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                      textAlign: "center",
                      // maxWidth: "850px",
                      maxHeight: "500px",
                      margin: "40px auto",
                      display: "flex",
                    }}
            />
              )
            }
          </div>
      </div>
        </ImageWrapper> */}

        <ImageWrapper id="GalleryDetails">
          {/* <div style={{display:'flex',overflow:'scroll'}}>
            {
              arr.map((item,index)=>{
                return (
                  <div key={index}>
                    <Image src={item.image} alt='image' height={150} width={150}/>
                  </div>
                )
              })
            }
          </div> */}

          <div style={{ display: "flex", overflow: "scroll" }}>
            {/* <Checkbox
                type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                isChecked={isCheckAll}
              />
              Select All */}
            {catalog}
          </div>
        </ImageWrapper>

        <LocationiconWrapper>
          <IconWrapper>
            <i class="fa-solid fa-calendar-week"></i>
          </IconWrapper>
          <Locationwrapper details>Details</Locationwrapper>
        </LocationiconWrapper>

        <Horizontalwrapper>
          <hr />
        </Horizontalwrapper>

        <Headingwrapper>
          <Text heading>Overview</Text>
        </Headingwrapper>

        <ParagraphWrapper>
          <Paragraph>
            {showHotelName ? (
              <TextField
                id="outlined-basic"
                label="overview"
                variant="outlined"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
            ) : (
              `${
                updatedHotelData.overview !== undefined
                  ? updatedHotelData.overview
                  : state.overview
              }`
            )}
          </Paragraph>
        </ParagraphWrapper>

        <Headingwrapper>
          <Text heading>Facilities</Text>
        </Headingwrapper>

        <FacilitiesNameWrapper>
          <Facilitiesname>General</Facilitiesname>
          <ParagraphWrapper>
            <Paragraph>
              {showHotelName ? (
                <TextField
                  id="outlined-basic"
                  label="General"
                  variant="outlined"
                  value={general}
                  onChange={(e) => setGeneral(e.target.value)}
                />
              ) : (
                `${
                  updatedHotelData.facilities
                    ? updatedHotelData.facilities[0].general
                    : state.facilities[0].general
                }`
              )}
            </Paragraph>
          </ParagraphWrapper>
        </FacilitiesNameWrapper>

        <FacilitiesNameWrapper>
          <Facilitiesname>Services</Facilitiesname>
          <ParagraphWrapper>
            <Paragraph>
              {showHotelName ? (
                <TextField
                  id="outlined-basic"
                  label="Services"
                  variant="outlined"
                  value={services}
                  onChange={(e) => setServices(e.target.value)}
                />
              ) : (
                `${
                  updatedHotelData.facilities
                    ? updatedHotelData.facilities[0].services
                    : state.facilities[0].services
                }`
              )}
            </Paragraph>
          </ParagraphWrapper>
        </FacilitiesNameWrapper>
        {state.facilities !== undefined &&
          state.facilities[0].internet !== undefined && (
            <FacilitiesNameWrapper>
              <Facilitiesname>Internet</Facilitiesname>
              <ParagraphWrapper>
                <Paragraph>
                  {showHotelName ? (
                    <TextField
                      id="outlined-basic"
                      label="Internet"
                      variant="outlined"
                      value={internet}
                      onChange={(e) => setInternet(e.target.value)}
                    />
                  ) : (
                    `${
                      updatedHotelData.facilities
                        ? updatedHotelData.facilities[0].internet
                        : state.facilities[0].internet
                    }`
                  )}
                </Paragraph>
              </ParagraphWrapper>
            </FacilitiesNameWrapper>
          )}

        {state.facilities !== undefined &&
          state.facilities[0].parking !== undefined && (
            <FacilitiesNameWrapper>
              <Facilitiesname>Parking</Facilitiesname>
              <ParagraphWrapper>
                <Paragraph>
                  {showHotelName ? (
                    <TextField
                      id="outlined-basic"
                      label="Parking"
                      variant="outlined"
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                    />
                  ) : (
                    `${
                      updatedHotelData.facilities
                        ? updatedHotelData.facilities[0].parking
                        : state.facilities[0].parking
                    }`
                  )}
                </Paragraph>
              </ParagraphWrapper>
            </FacilitiesNameWrapper>
          )}

        <Headingwrapper>
          <Text heading>Hotel Category</Text>
        </Headingwrapper>

        <LocationiconWrapper>
          {/* <IconWrapper><i class="fa-solid fa-location-dot"></i></IconWrapper> */}
          <HotelCategoryWrapper>
            <div>
              {showHotelName ? (
                <TextField
                  id="outlined-basic"
                  label="hotel category"
                  variant="outlined"
                  value={hotelCategory}
                  onChange={(e) => setHotelCategory(e.target.value)}
                />
              ) : (
                `${
                  updatedHotelData.hotelCategory !== undefined
                    ? updatedHotelData.hotelCategory
                    : state.hotelCategory
                }`
              )}
            </div>
            <div>
              {showHotelName ? (
                <TextField
                  id="outlined-basic"
                  label="No of rooms"
                  variant="outlined"
                  type="number"
                  value={totalNoOfRooms}
                  onChange={(e) => setTotalNoOfRooms(e.target.value)}
                />
              ) : (
                `${
                  updatedHotelData.noOfRooms !== undefined
                    ? updatedHotelData.noOfRooms
                    : state.noOfRooms
                }`
              )}
            </div>
          </HotelCategoryWrapper>
        </LocationiconWrapper>
        <Headingwrapper>
          <Text heading>Hotel Themes</Text>
        </Headingwrapper>

        <LocationiconWrapper>
          {/* <IconWrapper><i class="fa-solid fa-location-dot"></i></IconWrapper> */}
          <HotelCategoryWrapper>
            <div>
              {showHotelName ? (
                <Select
                  labelId="demo-multiple-select-label"
                  id="demo-multiple-select"
                  multiple
                  value={hotelTheme}
                  onChange={(e) =>
                    setHotelTheme([...hotelTheme, e.target.value])
                  }
                >
                  <MenuItem value="beach">Beach</MenuItem>
                  <MenuItem value="wildlife">Wildlife</MenuItem>
                  <MenuItem value="romantic">Romantic</MenuItem>
                  <MenuItem value="hill">Hill</MenuItem>
                  <MenuItem value="heritage">Heritage</MenuItem>
                </Select>
              ) : (
                `${
                  updatedHotelData.hotelTheme !== undefined
                    ? updatedHotelData.hotelTheme
                    : state.hotelTheme
                }`
              )}
            </div>
          </HotelCategoryWrapper>
        </LocationiconWrapper>

        <Headingwrapper>
          <Text heading>Rooms</Text>
        </Headingwrapper>

        {/* <LocationiconWrapper>
        <IconWrapper><i class="fa-solid fa-location-dot"></i></IconWrapper>
        <Locationwrapper LocationDetail id='LocationDetails'>{updatedHotelData.area!==undefined?updatedHotelData.area:state.area} {updatedHotelData.city!==undefined?updatedHotelData.city:state.city} {updatedHotelData.state!==undefined?updatedHotelData.state:state.state}</Locationwrapper>
        </LocationiconWrapper> */}

        <TextWrapper1>
          <TextField
            id="outlined-basic"
            label="Room Category"
            variant="outlined"
            value={roomCategory}
            onChange={(e) => setRoomCategory(e.target.value)}
          />
          &nbsp;&nbsp;
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
          />
          <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button onClick={() => addDiv()}>Add</Button>
        </TextWrapper1>
        {hotelByIdData.rooms?.map((itemVal, key) => {
          // console.log("aa",itemVal)
          return (
            <>
              <AdditionalDiv key={key}>
                {key === key1 && showData ? (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Room Category"
                      variant="outlined"
                      value={roomCategoryEdit}
                      onChange={(e) => setRoomCategoryEdit(e.target.value)}
                    />
                    <TextField
                      id="outlined-number"
                      label="No of rooms"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={noOfRoomsEdit}
                      onChange={(e) => setNoOfRoomsEdit(e.target.value)}
                    />
                    <TextField
                      id="outlined-number"
                      label="price"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={priceEdit}
                      onChange={(e) => setPriceEdit(e.target.value)}
                    />
                  </div>
                ) : (
                  `${itemVal.roomCategory}  ${itemVal.noOfRooms} ${itemVal.price}`
                )}

                {key === key1 && showData ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => saveRoomsData(itemVal)}
                  >
                    Save
                  </span>
                ) : (
                  <IconWrapper
                    onClick={() => {
                      saveData(key);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </IconWrapper>
                )}
              </AdditionalDiv>
            </>
          );
        })}
        <LastHeadingwrapper></LastHeadingwrapper>
      </LeftsideSection>
    </Root>
  );
};

export default GetHotelById;
