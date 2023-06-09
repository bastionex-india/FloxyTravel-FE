import styled from "styled-components";
import React from "react";
const Root = styled.div`
  width: 967px;
  margin: 10px auto;
  padding: 20px 0;
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
  border: 1px solid #c4c4c4;
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
  top: 63px;
  right: 0px;
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
const AddHotels = () => {
  const stateData = [
    {
      name: "Andhra Pradesh",
      code: "AD",
    },
    {
      name: "Arunachal Pradesh",
      code: "AR",
    },
    {
      name: "Assam",
      code: "AS",
    },
    {
      name: "Bihar",
      code: "BR",
    },
    {
      name: "Chattisgarh",
      code: "CG",
    },
    {
      name: "Delhi",
      code: "DL",
    },
    {
      name: "Goa",
      code: "GA",
    },
    {
      name: "Gujarat",
      code: "GJ",
    },
    {
      name: "Haryana",
      code: "HR",
    },
    {
      name: "Himachal Pradesh",
      code: "HP",
    },
    {
      name: "Jammu and Kashmir",
      code: "JK",
    },
    {
      name: "Jharkhand",
      code: "JH",
    },
    {
      name: "Karnataka",
      code: "KA",
    },
    {
      name: "Kerala",
      code: "KL",
    },
    {
      name: "Lakshadweep Islands",
      code: "LD",
    },
    {
      name: "Madhya Pradesh",
      code: "MP",
    },
    {
      name: "Maharashtra",
      code: "MH",
    },
    {
      name: "Manipur",
      code: "MN",
    },
    {
      name: "Meghalaya",
      code: "ML",
    },
    {
      name: "Mizoram",
      code: "MZ",
    },
    {
      name: "Nagaland",
      code: "NL",
    },
    {
      name: "Odisha",
      code: "OD",
    },
    {
      name: "Pondicherry",
      code: "PY",
    },
    {
      name: "Punjab",
      code: "PB",
    },
    {
      name: "Rajasthan",
      code: "RJ",
    },
    {
      name: "Sikkim",
      code: "SK",
    },
    {
      name: "Tamil Nadu",
      code: "TN",
    },
    {
      name: "Telangana",
      code: "TS",
    },
    {
      name: "Tripura",
      code: "TR",
    },
    {
      name: "Uttar Pradesh",
      code: "UP",
    },
    {
      name: "Uttarakhand",
      code: "UK",
    },
    {
      name: "West Bengal",
      code: "WB",
    },
  ];
  return (
    <Root>
      <MainHeading>Add New Hotel</MainHeading>
      <MainContainer>
        <HotelAddForm>
          <FormWrapper>
            <FormLabel>Hotel Name*</FormLabel>
            <FormInput type="text" />
            <LocationWrapper>
              <div>
                <FormLabel>State*</FormLabel>
                <FormSelect>
                  <FormOptions>Select State</FormOptions>
                  {stateData.map((val) => {
                    return <FormOptions>{val.name}</FormOptions>;
                  })}
                </FormSelect>
              </div>
              <div>
                <FormLabel>City*</FormLabel>
                <FormSelect>
                  <FormOptions>Select City</FormOptions>
                  <FormOptions>Noida</FormOptions>
                  <FormOptions>Delhi</FormOptions>
                  <FormOptions>Gurugram</FormOptions>
                </FormSelect>
              </div>
              <div>
                <FormLabel>Latitude*</FormLabel>
                <FormInput type="text" />
              </div>
              <div>
                <FormLabel>Longitude*</FormLabel>
                <FormInput type="text" />
              </div>
              <GetLocationText>Get Coordinates</GetLocationText>
            </LocationWrapper>
            <ThemeWrapper>
              <div>
                <FormLabel>Theme*</FormLabel>
                <FormSelect>
                  <FormOptions>Select Theme</FormOptions>
                  <FormOptions>Beach</FormOptions>
                  <FormOptions>Wildlife</FormOptions>
                  <FormOptions>Romantic</FormOptions>
                  <FormOptions>Hills</FormOptions>
                  <FormOptions>Heritage</FormOptions>
                </FormSelect>
              </div>
              <div style={{ marginLeft: "1.8rem" }}>
                <FormLabel>Category*</FormLabel>
                <FormSelect>
                  <FormOptions>Select Category</FormOptions>
                  <FormOptions>Economy</FormOptions>
                  <FormOptions>Mid Range</FormOptions>
                  <FormOptions>Luxury</FormOptions>
                </FormSelect>
              </div>
            </ThemeWrapper>
            <FormLabel>General Info*</FormLabel>
            <FormInput type="text" />
            <FormLabel>Services*</FormLabel>
            <FormInput type="text" />
            <FormLabel>Internet*</FormLabel>
            <FormInput type="text" />
            <FormLabel>Parking*</FormLabel>
            <FormInput type="text" />
            <FormLabel>Overview*</FormLabel>
            <FormTextArea />
            <FormLabel>Images*</FormLabel>
            <FormFileInput type="file" />
          </FormWrapper>
          <Button>Save</Button>
        </HotelAddForm>
      </MainContainer>
    </Root>
  );
};

export default AddHotels;
