import styled from "styled-components";
import React, { useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../ContextApi/ContextApi";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { environmentVariables } from "../config/config";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";
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

const VendorEditHotel = () => {
  const navigation = useNavigate();
  const { authData } = useContext(AuthContext);
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [hotelData, setHotelData] = useState("");
  const [vendorlist, setVendorList] = useState(null);
  const [vendorId, setVendorId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [theme, setTheme] = useState([]);
  const [general, setGeneral] = useState("");
  const [services, setServices] = useState("");
  const [internet, setInternet] = useState("");
  const [parking, setParking] = useState("");
  const [overview, setOverview] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
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
      const url = `${environmentVariables.apiUrl}/vendor/gethoteldetailbyid/${id}`;
      const response = await axios.get(url, {
        headers: { _token: authData.data.token },
      });
      setHotelData(response.data.data);
      setName(response.data.data.hotelname);

      setTotalRooms(response.data.data.noOfRooms);
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
  }, []);

  const handleOnchangeTheme = (val) => {
    setTheme(val);
    console.log(val);
  };

  const handleUpdate = async (e) => {
    axios({
      method: "put",
      url: `${environmentVariables.apiUrl}/vendor/updatehotel/vendor/${hotelData._id}`,
      data: {
        hotelName: name,
        overview: overview,
        hotelCategory: category,
        theme: theme.toString(),
        noOfRooms: totalRooms,
        general: general,
        services: services,
        internet: internet,
        parking: parking,
      },
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response.data.message);
        setUpdatedHotelData(response.data.message);
        Swal.fire("Updated", "Hotel updated successfully", "success");
        navigate("/vendormanagehotels");
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
      // console.log(imageName)
      await axios.delete(
        `${environmentVariables.apiUrl}/vendor/deletehotelimages/${hotelData._id}/${imageName}`,
        { headers: { _token: authData.data.token } }
      );
      getHotelDetailById();
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };
  const MultipleFileChange1 = (e) => {
    const formdata = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formdata.append("myFiles", e.target.files[i]);
    }
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/addhotelimages/${hotelData._id}`,
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
  };
  return (
    <Root>
      <HeadingWrapper>
        {" "}
        <i
          style={{ position: "absolute", left: "0" }}
          onClick={() => navigate(-1)}
          class="fa-solid fa-chevron-left fa-2x"
        ></i>
        <MainHeading>{"Edit Hotel"}</MainHeading>
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
                <FormSelect
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <FormOptions>Select Category</FormOptions>
                  <FormOptions value={"economy"}>Economy</FormOptions>
                  <FormOptions value={"midrange"}>Mid Range</FormOptions>
                  <FormOptions value={"luxury"}>Luxury</FormOptions>
                </FormSelect>
              </div>
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
          </FormWrapper>
          <Button onClick={(e) => handleUpdate(e)}>Update</Button>
        </HotelAddForm>
        <FormLabel>Images*</FormLabel>
        <FormFileInput
          type="file"
          multiple
          name="myFiles"
          onChange={(e) => MultipleFileChange1(e)}
          ref={fileInputRef}
        />

        <ImageSection>
          {images.map((image) => (
            <ImageWrapper key={image}>
              <CirleCross></CirleCross>
              <Image1
                src={`${environmentVariables.apiUrl}/uploads/${image}`}
                alt="Image"
              />
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

export default VendorEditHotel;
