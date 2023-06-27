import styled from "styled-components";
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../ContextApi/ContextApi";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { environmentVariables } from "../../../config/config";
import Swal from "sweetalert2";
import { FaTimes } from 'react-icons/fa';
import { useRef } from "react";

const Root = styled.div`
  /* width: 967px; */
  margin: 10px auto;
  padding: 20px;
`;

const HeadingWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainHeading = styled.div`
  font-size: 1.75rem;
  color: #000;
  margin: 0 5% 10px 5%;
`;
const MainContainer = styled.div`
  background-color: #fff;
  padding: 20px;
`;
const Button = styled.div`
  /* cursor: ${(props) => (props.isPriority ? "pointer" : "default")}; */
  /* background-color: ${(props) => (props.isPriority ? `#01565b` : `grey`)}; */
  /* background-color: #01575c; */
  background-color: #01565b;
  cursor: pointer;
  height: 30px;
  width: 100px;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 700;
  margin: 20px auto;
`;
const HotelAddForm = styled.div`
  /* border: 1px solid #c4c4c4; */
  border-radius: 5px;
  margin: 20px;
`;
const FormWrapper = styled.div`
  margin: 10px;
`;
const FormLabel = styled.div``;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  height: 30px;
  margin: 10px 0 20px 0;
  border: 1px solid #c4c4c4;
`;

const FormFileInput = styled.input`
  width: 100%;
  border-radius: 5px;
  height: 30px;
  margin: 10px 0 20px 0;
  border: 1px solid #c4c4c4;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0px 20px;
  border-radius: 5px;
  height: 30px;
  margin: 10px 0 20px 0;
  border: 1px solid #c4c4c4;
`;
const FormOptions = styled.option``;
const LocationWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ThemeWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const GetLocationText = styled.div`
  position: absolute;
  top: 511px;
  left: 54rem;
  color: #01565c;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  /* height: 30px; */
  margin: 10px 0 20px 0;
  border: 1px solid #c4c4c4;
`;
const SelectVendor = styled.select`
  width: 85%;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 10px;
`;
const SelectOption = styled.option`
  font-size: 14px;
`;

const FormSelectTheme = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
`;
const Image = styled.img``;

const ImageSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const Image1 = styled.img`
   width: 100px; 
  height: 100px;
  object-fit: cover;
`;
const CirleCross = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  background-color: green; /* Adjust the background color as needed */
  border-radius: 50%;
  z-index: -1;
`;
const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  // background: transparent;
  border: none;
  color: red;
  cursor: pointer;
`;

const AddHotels = () => {
  const navigation = useNavigate();
  const { authData } = useContext(AuthContext);
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [hotelData, setHotelData] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [vendorlist, setVendorList] = useState(null);
  const [vendorId, setVendorId] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [theme, setTheme] = useState([]);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [general, setGeneral] = useState("");
  const [services, setServices] = useState("");
  const [internet, setInternet] = useState("");
  const [parking, setParking] = useState("");
  const [overview, setOverview] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [payoutInterval,setPayoutInterval] =  useState('');
  const [hotelFee,setHotelFee] =  useState('');
  const [images, setImages] = useState([]);
  const [list, setList] = useState([]);
  const [arr, setArr] = useState([]);
  const [updatedHotelData, setUpdatedHotelData] = useState([]);

  const navigate = useNavigate();
  const options = [
    { label: "Beach", value: "beach" },
    { label: "Wildlife", value: "wildlife" },
    { label: "Romantic", value: "romantic" },
    { label: "Hill", value: "hill" },
    { label: "Heritage", value: "heritage" },
  ];

  const getVendorList = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/admin/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log("sddfsdsf",response.data.data)
        setVendorList(response.data.data.records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const getHotelDetailById = async () => {
    try {
      const url = `${environmentVariables.apiUrl}/admin/gethoteldetailbyid/${id}`;
      const response = await axios.get(url, {
        headers: { _token: authData.data.token },
      });
      console.log("noOfRooms",response.data.data.payoutInterval)
      setHotelData(response.data.data);
      setName(response.data.data.hotelname);

      setTotalRooms(response.data.data.noOfRooms);
      setPayoutInterval(response.data.data.payoutInterval);

      setHotelFee(response.data.data.adminFee);
      setGeneral(response.data.data.facilities[0].general);
      setServices(response.data.data.facilities[0].services);
      setInternet(response.data.data.facilities[0].internet);
      setParking(response.data.data.facilities[0].parking);
      setOverview(response.data.data.overview);
      setTheme(response.data.data.hotelTheme);
      setCategory(response.data.data.hotelCategory);
      setImages(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVendorList();
    getHotelDetailById();
    let config = {
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getallcountries`,
      headers: { _token: authData?.data?.token },
    };
    axios
      .request(config)
      .then((response) => {
        setAllCountries(response.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getstatesofcountry`,
      headers: { _token: authData?.data?.token },
      data: { countryCode: countryCode },
    };
    axios
      .request(config)
      .then((response) => {
        setAllStates(response.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [countryCode]);

  useEffect(() => {
    let config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getcitiesofcountry`,
      headers: { _token: authData?.data?.token },
      data: {
        countryCode: countryCode,
        stateCode: stateCode,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setAllCities(response.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [countryCode, stateCode]);

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    const selectedOption = e.target.selectedOptions[0];
    setCountryName(selectedOption.getAttribute("data-value"));
  };
  const handleStateChange = (e) => {
    setStateCode(e.target.value);
    const selectedOption = e.target.selectedOptions[0];
    setStateName(selectedOption.getAttribute("data-value"));
  };

  const handleCityChange = (e) => {
    setCityCode(e.target.value);
    const selectedOption = e.target.selectedOptions[0];
    setCityName(selectedOption.getAttribute("data-value"));
  };
  const handleOnchangeTheme = (val) => {
    setTheme(val);
    console.log(val);
  };
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const handleClose = async (e) => {
    e.preventDefault();
    // console.log("aaaaaa",name,theme,category,totalRooms,general,services,internet,parking,overview)
    const formdata = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaa",multipleFiles[i])
      formdata.append("myFiles", multipleFiles[i]);
    }
    formdata.append("hotelName", name);
    formdata.append("area", area);
    formdata.append("address", address);
    formdata.append("country", countryName);
    formdata.append("state", stateName);
    formdata.append("city", cityName);
    formdata.append("hotelCategory", category);
    formdata.append("noOfRooms", totalRooms);
    formdata.append("general", general);
    formdata.append("services", services);
    formdata.append("internet", internet);
    formdata.append("parking", parking);
    formdata.append("overview", overview);
    // for (let i = 0; i < theme.length; i++) {
    //   formdata.append(`theme[${i}]`, theme[i]);
    // }
    formdata.append(`adminFee`, hotelFee);
    formdata.append(`payoutInterval`, payoutInterval);
    formdata.append(`theme`, theme);
    formdata.append("lat", lat);
    formdata.append("long", long);
    formdata.append("hotelVendorId", vendorId);
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/addhotel`,
      data: formdata,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        setName("");
        setArea("");
        setAddress("");
        setStateName("");
        setCityName("");
        setCategory("");
        setTotalRooms("");
        setGeneral("");
        setServices("");
        setInternet("");
        setParking("");
        setOverview("");
        setTheme([]);
        setLat("");
        setLong("");
        setHotelFee('');
        setPayoutInterval('')
        setMultipleFiles("");
        Swal.fire("Added", "New Hotel added successfully", "success");
        navigation("/managehotels");
      })
      .catch((error) => {
        console.log("///////////////", error);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };

  const handleUpdate = async (e) => {
    axios({
      method: "put",
      url: `${environmentVariables.apiUrl}/admin/updatehotel/admin/${hotelData._id}`,
      data: {
        hotelName: name,
        overview: overview,
        hotelCategory: category,
        theme: theme.toString(),
        noOfRooms: totalRooms,
        adminFee: hotelFee,
        payoutInterval: payoutInterval,
        general: general,
        services: services,
        internet: internet,
        parking: parking
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data.message)
        setUpdatedHotelData(response.data.message);
        Swal.fire("Updated", "Hotel updated successfully", "success");
        navigate('/managehotels')
        // setName("");
        // setOverview("");
        // setGeneral("");
        // setCategory("");
        // setServices("");
        // setInternet("");
        // setParking("");
        // setTheme([])
        // setTotalRooms("")
      })
      .catch((error) => {
        console.log("///////////////", error);
        Swal.fire("Error", "Something went wrong", "error");
        // setError('Details are not valid');
      });
  }



  const getHotelLatLong = (e) => {
    e.preventDefault();
    // console.log("fdgfdgfdgdf",lat,long)
    axios({
      method: "get",
      url: "https://geolocation-db.com/json/",
    })
      .then((response) => {
        // console.log(response.data)
        setLat(response.data.latitude);
        setLong(response.data.longitude);
      })
      .catch((error) => {
        console.log("Geo location error", error);
      });
  };
  useEffect(() => {
    for (let i of images) {
      setArr((oldItems) => [
        ...oldItems,
        { image: `${environmentVariables.apiUrl}/uploads/${i}` },
      ]);
    }
  }, [images]);
  useEffect(() => {
    setList(arr);
  }, [list, arr]);

  const removeImage = async (imageName) => {
    try {
      // Send the DELETE request using Axios
      await axios.delete(`${environmentVariables.apiUrl}/admin/deletehotelimages/${hotelData._id}/${imageName}`, { headers: { _token: authData.data.token } });
      getHotelDetailById();
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };
  const MultipleFileChange1 = (e) => {
    const formdata = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formdata.append("myFiles", e.target.files[i]);
    }
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/addhotelimages/${hotelData._id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formdata,
      headers: { _token: authData.data.token },
    })
      .then((response) => {

        getHotelDetailById();
        fileInputRef.current.value = null;
        Swal.fire("Added", "Images inserted successfully", "success");
      })
      .catch((error) => {
        console.log("///////////////", error);
        Swal.fire("Error", "Something went wrong", "error");
      });
  }
  return (
    <Root>
      <HeadingWrapper>
        {" "}
        <i
          style={{ position: "absolute", left: "0" }}
          onClick={() => navigate(-1)}
          class="fa-solid fa-chevron-left fa-2x"
        ></i>
        <MainHeading>
          {id === undefined ? "Add New Hotel" : "Edit Hotel"}
        </MainHeading>
      </HeadingWrapper>
      <MainContainer>
        <HotelAddForm>
          <FormWrapper>
            <FormLabel>Hotel Name*</FormLabel>
            <FormInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {id === undefined && (
              <LocationWrapper>
                <div>
                  <FormLabel>Country*</FormLabel>
                  <FormSelect onChange={handleCountryChange}>
                    <FormOptions>Select Country</FormOptions>
                    {allCountries.map((country, index) => (
                      <option
                        key={index}
                        value={country.isoCode}
                        data-value={country.name}
                      >
                        {country.name}
                      </option>
                    ))}
                  </FormSelect>
                </div>
                <div>
                  <FormLabel>State*</FormLabel>
                  <FormSelect onChange={handleStateChange}>
                    <FormOptions>Select State</FormOptions>
                    {allStates.map((val, index) => {
                      return (
                        <FormOptions
                          key={index}
                          value={val.isoCode}
                          data-value={val.name}
                        >
                          {val.name}
                        </FormOptions>
                      );
                    })}
                  </FormSelect>
                </div>
                <div>
                  <FormLabel>City*</FormLabel>
                  <FormSelect onChange={handleCityChange}>
                    {allCities.map((val, index) => {
                      return (
                        <FormOptions
                          key={index}
                          value={val.isoCode}
                          data-value={val.name}
                        >
                          {val.name}
                        </FormOptions>
                      );
                    })}
                  </FormSelect>
                </div>
                <div style={{ marginLeft: "1.8rem" }}>
                  <FormLabel>Area*</FormLabel>
                  <FormInput
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: "1.8rem" }}>
                  <FormLabel>Address*</FormLabel>
                  <FormInput
                    type="text"
                    value={id === undefined ? address : hotelData.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </LocationWrapper>
            )}
            <LocationWrapper>

              <div>
                <FormLabel>Fee* (in percentage)</FormLabel>
                <FormInput
                  type="text"
                  value={hotelFee}
                  onChange={(e) => setHotelFee(e.target.value)}
                />
              </div>

              <div style={{ marginLeft: "1.8rem" }}>
                <FormLabel>Payout Interval * (in days)</FormLabel>
                <FormInput
                  type="text"
                  value={payoutInterval}
                  onChange={(e) => setPayoutInterval(e.target.value)}
                />
              </div>
            </LocationWrapper>
            <ThemeWrapper>
              <div>
                <FormLabel>Theme*</FormLabel>
                <MultiSelect
                  className="multi-select"
                  onChange={handleOnchangeTheme}
                  options={options}
                  defaultValue={theme}
                />
              </div>
              <div style={{ marginLeft: "1.8rem" }}>
                <FormLabel>Category*</FormLabel>
                <FormSelect onChange={(e) => setCategory(e.target.value)} value={category}>
                  <FormOptions>Select Category</FormOptions>
                  <FormOptions value={"economy"}>Economy</FormOptions>
                  <FormOptions value={"midrange"}>Mid Range</FormOptions>
                  <FormOptions value={"luxury"}>Luxury</FormOptions>
                </FormSelect>
              </div>
              {id === undefined && (
                <>
                  <div>
                    <FormLabel>Latitude*</FormLabel>
                    <FormInput
                      type="text"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                    />
                  </div>
                  <div>
                    <FormLabel>Longitude*</FormLabel>
                    <FormInput
                      type="text"
                      value={long}
                      onChange={(e) => setLong(e.target.value)}
                    />
                  </div>
                  <GetLocationText onClick={getHotelLatLong}>
                    Get Coordinates
                  </GetLocationText>

                  <SelectVendor onChange={(e) => setVendorId(e.target.value)}>
                    <SelectOption>Select Vendor*</SelectOption>
                    {vendorlist &&
                      vendorlist.map((row, index) => {
                        return (
                          <SelectOption key={index} value={row.vendorId}>
                            {row.name}
                          </SelectOption>
                        );
                      })}
                  </SelectVendor>
                </>
              )}
            </ThemeWrapper>
            <div>
              <FormLabel>Total Rooms*</FormLabel>
              <FormInput
                type="number"
                value={totalRooms}
                onChange={(e) => setTotalRooms(e.target.value)}
              />
            </div>
            <FormLabel>General Info*</FormLabel>
            <FormInput
              type="text"
              value={general}
              onChange={(e) => setGeneral(e.target.value)}
            />
            <FormLabel>Services*</FormLabel>
            <FormInput
              type="text"
              value={services}
              onChange={(e) => setServices(e.target.value)}
            />
            {id !== undefined &&
              hotelData.facilities !== undefined &&
              hotelData.facilities[0].internet && (
                <>
                  <FormLabel>Internet*</FormLabel>
                  <FormInput
                    type="text"
                    value={internet}
                    onChange={(e) => setInternet(e.target.value)}
                  />
                </>
              )}
            {id !== undefined &&
              hotelData.facilities !== undefined &&
              hotelData.facilities[0].parking && (
                <>
                  <FormLabel>Parking*</FormLabel>
                  <FormInput
                    type="text"
                    value={parking}
                    onChange={(e) => setParking(e.target.value)}
                  />
                </>
              )}
            <FormLabel>Overview*</FormLabel>
            <FormTextArea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
            {
              id === undefined && (
                <>
                  <FormLabel>Images*</FormLabel>
                  <FormFileInput
                    type="file"
                    multiple
                    name="myFiles"
                    onChange={(e) => MultipleFileChange(e)}
                  />
                </>
              )
            }
          </FormWrapper>
          {id === undefined ? <Button onClick={(e) => handleClose(e)}>Save</Button> : <Button onClick={(e) => handleUpdate(e)}>Update</Button>}
        </HotelAddForm>
        {
          id !== undefined && (
            <>
              <FormLabel>Images*</FormLabel>
              <FormFileInput
                type="file"
                multiple
                name="myFiles"
                onChange={(e) => MultipleFileChange1(e)}
                ref={fileInputRef}
              />
            </>
          )
        }
        {/* <div style={{display:"flex",flexDirection:'column'}}>
          <div style={{ display: "flex", overflow: "scroll" }}>
              {catalog}
          </div>
          <Button>Submit</Button>
        </div> */}
        {/* <div>
          {images.map((image) => (
            <div key={image}>
              <img src={`${environmentVariables.apiUrl}/uploads/${image}`} alt="Image" />
            </div>
          ))}
        </div> */}
        <ImageSection >
          {images.map((image) => (
            <ImageWrapper key={image}>
              <CirleCross ></CirleCross>
              <Image1 src={`${environmentVariables.apiUrl}/uploads/${image}`} alt="Image" />
              <RemoveButton onClick={() => removeImage(image)}>
                <FaTimes />
              </RemoveButton>
            </ImageWrapper>
          ))}
        </ImageSection>

      </MainContainer>
    </Root>
  );
};

export default AddHotels;
