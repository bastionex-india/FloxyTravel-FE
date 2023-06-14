import styled from "styled-components";
import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../ContextApi/ContextApi";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { environmentVariables } from "../../../config/config";

const Root = styled.div`
  /* width: 967px; */
  margin: 10px auto;
  padding: 20px;
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

const AddHotels = () => {
  const { authData } = useContext(AuthContext);
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
      .get(`${environmentVariables.apiUrl}/auth/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setVendorList(response.data.data.Records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    getVendorList();
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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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
  const handleOnchangeTheme = (val) => setTheme(val);
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const handleClose = async (e) => {
    e.preventDefault();
    console.log(
      "aaaaaa",
      name,
      countryName,
      area,
      stateName,
      cityName,
      totalRooms,
      category,
      general,
      services,
      internet,
      parking,
      overview,
      multipleFiles,
      multipleFiles.length,
      vendorId,
      lat,
      long,
      theme,
      address
    );
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
    console.log(theme.split(","));
    formdata.append(`theme`, theme);
    formdata.append("lat", lat);
    formdata.append("long", long);
    formdata.append("hotelVendorId", vendorId);
    // formdata.append('email',authData.data.token)
    console.log("sssssss", formdata);
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/addhotel`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formdata,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log("aaaaaaaaaaaasssssss", response.data);
        // setResponseData(response.data);
        // toast(response.data.message);
        // setName("");
        // setArea("");
        // setStateName("");
        // setCityName("");
        // setCategory("");
        // setTotalRooms("");
        // setGeneral("");
        // setServices("");
        // setInternet("");
        // setParking("");
        // setOverview("");
        // setTheme([]);
        // setLat("");
        // setLong("");
        // setMultipleFiles("");
      })
      .catch((error) => {
        console.log("///////////////", error);
      });
  };
  return (
    <Root>
      <div style={{ display: "flex", alignItems: "center" }}>
        {" "}
        <i
          style={{ cursor: "pointer", marginRight: "50px" }}
          onClick={() => navigate(-1)}
          class="fa-solid fa-chevron-left fa-2x"
        ></i>
        <MainHeading>Add New Hotel</MainHeading>
      </div>
      <MainContainer>
        <HotelAddForm>
          <FormWrapper>
            <FormLabel>Hotel Name*</FormLabel>
            <FormInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                />
              </div>
              <div style={{ marginLeft: "1.8rem" }}>
                <FormLabel>Category*</FormLabel>
                <FormSelect onChange={(e) => setCategory(e.target.value)}>
                  <FormOptions>Select Category</FormOptions>
                  <FormOptions value={"economy"}>Economy</FormOptions>
                  <FormOptions value={"midrange"}>Mid Range</FormOptions>
                  <FormOptions value={"luxury"}>Luxury</FormOptions>
                </FormSelect>
              </div>
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
              <GetLocationText>Get Coordinates</GetLocationText>

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
            <FormLabel>Internet*</FormLabel>
            <FormInput
              type="text"
              value={internet}
              onChange={(e) => setInternet(e.target.value)}
            />
            <FormLabel>Parking*</FormLabel>
            <FormInput
              type="text"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
            />
            <FormLabel>Overview*</FormLabel>
            <FormTextArea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
            <FormLabel>Images*</FormLabel>
            <FormFileInput
              type="file"
              multiple
              name="myFiles"
              onChange={(e) => MultipleFileChange(e)}
            />
          </FormWrapper>
          <Button onClick={(e) => handleClose(e)}>Save</Button>
        </HotelAddForm>
      </MainContainer>
    </Root>
  );
};

export default AddHotels;
