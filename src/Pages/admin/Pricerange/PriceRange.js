import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { environmentVariables } from "../../../config/config";
import { useAuth } from "../../../ContextApi/ContextApi";
import Swal from "sweetalert2";
import axios from "axios";


const PriceRange = () => {
  const { authData } = useAuth();
  const [show, setShow] = useState(false);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allData, setAllData] = useState([]);
  const [countryCode, setCountryCode] = useState("");


  const handleClose = () => setShow(false);

  const getAllCountries = ()=>{
    let config = {
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getallcountries`,
      headers: { _token: authData?.token },
    };
    axios
      .request(config)
      .then((response) => {
        setAllCountries(response.data.data);
      })
      .catch((err) => {
        console.log(err, "dd");
      });
  }

  const getAllPrices = ()=>{

    let config = {
      method: 'get',
      url: `${environmentVariables.apiUrl}/admin/getAllPriceRange`,
      headers: { 
        _token: authData?.token
      }
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setAllData(response?.data?.data)
    })
    .catch((error) => {
      console.log(error);
    });

  }
  useEffect(()=>{
    getAllCountries()
    getAllPrices()
  },[])
  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
    // const selectedOption = e.target.selectedOptions[0];
    // setCountryName(selectedOption.getAttribute("data-value"));
  };
  
  const handleSubmit = ()=>{
    let data = {
      min: minValue,
      max: maxValue,
      countryCode: countryCode
    };

    let config = {
      method: 'post',
      url: `${environmentVariables.apiUrl}/admin/addpricerange`,
      headers: { 
        _token: authData?.token,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      Swal.fire("Updated", response?.data?.message, "success");
      handleClose()
      setMinValue("")
      setMaxValue("")
      setCountryCode("")
      getAllPrices()
    })
    .catch((error) => {
      Swal.fire("Error", error?.message || error?.response?.data?.message, "error");
      handleClose()
      setMinValue("")
      setMaxValue("")
      setCountryCode("")
    });

  }
  console.log("allData",allData)
  return (
    <div style={{margin:"50px 50px"}}>
      <div>
        {" "}
        <button onClick={() => {setShow(true)}}>Add</button>
        <div>
          {allData?.map((val,index)=>{
            return (
              <div key={index}>
              <h5>{val?.countryCode}</h5>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {val?.ranges &&
                  val?.ranges.map((val1) => (
                    <div
                      style={{ padding: "0 5px", border: "1px solid black" }}
                    >
                      {val1?.min} - {val1?.max}
                    </div>
                  ))}
              </div>
            </div>
            )
          })}
        </div>
        <Modal show={show} onHide={handleClose} style={{marginTop: "100px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Add Update Price Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Min</Form.Label>{" "}
              <Form.Control
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                // onKeyDown={handleKeyDown}
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Max</Form.Label>{" "}
              <Form.Control
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                // onKeyDown={handleKeyDown}
                type="number"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>{" "}
              <Form.Select value={countryCode}  onChange={handleCountryChange}>
                <option value="" disabled selected>
                  Select Country
                </option>
                {/* {countryCodes.map((val) => (
                  <option value={val?.name}>{val?.name}</option>
                ))} */}
                {allCountries.map((country, index) => (
                  <option
                    key={index}
                    value={country.isoCode}
                    data-value={country.name}
                  >
                    {country.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
            {zipcodeArray &&
              zipcodeArray.map((val) => (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <div
                    onClick={() => handleRemoveZipCode(val)}
                    style={{
                      cursor: "pointer",
                      padding: "0 5px",
                      border: "1px solid black",
                    }}
                  >
                    {val}
                  </div>
                </OverlayTrigger>
              ))}
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PriceRange;
