import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import { environmentVariables } from "../../config/config";
import axios from "axios";
import { AuthContext } from "../../ContextApi/ContextApi";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FaComments, FaPlusCircle, FaRupeeSign } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Input, TextField, TextareaAutosize } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
  margin-bottom: 50px;
`;
const NavigationSecvtion = styled.div`
  color: #858585;
  margin-top: 20px;
`;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1%;
  margin-top: 2%;
`;
const DetailSection = styled.div`
  width: 100%;
  // background-color:red;
  display: flex;
  margin-top: 30px;
  padding: 10px;
`;
const IconWrapper = styled.div`
  cursor: pointer;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GetHotelByVendor = () => {
  const { state } = useLocation();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);
  const [showData, setShowData] = useState(false);
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [hotelCategory, setHotelCategory] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [general, setGeneral] = useState("");
  const [services, setServices] = useState("");
  const [internet, setInternet] = useState("");
  const [parking, setParking] = useState("");
  const [theme, setTheme] = useState([]);
  const [overview, setOverview] = useState("");
  const [multipleFiles, setMultipleFiles] = useState("");
  const [responseData, setResponseData] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [open, setOpen] = useState(false);

  const getData = async () => {
    await axios
      .get(
        `${environmentVariables.apiUrl}/auth/gethoteldetailbyvendorid/${state.vendorId}`,
        { headers: { _token: authData.data.token } }
      )
      .then((response) => {
        // console.log("response.data",response.data.data.hotels)
        setData(response.data.data.hotels);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const getHotels = (item) => {
    navigate("/gethotel", { state: item });
  };
  const saveData = () => {
    setShowData(!showData);
    // setKey1(key)
  };
  const editVendorData = () => {
    setShowData(!showData);
  };
  const deleteHotel = (item) => {
    // alert(item._id)
    axios
      .delete(`${environmentVariables.apiUrl}/auth/deletehotel/${item._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log(response.data.data);
        toast(response.data.data);
        // getAllUSers();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const addHotel = () => {
    alert("sssssss");
    // console.log()
  };
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
  };
  const handleClose = async (e) => {
    // alert("ddd")
    console.log(theme, "srrrr");
    e.preventDefault();
    // console.log("aaaaaaa",name,area,stateValue,cityValue,hotelCategory,totalRooms,general,services,internet,parking,overview,theme,multipleFiles,multipleFiles.length)
    const formdata = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      // console.log("aaaaaaaaaaaaaaaaaaaaaaaa",multipleFiles[i])
      formdata.append("myFiles", multipleFiles[i]);
    }
    formdata.append("hotelName", name);
    formdata.append("area", area);
    formdata.append("state", stateValue);
    formdata.append("city", cityValue);
    formdata.append("hotelCategory", hotelCategory);
    formdata.append("noOfRooms", totalRooms);
    formdata.append("general", general);
    formdata.append("services", services);
    formdata.append("internet", internet);
    formdata.append("parking", parking);
    formdata.append("overview", overview);
    for (let i = 0; i < theme.length; i++) {
      formdata.append(`theme[${i}]`, theme[i]);
    }
    formdata.append("lat", lat);
    formdata.append("long", long);
    formdata.append("hotelVendorId", state.vendorId);
    // formdata.append('email',authData.data.token)
    console.log("sssssss", formdata);
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/addhotely`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: formdata,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log("aaaaaaaaaaaasssssss", response.data);
        setResponseData(response.data);
        toast(response.data.message);
        setName("");
        setArea("");
        setStateValue("");
        setCityValue("");
        setHotelCategory("");
        setTotalRooms("");
        setGeneral("");
        setServices("");
        setInternet("");
        setParking("");
        setOverview("");
        setTheme([]);
        setLat("");
        setLong("");
        setMultipleFiles("");
        setOpen(false);
      })
      .catch((error) => {
        console.log("///////////////", error);
      });
  };
  const handleClose1 = () => {
    setOpen(false);
  };
  const callApi = (x) => {
    axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/auth/selectstateconutryadmin`,
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
  // console.log("aaaaaaaa",state.vendorId)
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

  return (
    <Root>
      <NavigationSecvtion>
        <b
          style={{ marginRight: "5px", cursor: "pointer", color: "#01575c" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Dashboard /
        </b>
        <b
          style={{ marginRight: "5px", cursor: "pointer", color: "#01575c" }}
          onClick={() => {
            navigate("/");
          }}
        >
          {state.name} /
        </b>
        <span style={{ cursor: "pointer" }}>Hotel List</span>
      </NavigationSecvtion>
      <DetailSection>
        <div style={{ marginLeft: "20px" }}>
          <span>Name</span>:&nbsp;&nbsp;
          {state.name}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <span>Email</span>:&nbsp;&nbsp;
          {state.email}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <span>Contact</span>:&nbsp;&nbsp;
          {state.mobile}
        </div>
        <div style={{ marginLeft: "20px" }}>
          <span>Id</span>:&nbsp;&nbsp;
          {state.vendorId}
        </div>
        {/* {
          !showData ?
          <div style={{marginLeft:'20px'}}>
            <span>Name</span>:&nbsp;&nbsp;
            {state.name}
          </div>:
        <TextField id="outlined-basic" type='text' label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)}/>
        }
        {
          !showData ?
          <div style={{marginLeft:'20px'}}>
            <span>Email</span>:&nbsp;&nbsp;
            {state.email}
          </div>:
        <TextField id="outlined-basic" type='email' label="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        }
        {
          !showData ?
          <div style={{marginLeft:'20px'}}>
            <span>Contact</span>:&nbsp;&nbsp;
            {state.mobile}
          </div>:
        <TextField id="outlined-basic" type='number' label="Contact" variant="outlined" value={contact} onChange={(e)=>setContact(e.target.value)}/>
        }
       
         */}
        &nbsp;&nbsp;
        {/* {
          showData ? <span style={{cursor:'pointer'}} onClick={()=>editVendorData()}>Save</span> : (
            <IconWrapper onClick={() =>{saveData()}}>
              <i className="fa-solid fa-pen-to-square"></i>
            </IconWrapper>
          )
        } */}
      </DetailSection>
      <Button onClick={handleClickOpen} style={{ color: "green" }}>
        Add Hotel
      </Button>
      <GridWrapper>
        {data &&
          data.map((item, key) => {
            return (
              item.active !== true && (
                <Card key={key}>
                  <CardHeader
                    action={
                      <IconButton onClick={() => deleteHotel(item)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                    title={item.hotelname}
                    subheader={item.city}
                  />
                  <CardMedia
                    component="img"
                    height="250"
                    image={`${environmentVariables.apiUrl}/uploads/${item.image[0]}`}
                    alt="Paella dish"
                    onClick={() => getHotels(item)}
                    style={{ cursor: "pointer" }}
                  />
                </Card>
              )
            );
          })}
        <ToastContainer />
      </GridWrapper>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add New Hotel"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Area"
                variant="outlined"
                required
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
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
                      {stateData.map((item, index) => {
                        return (
                          <MenuItem
                            value={item.name}
                            onClick={() => callApi(item.code)}
                            key={index}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
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
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={hotelCategory}
                      label="Hotel Category"
                      onChange={(e) => setHotelCategory(e.target.value)}
                    >
                      <MenuItem value="economy">Economy</MenuItem>
                      <MenuItem value="midrange">Mid Range</MenuItem>
                      <MenuItem value="luxury">Luxury</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  id="outlined-basic"
                  label="Total Rooms"
                  variant="outlined"
                  required
                  type="number"
                  value={totalRooms}
                  onChange={(e) => setTotalRooms(e.target.value)}
                />
              </div>
              <TextField
                id="outlined-basic"
                label="General"
                variant="outlined"
                required
                type="text"
                value={general}
                onChange={(e) => setGeneral(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Services"
                variant="outlined"
                required
                type="text"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Internet"
                variant="outlined"
                required
                type="text"
                value={internet}
                onChange={(e) => setInternet(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Parking"
                variant="outlined"
                required
                type="text"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
              />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder=" Overview..."
                style={{ width: 500, fontSize: 15 }}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Box style={{ width: "30%" }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-multiple-select-label"
                      id="demo-multiple-select"
                      multiple
                      value={theme}
                      label="Theme"
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event;
                        setTheme(
                          typeof value === "string" ? value.split(",") : value
                        );
                      }}
                    >
                      <MenuItem value="beach">Beach</MenuItem>
                      <MenuItem value="wildlife">Wildlife</MenuItem>
                      <MenuItem value="romantic">Romantic</MenuItem>
                      <MenuItem value="hill">Hill</MenuItem>
                      <MenuItem value="heritage">Heritage</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <input
                  type="file"
                  multiple
                  name="myFiles"
                  onChange={(e) => MultipleFileChange(e)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Lat"
                  variant="outlined"
                  required
                  type="text"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Long"
                  variant="outlined"
                  required
                  type="text"
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                />
                <Button onClick={getHotelLatLong}>Get location</Button>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={(e) => handleClose(e)}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Root>
  );
};

export default GetHotelByVendor;
