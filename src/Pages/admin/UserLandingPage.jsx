import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext, useAuth } from "../../ContextApi/ContextApi";
import { environmentVariables } from "../../config/config";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Link } from "@mui/material";
import { Modal } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { styled as newStyle } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { style } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useRef } from "react";

const Item = newStyle(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "120px",
  color: theme.palette.text.secondary,
}));

const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
`;
const BottomContainer = styled.div`
  background-color: white;
  padding: 16px 50px;
  // height: 160px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const BottomHeading = styled.div``;
const LocationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const FormLabel = styled.div`
  margin-top: 25px;
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
const Image = styled.img``;
const FormFileInput = styled.input`
  width: 100%;
  border-radius: 5px;
  height: 30px;
  margin: 10px 0 20px 0;
  border: 1px solid #c4c4c4;
`;

const BootstrapDialog = newStyle(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const UserLandingPage = () => {
  const fileInputRef = useRef(null);
  const [allStates, setAllStates] = useState([]);
  const [stateSelected, setStateSelected] = useState();
  const [stateId, setStateId] = useState();
  const { authData } = useAuth();
  const [isPriorityChanged, setIsPriority] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenState, setChosenState] = useState("");
  const [addStatePopUp, setAddStatePopUp] = useState(false);
  const [addThemePopUp, setAddThemePopUp] = useState(false);
  const [addImagePopUp, setAddImagePopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [themeId, setThemeId] = useState(null);
  const [themeData, setThemeData] = useState([]);
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [dragId, setDragId] = useState();
  const [priority, setPriority] = useState(null);
  const [file, setFile] = useState(null);
  const [selectNewBackground, setSelectNewBackground] = useState(null);
  const [selectedCityData, setSelectedCityData] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [allCountries, setAllCountries] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [allStatesForPromotion, setAllStatesForPromotion] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  function deleteConfirmation(e) {
    setThemeId(e.target.id);
    setDeletePopUp(true);
  }
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleClose = () => {
    setDeletePopUp(false);
  };
  function hideModal() {
    setShowModal(false);
  }
  const deleteRecord = () => {
    handleDeleteTheme();
  };
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

  const handleStateIdChange = (e) => {
    setStateSelected(e.target.value);
    const selectedOption = e.target.selectedOptions[0];
    setStateId(selectedOption.getAttribute("data-value"));
  };

  useEffect(() => {
    if (countryCode) {
      let config = {
        method: "post",
        url: `${environmentVariables.apiUrl}/admin/getstatesofcountry`,
        headers: { _token: authData?.token },
        data: { countryCode: countryCode },
      };
      axios
        .request(config)
        .then((response) => {
          setAllStatesForPromotion(response.data.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      let config = {
        method: "post",
        url: `${environmentVariables.apiUrl}/admin/getcitiesofcountry`,
        headers: { _token: authData?.token },
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
    }
  }, [countryCode, stateCode]);
  const deleteVendor = async (vendorId) => {
    await axios
      .delete(
        `${environmentVariables.apiUrl}/admin/deletevendor/${vendorId._id}`,
        {
          headers: { _token: authData.token },
        }
      )
      .then((response) => {
        setIsLoading(true);
        getThemes();
        setDeletePopUp(false);
        Swal.fire("Deleted", "Hotel Deleted Successfully", "success");
      })
      .catch((err) => {
        // console.log("error", err);
        setIsLoading(false);
        Swal.fire("Error", "Something went wrong", "error");
      });
  };
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

  const Themes = useState([
    "romantic",
    "heritage",
    "beach",
    "hill",
    "wildlife",
  ]);
  const handleDrag = (e) => {
    setDragId(e.currentTarget.id);
  };
  const handleDrop = (e) => {
    setIsPriority(true);

    const dragBox = themeData.find((box) => box._id === dragId);
    const dropBox = themeData.find((box) => box._id === e.currentTarget.id);

    const dragBoxOrder = dragBox.priority;
    const dropBoxOrder = dropBox.priority;

    const newBoxState = themeData.map((box) => {
      if (box._id === dragId) {
        box.priority = dropBoxOrder;
      }
      if (box._id === e.currentTarget.id) {
        box.priority = dragBoxOrder;
      }
      return box;
    });
    setThemeData(newBoxState);
  };
  // console.log(isPriorityChanged);
  const handlePriority = () => {
    if (isPriorityChanged === true) {
      axios({
        method: "put",
        url: `${environmentVariables.apiUrl}/admin/updatepriority/${stateId}`,
        data: themeData,
        headers: { _token: authData.token },
      })
        .then((response) => {
          // console.log(response);
          Swal.fire(
            "Priorities changed",
            "Successfully changed priorities of theme data",
            "success"
          );
        })
        .catch((err) => {
          // console.log(err.message);
          Swal.fire("Error", "Something went wrong", "error");
        });
    }
    setIsPriority(false);
  };
  const handleAddStateSubmit = () => {
    if (chosenState === "") {
      Swal.fire("Error", "State is not selected", "error");
      setAddStatePopUp(false);
    } else if (allStates.includes(chosenState)) {
      Swal.fire(
        "State already Exist",
        "The state you have selected is already exist",
        "warning"
      );
      setAddStatePopUp(false);
      return;
    } else {
      if (file) {
        const formData = new FormData();

        for (let i = 0; i < file.length; i++) {
          formData.append("myFile", file[i]);
        }
        axios({
          method: "post",
          url: `${environmentVariables.apiUrl}/admin/addimagesacctocities/${chosenState}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: formData,
          headers: { _token: authData.token },
        })
          .then((response) => {
            if (response?.data?.success) {
              Swal.fire(
                "State Inserted",
                "Successfully Inserted State and Image",
                "success"
              );
              setChosenState(null);
              setFile(null);
            } else {
              Swal.fire(
                "Error",
                "Please check again the Image you are inserting!",
                "error"
              );
              setChosenState(null);
              setFile(null);
            }
          })
          .catch((err) => {
            let errorMsg =
              err.response && err.response.data.message
                ? err.response.data.message
                : "Something went wrong";
            Swal.fire("Error", errorMsg, "error");
            setChosenState(null);
            setFile(null);
          });
        setAllStates([...allStates, chosenState]);
        setAddStatePopUp(false);
      } else {
        Swal.fire("Error", "Please add background image to continue", "error");
        setAddStatePopUp(false);
      }
    }
  };

  const getStatesData = () => {
    axios({
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getstatedata`,
      headers: {
        _token: authData?.token,
      },
    })
      .then((response) => {
        console.log("llllllllllla", response.data.data);
        setAllStates(response.data.data);
        setStateSelected(response?.data?.data[0].cityName);
        setStateId(response.data.data[0]._id);
        setIsLoading(false);
        // allStates.forEach((val) => {
        // console.log(val.theme, "theme");
        //   setThemeData([...themeData, val.theme]);
        // });

        const newthemedata = allStates.filter(
          (val) => val?.cityName === stateSelected
        );

        setThemeData(newthemedata[0]?.theme);
      })
      .catch((err) => {
        // console.log(err.message);
        setIsLoading(false);
      });
  };

  const getBackgroundImage = () => {
    axios({
      method: "get",
      url: `${environmentVariables.apiUrl}/auth/getimagesacctocities/${stateSelected}`,
      headers: {
        _token: authData?.token,
      },
    })
      .then((response) => {
        setSelectedCityData(response.data.data);
        setBackgroundImage(response.data.data.image);
      })
      .catch((err) => console.log(err.message));
  };
  const addImage = (e) => {
    setFile(e.target.files);
  };
  const setNewChangeImage = (e) => {
    setSelectNewBackground(e.target.files);
  };

  const getThemes = () => {
    console.log(stateId);
    axios({
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getthemebystate/${stateId}`,
      headers: {
        _token: authData?.token,
      },
    })
      .then((response) => {
        setThemeData(response.data.data);
        setIsLoading(false);
        console.log(response.data.data, "sr");
      })
      .catch((err) => {
        // console.log(err.message);
        setIsLoading(false);
      });
  };

  const getThemesByState = (e) => {
    axios({
      method: "get",
      url: `${environmentVariables.apiUrl}/admin/getthemebystate/${stateId}`,
      headers: {
        _token: authData?.token,
      },
    })
      .then((response) => {
        setThemeData(response.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleAddThemeSubmit = () => {
    if (!theme || !title || !description) {
      Swal.fire("Warning", "Please Fill all the data to continue", "warning");
      setAddThemePopUp(false);
    } else {
      axios({
        method: "put",
        url: `${environmentVariables.apiUrl}/admin/inserttheme/${stateSelected}`,
        data: {
          name: theme,
          heading: title,
          description: description,
        },
        headers: {
          _token: authData?.token,
        },
      })
        .then((response) => {
          // console.log(response);
          if (response.data.success === true) {
            setAddThemePopUp(false);
            setTheme(null);
            setTitle(null);
            setDescription(null);
            setPriority(null);
            Swal.fire(
              "Theme Added",
              "Successfully added the entered theme",
              "success"
            );
            getThemes();
          } else {
            setAddThemePopUp(false);
            setTheme(null);
            setTitle(null);
            setDescription(null);
            setPriority(null);
            Swal.fire("Error", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          setAddThemePopUp(false);
          setTheme(null);
          setTitle(null);
          setDescription(null);
          setPriority(null);
          Swal.fire("Error", "Something went wrong!", "error");
        });
    }
  };
  const handleEditThemeSubmit = () => {
    if (!theme || !title || !description) {
      Swal.fire("Warning", "Please Fill all the data to continue", "warning");
      setAddThemePopUp(false);
      setThemeId(null);
    } else {
      axios({
        method: "put",
        url: `${environmentVariables.apiUrl}/admin/updatetheme/${themeId}/${stateId}`,
        data: {
          name: theme,
          heading: title,
          description: description,
        },
        headers: {
          _token: authData?.token,
        },
      })
        .then((response) => {
          // console.log(response);
          if (response.data.success === true) {
            setAddThemePopUp(false);
            setTheme("");
            setThemeId(null);
            setTitle("");
            setDescription("");
            setPriority("");
            Swal.fire(
              "Theme Added",
              "Successfully added the entered theme",
              "success"
            );
            getThemes();
          } else {
            setAddThemePopUp(false);
            setTheme("");
            setTitle("");
            setDescription("");
            setPriority("");
            setThemeId(null);
            Swal.fire("Error", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          setAddThemePopUp(false);
          setTheme(null);
          setTitle(null);
          setDescription(null);
          setPriority(null);
          Swal.fire("Error", "Something went wrong!", "error");
        });
    }
  };

  const handleDeleteThemePopUp = (e) => {
    setDeletePopUp(true);
    setThemeId(e.target.id);
  };
  const handleDeleteTheme = (e) => {
    console.log(themeId, stateSelected);
    axios({
      method: "delete",
      url: `${environmentVariables.apiUrl}/admin/deletetheme/${themeId}/${stateSelected}`,
      headers: {
        _token: authData?.token,
      },
    })
      .then((response) => {
        if (response.status) {
          Swal.fire("Deleted", "Successfully Deleted the theme", "success");
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
        setThemeId(null);
        setDeletePopUp(false);
        getThemes();
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong!", "error");
        setThemeId(null);
        setDeletePopUp(false);
        getThemes();
      });
  };
  const handleEditTheme = (e) => {
    const editTheme = themeData.filter((val) => val._id === e.target.id);
    console.log(editTheme[0], "edit", e.target.id);
    setThemeId(e.target.id);
    setTheme(editTheme[0].name);
    setTitle(editTheme[0].heading);
    setDescription(editTheme[0].description);
  };
  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^A-Za-z]+/g, "");
    setDescription(sanitizedValue);
  };
  useEffect(() => {
    setIsLoading(true);
    getStatesData();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getThemes();
  }, [stateId, stateSelected]);
  useEffect(() => {
    getBackgroundImage();
  }, [chosenState, stateSelected]);
  const updateNewImage = async () => {
    if (selectNewBackground) {
      const formData = new FormData();
      for (let i = 0; i < selectNewBackground.length; i++) {
        formData.append("myFile", selectNewBackground[i]);
      }
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/admin/updateCityBackground/${selectedCityData._id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: formData,
        headers: { _token: authData.token },
      })
        .then((response) => {
          if (response?.data?.success) {
            // setBackgroundImage(response.data.data.image)
            getBackgroundImage();
            setSelectNewBackground(null);
            Swal.fire({
              icon: "success",
              title: "Background updated.",
              timer: "800",
            });
          } else {
            Swal.fire(
              "Error",
              "Please check again the Image you are inserting!",
              "error"
            );
            // setFile(null);
          }
        })
        .catch((err) => {
          let errorMsg =
            err.response && err.response.data.message
              ? err.response.data.message
              : "Something went wrong";
          Swal.fire("Error", errorMsg, "error");
          // setChosenState(null);
          // setFile(null);
        });
    } else {
      Swal.fire("Error", "Please add background image to continue", "error");
    }
  };
  const updateImageHandler = () => {
    updateNewImage();
  };
  useEffect(() => {
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
        // console.log(err);
      });
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("country", countryName);
    formData.append("state", stateName);
    formData.append("city", cityName);

    const config = {
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/uploadsactivitybanner`,
      headers: { _token: authData?.token },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        Swal.fire("Banner Inserted", "Successfully Inserted Image", "success");
      })
      .catch(function (error) {
        Swal.fire(
          "Error",
          "Please check again the Image you are inserting!",
          "error"
        );
      });
    setCountryName("");
    setStateName("");
    setCityName("");
    setSelectedFile(null);
  };
  return (
    <Root>
      <HeadingWrapper>
        <IconButton
          title="Back"
          onClick={() => navigate(-1)}
          size="small"
          sx={{
            backgroundColor: "#e1e1e1",
            color: "#01575c",
            marginTop: "4px",
          }}
        >
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <MainHeading>Manage State Landing Page</MainHeading>
      </HeadingWrapper>
      <StatesContainer>
        {/* <StateHeading>States : </StateHeading> */}

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add State
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Country*:{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={handleCountryChange}
                    id="inputGroupSelect01"
                  >
                    <option>Select Country</option>
                    {allCountries.map((country, index) => (
                      <option
                        key={index}
                        value={country.isoCode}
                        data-value={country.name}
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <label className="input-group-text" for="inputGroupSelect01">
                    State*:{" "}
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setChosenState(e.target.value)}
                    id="inputGroupSelect01"
                  >
                    <option>Select State</option>
                    {allStatesForPromotion.map((val, index) => {
                      return (
                        <FormOptions key={index} value={val.name}>
                          {val.name}
                        </FormOptions>
                      );
                    })}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" for="inputGroupFile01">
                    Background Image*:{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => addImage(e)}
                    id="inputGroupFile03"
                    aria-describedby="inputGroupFileAddon03"
                    aria-label="Upload"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleAddStateSubmit}
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel1">
                  Add Theme
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Name*:{" "}
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option>Select Theme Name</option>
                    <option value={`beach`}>Beach</option>
                    <option value={`wildlife`}>Wildlife</option>
                    <option value={`romantic`}>Romantic</option>
                    <option value={`hill`}>Hill</option>
                    <option value={`heritage`}>Heritage</option>
                    <option value={`yatch`}>Yatch</option>
                    <option value={`desert`}>Desert</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Title*:{" "}
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group">
                  <span className="input-group-text">Description*: </span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>

                {/* <br></br>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Priority*:{" "}
                  </span>
                  <input
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                  />
                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setTheme("");
                    setDescription("");
                    setTitle("");
                  }}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleAddThemeSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* iiuyuiyiu */}
        <div
          className="modal fade"
          id="staticBackdrop3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel2">
                  Edit Theme
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setTheme("");
                    setDescription("");
                    setTitle("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Name*:{" "}
                  </label>
                  <select
                    className="form-select"
                    id="inputGroupSelect01"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option>Select Theme Name</option>
                    <option value={`beach`}>Beach</option>
                    <option value={`wildlife`}>Wildlife</option>
                    <option value={`romantic`}>Romantic</option>
                    <option value={`hill`}>Hill</option>
                    <option value={`heritage`}>Heritage</option>
                    <option value={`yatch`}>Yatch</option>
                    <option value={`desert`}>Desert</option>
                  </select>
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Title*:{" "}
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="input-group">
                  <span className="input-group-text">Description*: </span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>

                {/* <br></br>

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Priority*:{" "}
                  </span>
                  <input
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                  />
                </div> */}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setTheme("");
                    setDescription("");
                    setTitle("");
                  }}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleEditThemeSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="staticBackdrop2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel2"></h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <BackgroundImage
                  style={{ width: "45rem" }}
                  src={`${environmentVariables.apiUrl}/uploadscitiesimages/${backgroundImage}`}
                />
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

        <SearchButtonWrapper>
          <StatesWrapper>
            <SelectState onChange={handleStateIdChange}>
              {/* <SelectOption>Select City</SelectOption> */}
              {allStates &&
                allStates.map((val, index) => (
                  <SelectOption
                    key={index}
                    value={`${val.cityName}`}
                    data-value={val._id}
                  >
                    {val.cityName}
                  </SelectOption>
                ))}
            </SelectState>
          </StatesWrapper>
          <div style={{ display: "flex", margin: "0px 15px" }}>
            {" "}
            <button
              type="button"
              style={{ marginRight: "1rem" }}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add State
            </button>
            <button
              type="button"
              style={{ marginRight: "1rem" }}
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop1"
            >
              Add Theme
            </button>
            {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop2"
          >
            View Background Image
          </button> */}
          </div>
        </SearchButtonWrapper>
      </StatesContainer>
      <div style={{ backgroundColor: "#fff", marginBottom: "10px" }}>
        {isLoading === true ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularLoader></CircularLoader>
          </div>
        ) : (
          <BacgroundContainer>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Item style={{ paddingTop: "35px" }}>
                  <h3>
                    {stateSelected
                      ? stateSelected.charAt(0).toUpperCase() +
                        stateSelected.slice(1)
                      : ""}
                  </h3>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  {backgroundImage ? (
                    <Image
                      height={100}
                      src={`${environmentVariables.apiUrl}/uploadscitiesimages/${backgroundImage}`}
                      style={{ width: "100%" }}
                    />
                  ) : null}
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item style={{ paddingTop: "35px" }}>
                  <Button
                    variant="contained"
                    component="label"
                    size="small"
                    startIcon={<WallpaperIcon />}
                  >
                    Change
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setNewChangeImage(e)}
                    />
                  </Button>
                  {selectNewBackground ? (
                    <>
                      <div>image selected </div>
                      <Button
                        color="secondary"
                        type="button"
                        variant="contained"
                        size="small"
                        onClick={() => updateImageHandler()}
                      >
                        update image
                      </Button>
                    </>
                  ) : null}
                </Item>
              </Grid>
            </Grid>
          </BacgroundContainer>
        )}
        <ThemeContainer>
          <StateHeading>Themes :</StateHeading>
        </ThemeContainer>
        <MainThemeContainer>
          <RecentlyDocumentHeader>
            <RecentlyDocumentHeaderElem>Name</RecentlyDocumentHeaderElem>
            <RecentlyDocumentHeaderElem>Title</RecentlyDocumentHeaderElem>
            <RecentlyDocumentHeaderElem>Description</RecentlyDocumentHeaderElem>
            <RecentlyDocumentHeaderElem style={{ justifyContent: "flex-end" }}>
              Actions
            </RecentlyDocumentHeaderElem>
          </RecentlyDocumentHeader>
          {isLoading === true ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularLoader></CircularLoader>
            </div>
          ) : (
            <ThemeCardWrapper>
              {themeData &&
                themeData
                  .sort((a, b) => a.priority - b.priority)
                  .map((val) => {
                    return (
                      <RecentlyDocumentUploaded
                        draggable={true}
                        id={val?._id}
                        onDragOver={(e) => e.preventDefault()}
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                      >
                        <ThemeBoxElement>{val?.name}</ThemeBoxElement>
                        <ThemeBoxElement>{val?.heading}</ThemeBoxElement>
                        <ThemeBoxElementDesc>{`${val?.description}`}</ThemeBoxElementDesc>
                        <ThemeBoxElement style={{ justifyContent: "flex-end" }}>
                          {/* <button type="button" class="btn">
                            <DeleteIcon
                              id={val?._id}
                              deleteConfirmation
                              onClick={(e) => {
                                deleteConfirmation(e);
                                
                              }}
                              classNameName="fa-solid fa-trash"
                            />
                          </button>
                          dfgdf
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <EditIcon
                              onClick={(e) => handleEditTheme(e)}
                              id={val?._id}
                              classNameName="fa-solid fa-pen-to-square"
                            />
                          </button> */}
                          <button type="button" class="btn">
                            <DeleteIcon
                              id={val?._id}
                              deleteConfirmation
                              onClick={(e) => {
                                deleteConfirmation(e);
                              }}
                              className="fa-solid fa-trash"
                            />
                          </button>
                          <button
                            type="button"
                            class="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop3"
                          >
                            <EditIcon
                              onClick={(e) => handleEditTheme(e)}
                              id={val?._id}
                              className="fa-solid fa-pen-to-square"
                            />
                          </button>
                        </ThemeBoxElement>
                        {/* <Modal show={showModal} onHide={hideModal}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete Confirmation</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div classNameName="alert alert-danger">
                              Are you sure you want to delete ?
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="default" onClick={hideModal}>
                              Cancel
                            </Button>
                            <Button
                              variant="danger"
                              id={val?._id}
                              onClick={() => handleDeleteTheme()}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal> */}
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={deletePopUp}
                        >
                          <BootstrapDialogTitle
                            id="customized-dialog-title"
                            onClose={handleClose}
                          >
                            Delete
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            <Typography gutterBottom>
                              Are you sure you want to delete?
                            </Typography>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteRecord()}
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </RecentlyDocumentUploaded>
                    );
                  })}
            </ThemeCardWrapper>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px 2%",
            }}
          >
            <PriorityButton
              isPriority={isPriorityChanged}
              onClick={handlePriority}
            >
              Save
            </PriorityButton>
          </div>
        </MainThemeContainer>
      </div>
      <BottomContainer>
        <BottomHeading>Promotion Banner</BottomHeading>
        <LocationWrapper>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "50%" }}>
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
            <div style={{ width: "25%", marginLeft: "10px" }}>
              <FormLabel>State*</FormLabel>
              <FormSelect onChange={handleStateChange}>
                <FormOptions>Select State</FormOptions>
                {allStatesForPromotion.map((val, index) => {
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
            <div style={{ width: "25%", marginLeft: "10px" }}>
              <FormLabel>City*</FormLabel>
              <FormSelect onChange={handleCityChange}>
                <FormOptions>Select City</FormOptions>
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
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <div style={{ width: "95%" }}>
              <FormLabel>Banner*</FormLabel>
              <FormFileInput
                type="file"
                multiple
                name="myFiles"
                onChange={(e) => handleChange(e)}
                ref={fileInputRef}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <PriorityButton onClick={handleUpload} style={{}}>
                Save
              </PriorityButton>
            </div>
          </div>
        </LocationWrapper>
      </BottomContainer>
    </Root>
  );
};

const ThemeNameIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeadingWrapper = styled.div`
  position: relative;
  display: -webkit-box;
  // display: flex;
  // justify-content: center;
  // align-items: center;
`;
const DeleteIcon = styled.i`
  color: #07515c;
  margin-right: 20px;
  cursor: pointer;
`;

const EditIcon = styled.i`
  color: #07515c;
  cursor: pointer;
`;

const BackgroundImageContainer = styled.div`
  padding: 20px 0;
`;

const AddThemePopUpInput = styled.input`
  padding: 4px;
  border-radius: 5px;
  width: 500px;
`;
const AddThemePopUpSelect = styled.select`
  padding: 4px;
  border-radius: 5px;
  width: 500px;
`;
const AddThemePopUpTextArea = styled.textarea`
  padding: 4px;
  border-radius: 5px;
  width: 450px;
`;

const AddThemePriority = styled.input`
  width: 75%;
  border-radius: 5px;
  padding: 4px;
`;

const AddThemeLabel = styled.div`
  color: #fff;
`;

const AddThemeInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const AddThemeWrapper = styled.div`
  padding: 10px;
  margin-top: 30px;
`;

const BackgroundImage = styled.img`
  width: 40vw;
  margin: 40px 20px;
`;
const ThemeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  margin: 0 2%;
  padding-bottom: 0;
`;
const BacgroundContainer = styled.div`
  // padding: 20px 0;
  margin: 0 2%;
`;

const ThemeCardWrapper = styled.div`
  /* width: 80%; */
  display: flex;
  /* grid-template-columns: auto auto; */
  flex-direction: column;
`;

const ThemeCard = styled.div`
  width: 25vw;
  height: 30vh;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #01575c;
  border-radius: 5px;
`;

const ThemeName = styled.div`
  color: #01575c;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ThemeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ThemeDescription = styled.div`
  overflow: scroll;
  height: 60%;
`;

const Root = styled.div`
  padding: 20px;
`;

const MainHeading = styled.div`
  font-size: 1.75rem;
  padding-left: 40px;
  color: #000;
  // margin: 0 5% 10px 5%;
`;

const StatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  margin: 0;
  /* margin-bottom: 40px; */
`;

const StateHeading = styled.div`
  font-size: 20px;
  color: #01575c;
  font-weight: 500;
`;
const StatesWrapper = styled.div`
  display: flex;
  /* width: 31vw; */
  height: 40px;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const StateOptions = styled.div`
  font-size: 20px;
  text-transform: capitalize;
  cursor: pointer;
  border: 1px solid #01575c;
  padding: 4px 10px;
  margin-bottom: 10px;
  margin-right: 4px;
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#01575c" : "transparent")};
  color: ${(props) => (props.selected ? "#fff" : "#000")};
`;
const SelectState = styled.select`
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  padding: 0 10px;
`;
const SelectOption = styled.option`
  font-size: 14px;
`;
const StateAddIcon = styled.i`
  cursor: pointer;
  font-size: 20px;
`;
const DeletePopUpContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 99999;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeletePopUp = styled.div`
  position: relative;
  background-color: #01575c;
  margin: auto;
  /* box-shadow: #000 2px 1px 1px 1px; */
  /* width: 30vw; */
  /* height: 30vh; */
  border-radius: 5px;
`;

const DeletePopUpHeading = styled.div`
  color: #fff;
  text-align: center;
  font-size: 20px;
  padding: 20px 0;
`;
const DeletePopUpText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 16px;
  margin: 0 40px;
`;
const DeletePopUpButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 40px;
`;

const AddStatePopUpContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 99999;
  backdrop-filter: blur(2px);
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddThemePopUpContainer = styled.div`
  position: fixed;
  backdrop-filter: blur(2px);
  top: 0;
  z-index: 99999;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddThemePopUp = styled.div`
  position: relative;
  background-color: #01575c;
  margin: auto;
  /* box-shadow: #000 2px 1px 1px 1px; */
  /* width: 42vw; */
  /* height: 50vh; */
  border-radius: 5px;
`;
const AddStatePopUp = styled.div`
  position: relative;
  background-color: #01575c;
  box-shadow: #000 2px 2px 4px 3px;
  margin: auto;
  /* width: 42vw; */
  /* height: 34vh; */
  border-radius: 5px;
`;

const AddStatePopUpHeading = styled.div`
  font-size: 20px;
`;

const AddButton = styled.div`
  background-color: #01575c;
  height: 40px;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 700;
  margin-left: 20px;
  cursor: pointer;
`;

const AddStatePopUpCloseIcon = styled.i`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  cursor: pointer;
`;

const AddStatePopUpInputContainer = styled.div`
  display: flex;
  padding: 30px 50px 0px;
  justify-content: space-between;
`;

const AddStatePopUpLabel = styled.div`
  color: #fff;
  font-size: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AddStateInputSelect = styled.select`
  border-radius: 5px;
  width: 110px;
  padding: 3px;
  margin-left: 20px;
  width: 450px;
`;

const AddStateFileInput = styled.input`
  padding: 3px;
  margin-left: 20px;
  color: #fff;
  background-color: #659297;
  width: 450px;
  border-radius: 5px;
`;

const AddStatePopUpSubmitButton = styled.div`
  cursor: pointer;
  /* width: 110px;
  padding: 5px 0;
  text-align: center;
  color: #fff;
  background-color: #333;
  border-radius: 50px; */
  background-color: #fff;
  height: 40px;
  font-size: 14px;
  color: #01565c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 700;
  margin-bottom: 20px;
  /* margin-left:20px; */
`;

export const RecentlyDocumentHeader = styled.div`
  display: flex;
  margin: 5px 2%;
  justify-content: space-between;
  padding: 0px 15px;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const RecentlyDocumentHeaderElem = styled.div`
  /* color: #6c7074;
  padding-left: 4px;
  font-weight: 600;
  display: flex;
  justify-content: center; */
  display: flex;
  justify-content: flex-start;
  color: rgb(22 22 22);
  width: 300px;
  /* padding-right: 150px; */
  font-weight: 500;
  font-size: 16px;
`;

export const RecentlyDocumentUploaded = styled.div`
  cursor: move;
  background: #fff;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-between;
  margin: 10px 2%;
  padding: 14px 15px;
  border: 1px solid #b8b8b8;
  // padding-right: 0;
  /* box-shadow: 2px 2px 4px 1px #000; */
  border-radius: 5px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const MainThemeContainer = styled.div``;
export const ThemeBoxElement = styled.div`
  display: flex;
  justify-content: flex-start;
  /* padding-right: 150px; */
  width: 300px;
`;
export const ThemeBoxElementDesc = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 70px;
  width: 300px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const PriorityButton = styled.div`
  cursor: ${(props) => (props.isPriority ? "pointer" : "default")};
  background-color: ${(props) => (props.isPriority ? `#01565b` : `grey`)};
  /* background-color: #01575c; */
  height: 40px;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  border-radius: 5px;
  font-weight: 700;
  margin-left: 20px;
  margin-bottom: 10px;
  /* cursor: pointer; */
`;
export default UserLandingPage;
