import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

import { environmentVariables } from "../../config/config";
import { Modal, Button } from "react-bootstrap";

const UserLandingPageHome = () => {
  const [isPriorityChanged, setIsPriority] = useState(false);
  const [addThemePopUp, setAddThemePopUp] = useState(false);
  const [themeId, setThemeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(null);
  const [title, setTitle] = useState(null);
  const [allData, setAllData] = useState();
  const { authData } = useContext(AuthContext);
  const [priority, setPriority] = useState();
  const [dragId, setDragId] = useState();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [cityData, setCityData] = useState();
  const [city, setCity] = useState(null);
  const [showModal,setShowModal] = useState(false);

  const navigate = useNavigate();

  const getPopularCities = () => {
    axios
      .get(`${environmentVariables.apiUrl}/auth/getnameofcity`)
      .then((res) => {
        setCityData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handlePriority = () => {
    axios({
      method: "put",
      url: `${environmentVariables.apiUrl}/admin/updateprioritycitybyid`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        console.log(response);
        Swal.fire(
          "Priorities changed",
          "Successfully changed priorities of theme data",
          "success"
        );
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire("Error", "Something went wrong", "error");
      });
    setIsPriority(false);
  };
  const getAllData = () => {
    axios
      .get(`${environmentVariables.apiUrl}/admin/prioritydata`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log("response.data", response.data.data);
        setAllData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };
  const handleDeletePopUp = (e) => {
    setDeletePopUp(true);
    setThemeId(e.target.id);
  };
  const handleEditPopUp = (e) => {
    const editCity = allData.filter((val) => val._id === e.target.id);
    setThemeId(e.target.id);
    console.log(editCity[0]);
    setTitle(editCity[0]?.title);
    setCity(editCity[0]?.city);
    setTheme(editCity[0]?.theme);
    setAddThemePopUp(true);
  };

  const handleDeleteData = () => {
    
    axios({
      method: "delete",
      url: `${environmentVariables.apiUrl}/admin/deleteprioritybyid/${themeId}`,
      headers: {
        _token: authData?.data?.token,
      },
    })
      .then((response) => {
        if (response.status) {
          Swal.fire("Deleted", "Successfully Deleted the City Data", "success");
          getAllData();
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
        setThemeId(null);
        setShowModal(false);
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong!", "error");
        setThemeId(null);
        setDeletePopUp(false);
      });
  };
  const handleAddData = () => {
    if (theme !== null && city !== null && title !== null) {
      const url =
        themeId === null
          ? `${environmentVariables.apiUrl}/admin/postpriority`
          : `${environmentVariables.apiUrl}/admin/updateprioritybyid/${themeId}`;
      const method = themeId === null ? "post" : "put";
      const cityData = {
        city,
        title,
        theme,
      };
      axios({
        method: method,
        url: url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: cityData,
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          if (response?.data?.status) {
            getAllData();
            Swal.fire(
              `City ${themeId === null ? "Inserted" : "Updated"}`,
              `Successfully ${
                themeId === null ? "Inserted" : "Updated"
              } city on homepage`,
              "success"
            );
          } else {
            Swal.fire(
              "Error",
              "Please check again the values you are inserting!",
              "error"
            );
          }
        })
        .catch((err) => {
          console.log(err.message);
          Swal.fire("Error", "Something went wrong", "error");
        });
    } else {
      Swal.fire("Warning", "Please enter all the data!", "warning");
    }
    setAddThemePopUp(false);
    setThemeId(null);
    setTheme(null);
    setCity(null);
    setTitle(null);
  };
  useEffect(() => {
    setIsLoading(true);
    getPopularCities();
    getAllData();
  }, []);
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

    const dragBox = allData.find((box) => box._id === dragId);
    const dropBox = allData.find((box) => box._id === e.currentTarget.id);

    const dragBoxOrder = dragBox.priority;
    const dropBoxOrder = dropBox.priority;

    const newBoxState = allData.map((box) => {
      if (box._id === dragId) {
        box.priority = dropBoxOrder;
      }
      if (box._id === e.currentTarget.id) {
        box.priority = dragBoxOrder;
      }
      return box;
    });
    setAllData(newBoxState);
  };

  function deleteConfirmation(e)
  {
    setThemeId(e.target.id);
    setShowModal(true);
  }

  function hideModal()
  {
    setShowModal(false);
  }
  return (
    <Root>
      <Button variant="outlined" onClick={() => navigate(-1)} type="button"> <i className="fa-solid fa fa-arrow-circle-left"
                ></i> Back</Button>
      <MainHeading>Manage Home Landing Page</MainHeading>
      <div style={{ backgroundColor: "#fff", marginBottom: "10px" }}>
        {" "}
        <ThemeContainer>
          <StateHeading>Hotel Card Sections :</StateHeading>

          {/* <AddButton onClick={() => setAddThemePopUp(true)}>
            Add Hotel Card Sections
          </AddButton> */}
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Hotel Card Sections
          </button>
          {/* <StateAddIcon
          onClick={() => setAddThemePopUp(true)}
          className="fa-solid fa-circle-plus"
          style={{ color: "#07515c" }}
        /> */}
        </ThemeContainer>
        <RecentlyDocumentHeader>
          <RecentlyDocumentHeaderElem>City Name</RecentlyDocumentHeaderElem>
          <RecentlyDocumentHeaderElem>Title</RecentlyDocumentHeaderElem>
          <RecentlyDocumentHeaderElem>Theme</RecentlyDocumentHeaderElem>
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
            {allData &&
              allData
                .sort((a, b) => a.priority - b.priority)
                .map((val) => (
                  <RecentlyDocumentUploaded
                    draggable={true}
                    id={val?._id}
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                  >
                    <ThemeBoxElement>{val?.city}</ThemeBoxElement>
                    <ThemeBoxElement>{val?.title}</ThemeBoxElement>
                    <ThemeBoxElement>{val?.theme}</ThemeBoxElement>
                    <ThemeBoxElement style={{ justifyContent: "flex-end" }}>
                      <button type="button" class="btn">
                      <DeleteIcon
                        id={val?._id}
                        onClick={(e) => deleteConfirmation(e)}
                        className="fa-solid fa-trash"
                      />
                      </button>
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <EditIcon
                        onClick={(e) => handleEditPopUp(e)}
                        id={val?._id}
                        className="fa-solid fa-pen-to-square"
                        
                      />
                      </button>
                      <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className="alert alert-danger">Are you sure you want to delete ?</div></Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={hideModal}>
                Cancel
              </Button>
              <Button variant="danger" id={val?._id} onClick={() => handleDeleteData()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
                      {/* <EditIcon
                        onClick={(e) => handleEditPopUp(e)}
                        id={val?._id}
                        className="fa-solid fa-pen-to-square"
                        
                      /> */}
                    </ThemeBoxElement>
                  </RecentlyDocumentUploaded>
                ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 5%",
              }}
            >
              <PriorityButton
                isPriority={isPriorityChanged}
                onClick={handlePriority}
              >
                Save
              </PriorityButton>
            </div>
          </ThemeCardWrapper>
        )}
      </div>
  
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{`${themeId === null ? "Add" : "Edit"} Section`}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">City Name* :</label>
  <select class="form-select" id="inputGroupSelect01"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  >
    <option>Select City Name</option>
                  {cityData &&
                    cityData.map((val) => (
                      <option value={val.city}>{val.city}</option>
                    ))}
  </select>
</div>

<div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Theme Name* : </label>
  <select class="form-select" id="inputGroupSelect01"
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  >
    <option>Select Theme Name</option>
                  <option value={`All`}>All</option>
                  <option value={`Beach`}>Beach</option>
                  <option value={`Wildlife`}>Wildlife</option>
                  <option value={`Romantic`}>Romantic</option>
                  <option value={`Hill`}>Hill</option>
                  <option value={`Heritage`}>Heritage</option>
  </select>
</div>
      
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Title* : </span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  />
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={handleAddData}>Submit</button>
      </div>
    </div>
  </div>
</div>
      {/* {addThemePopUp && (
    
        <AddThemePopUpContainer style={{border: 'black'}} >
          <AddThemePopUp style={{backgroundColor: '#E3FAEE'}}> 
            <div
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "20px",
                marginTop: "20px",
              }}
            >
              {console.log(themeId)}
              {`${themeId === null ? "Add" : "Edit"} Section`}
            </div>
            <AddStatePopUpCloseIcon
              onClick={() => {
                setAddThemePopUp(false);
                setThemeId(null);
                setTheme(null);
                setCity(null);
                setTitle(null);
              }}
              className="fa-solid fa-circle-xmark"
              style={{ color: "black", fontSize: "20px" }}
            />
            <AddThemeWrapper>
              <AddThemeInputWrapper>
                <AddThemeLabel style={{color: 'black'}}>City Name* : </AddThemeLabel>
                <AddThemePopUpSelect
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option>Select City Name</option>
                  {cityData &&
                    cityData.map((val) => (
                      <option value={val.city}>{val.city}</option>
                    ))}
                </AddThemePopUpSelect>
              </AddThemeInputWrapper>{" "}
              <AddThemeInputWrapper>
                <AddThemeLabel style={{color: 'black'}}>Theme Name* : </AddThemeLabel>
                <AddThemePopUpSelect
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option>Select Theme Name</option>
                  <option value={`All`}>All</option>
                  <option value={`Beach`}>Beach</option>
                  <option value={`Wildlife`}>Wildlife</option>
                  <option value={`Romantic`}>Romantic</option>
                  <option value={`Hill`}>Hill</option>
                  <option value={`Heritage`}>Heritage</option>
                </AddThemePopUpSelect>
              </AddThemeInputWrapper>
              <AddThemeInputWrapper>
                <AddThemeLabel style={{color: 'black'}}>Title* : </AddThemeLabel>
                <AddThemePopUpInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </AddThemeInputWrapper>
            </AddThemeWrapper>
            <ButtonWrapper>
              <AddButton
                
                onClick={handleAddData}
              >
                Submit
              </AddButton>
            </ButtonWrapper>
          </AddThemePopUp>
        </AddThemePopUpContainer>
      )} */}
      {deletePopUp && (
        <DeletePopUpContainer >
          <DeletePopUp style={{backgroundColor: 'white'}}>
            <AddStatePopUpCloseIcon
              onClick={() => setDeletePopUp(false)}
              className="fa-solid fa-circle-xmark"
              style={{ color: "black", fontSize: "20px" }}
            />
            <DeletePopUpHeading>Delete Theme</DeletePopUpHeading>
            <DeletePopUpText>Are you sure you want to delete?</DeletePopUpText>
            <DeletePopUpButtonWrapper>
              <AddStatePopUpSubmitButton onClick={() => handleDeleteData()}>
                Yes
              </AddStatePopUpSubmitButton>
              <AddStatePopUpSubmitButton onClick={() => setDeletePopUp(false)}>
                No
              </AddStatePopUpSubmitButton>
            </DeletePopUpButtonWrapper>
          </DeletePopUp>
        </DeletePopUpContainer>
      )}




    </Root>
  );
};

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
const ThemeNameIconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 75%;
`;
const AddThemePopUpSelect = styled.select`
  padding: 4px;
  border-radius: 5px;
  width: 75%;
`;
const AddThemePopUpTextArea = styled.textarea`
  padding: 4px;
  border-radius: 5px;
  width: 75%;
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
  width: 100%;
  margin-top: 40px;
`;
const ThemeContainer = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0; */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
  margin: 0 5%;
  padding-bottom: 0;
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
  /* font-size: 30px;
  font-weight: 500;
  text-align: center;
  color: #01575c; */
  font-size: 1.75rem;
  /* font-weight: 500; */
  /* text-align: center; */
  color: #000;
  margin: 0 5% 10px 5%;
`;

const StatesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
`;

const StateHeading = styled.div`
  font-size: 20px;
  color: #01575c;
  font-weight: 500;
`;
const StatesWrapper = styled.div`
  display: flex;
  width: 80%;
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
  top: 0;
  backdrop-filter: blur(2px);
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
  width: 42vw;
  // height: 50vh;
  border-radius: 5px;
`;
const AddStatePopUp = styled.div`
  position: relative;
  background-color: #01575c;
  /* box-shadow: #000 2px 1px 1px 1px; */
  margin: auto;
  width: 42vw;
  height: 34vh;
  border-radius: 5px;
`;

const AddStatePopUpHeading = styled.div`
  font-size: 20px;
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
`;

const AddStatePopUpLabel = styled.div`
  color: #fff;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const AddStateInputSelect = styled.select`
  border-radius: 5px;
  width: 110px;
  padding: 3px;
  margin-left: 20px;
`;

const AddStateFileInput = styled.input`
  padding: 3px;
  margin-left: 20px;
  color: #fff;
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
  margin: 5px 5%;
  justify-content: space-between;
  padding: 14px 15px;
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
  width: 200px;
  /* padding-left: 4px; */
  font-weight: 600;
  font-size: 18px;
`;

export const RecentlyDocumentUploaded = styled.div`
  cursor: move;
  background: #fff;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin: 10px 5%;
  padding: 14px 15px;
  border: 1px solid #b8b8b8;
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
  width: 200px;
`;
export const ThemeBoxElementDesc = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
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
`;
export default UserLandingPageHome;
