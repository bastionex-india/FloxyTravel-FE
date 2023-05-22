import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
import Swal from "sweetalert2";
const UserLandingPage = () => {
  const [allStates, setAllStates] = useState([]);
  const [stateSelected, setStateSelected] = useState();
  const [stateId, setStateId] = useState();
  const { authData } = useContext(AuthContext);
  const [isPriorityChanged, setIsPriority] = useState(false);
  const [chosenState, setChosenState] = useState("");
  const [addStatePopUp, setAddStatePopUp] = useState(false);
  const [addThemePopUp, setAddThemePopUp] = useState(false);
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
  console.log(isPriorityChanged);
  const handlePriority = () => {
    axios({
      method: "put",
      url: `http://http://139.59.82.13:4000/:4000/admin/updatepriority/${stateId}`,
      data: themeData,
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
          url: `http://http://139.59.82.13:4000/:4000/auth/addimagesacctocities/${chosenState}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: formData,
          headers: { _token: authData.data.token },
        })
          .then((response) => {
            if (response?.data?.status) {
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
            console.log(err.message);
            Swal.fire("Error", "Something went wrong", "error");
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
      url: "http://http://139.59.82.13:4000/:4000/admin/getstatedata",
      headers: {
        _token: authData?.data?.token,
      },
    })
      .then((response) => {
        console.log(response.data.data[0].cityName, "subhan");
        setAllStates(response.data.data);
        setStateSelected(response?.data?.data[0].cityName);
        setStateId(response.data.data[0]._id);
        // allStates.forEach((val) => {
        // console.log(val.theme, "theme");
        //   setThemeData([...themeData, val.theme]);
        // });

        const newthemedata = allStates.filter(
          (val) => val?.cityName === stateSelected
        );

        setThemeData(newthemedata[0]?.theme);
      })
      .catch((err) => console.log(err.message));
  };

  const getBackgroundImage = () => {
    axios({
      method: "get",
      url: `http://http://139.59.82.13:4000/:4000/auth/getimagesacctocities/${stateSelected}`,
      headers: {
        _token: authData?.data?.token,
      },
    })
      .then((response) => setBackgroundImage(response.data.data.image))
      .catch((err) => console.log(err.message));
  };
  const addImage = (e) => {
    setFile(e.target.files);
  };

  const getThemes = () => {
    console.log(stateId);
    axios({
      method: "get",
      url: `http://http://139.59.82.13:4000/:4000/admin/getthemebystate/${stateId}`,
      headers: {
        _token: authData?.data?.token,
      },
    })
      .then((response) => {
        setThemeData(response.data.data);
        console.log(response.data.data, "sr");
      })
      .catch((err) => console.log(err.message));
  };

  const getThemesByState = (e) => {
    axios({
      method: "get",
      url: `http://http://139.59.82.13:4000/:4000/admin/getthemebystate/${e.target.id}`,
      headers: {
        _token: authData?.data?.token,
      },
    })
      .then((response) => {
        setThemeData(response.data.data);
      })
      .catch((err) => console.log(err.message));
  };

  const handleAddThemeSubmit = () => {
    if (!theme || !title || !description || !priority) {
      Swal.fire("Warning", "Please Fill all the data to continue", "warning");
      setAddThemePopUp(false);
    } else {
      axios({
        method: "put",
        url: `http://http://139.59.82.13:4000/:4000/admin/inserttheme/${stateSelected}`,
        data: {
          name: theme,
          heading: title,
          description: description,
          priority: priority,
        },
        headers: {
          _token: authData?.data?.token,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.status === true) {
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

  const handleDeleteThemePopUp = (e) => {
    setDeletePopUp(true);
    setThemeId(e.target.id);
  };
  const handleDeleteTheme = (e) => {
    axios({
      method: "delete",
      url: `http://http://139.59.82.13:4000/:4000/admin/deletetheme/${themeId}/${stateSelected}`,
      headers: {
        _token: authData?.data?.token,
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
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong!", "error");
        setThemeId(null);
        setDeletePopUp(false);
      });
  };
  const handleEditTheme = (e) => {
    const editTheme = themeData.filter((val) => val._id === e.target.id);
    console.log(editTheme[0], "edit");
    setTheme(editTheme[0].name);
    setTitle(editTheme[0].heading);
    setDescription(editTheme[0].description);
    setPriority(editTheme[0].priority);
    setAddThemePopUp(true);
  };
  useEffect(() => {
    getStatesData();
  }, []);
  useEffect(() => {
    getThemes();
  }, [stateId]);
  useEffect(() => {
    getBackgroundImage();
  }, [chosenState, stateSelected]);
  return (
    <Root>
      <MainHeading>User Landing Page</MainHeading>
      <StatesContainer>
        <StateHeading>States : </StateHeading>
        {addStatePopUp && (
          <AddStatePopUpContainer>
            <AddStatePopUp>
              <div
                style={{ textAlign: "center", color: "#fff", fontSize: "20px" }}
              >
                Add State
              </div>
              <AddStatePopUpCloseIcon
                onClick={() => setAddStatePopUp(false)}
                className="fa-solid fa-circle-xmark"
                style={{ color: "#fff", fontSize: "20px" }}
              />
              <AddStatePopUpInputContainer>
                <AddStatePopUpLabel>State* :</AddStatePopUpLabel>
                <AddStateInputSelect
                  onChange={(e) => setChosenState(e.target.value)}
                >
                  <option>Select State</option>
                  {stateData.map((val) => (
                    <option value={val.name}>{val.name}</option>
                  ))}
                </AddStateInputSelect>
              </AddStatePopUpInputContainer>
              <AddStatePopUpInputContainer>
                <AddStatePopUpLabel>Background Image* :</AddStatePopUpLabel>
                <AddStateFileInput onChange={(e) => addImage(e)} type="file" />
              </AddStatePopUpInputContainer>
              <AddStatePopUpInputContainer>
                <AddStatePopUpSubmitButton onClick={handleAddStateSubmit}>
                  Submit
                </AddStatePopUpSubmitButton>
              </AddStatePopUpInputContainer>
            </AddStatePopUp>
          </AddStatePopUpContainer>
        )}
        {addThemePopUp && (
          <AddThemePopUpContainer>
            <AddThemePopUp>
              <div
                style={{ color: "#fff", textAlign: "center", fontSize: "20px" }}
              >
                Add Theme
              </div>
              <AddStatePopUpCloseIcon
                onClick={() => setAddThemePopUp(false)}
                className="fa-solid fa-circle-xmark"
                style={{ color: "#fff", fontSize: "20px" }}
              />
              <AddThemeWrapper>
                <AddThemeInputWrapper>
                  <AddThemeLabel>Name* : </AddThemeLabel>
                  <AddThemePopUpSelect
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option>Select Theme Name</option>
                    <option value={`beach`}>Beach</option>
                    <option value={`wildlife`}>Wildlife</option>
                    <option value={`romantic`}>Romantic</option>
                    <option value={`hill`}>Hill</option>
                    <option value={`heritage`}>Heritage</option>
                  </AddThemePopUpSelect>
                </AddThemeInputWrapper>
                <AddThemeInputWrapper>
                  <AddThemeLabel>Title* : </AddThemeLabel>
                  <AddThemePopUpInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </AddThemeInputWrapper>
                <AddThemeInputWrapper>
                  <AddThemeLabel>Description* : </AddThemeLabel>
                  <AddThemePopUpTextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    cols="50"
                  />
                </AddThemeInputWrapper>
                <AddThemeInputWrapper>
                  <AddThemeLabel>Priority* : </AddThemeLabel>
                  <AddThemePriority
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    type="number"
                    min="1"
                    max="5"
                  />
                </AddThemeInputWrapper>
              </AddThemeWrapper>
              <ButtonWrapper>
                <AddStatePopUpSubmitButton onClick={handleAddThemeSubmit}>
                  Submit
                </AddStatePopUpSubmitButton>
              </ButtonWrapper>
            </AddThemePopUp>
          </AddThemePopUpContainer>
        )}
        {deletePopUp && (
          <DeletePopUpContainer>
            <DeletePopUp>
              <AddStatePopUpCloseIcon
                onClick={() => setDeletePopUp(false)}
                className="fa-solid fa-circle-xmark"
                style={{ color: "#fff", fontSize: "20px" }}
              />
              <DeletePopUpHeading>Delete Theme</DeletePopUpHeading>
              <DeletePopUpText>
                Are you sure you want to delete?
              </DeletePopUpText>
              <DeletePopUpButtonWrapper>
                <AddStatePopUpSubmitButton
                  onClick={(e) => handleDeleteTheme(e)}
                >
                  Yes
                </AddStatePopUpSubmitButton>
                <AddStatePopUpSubmitButton
                  onClick={() => setDeletePopUp(false)}
                >
                  No
                </AddStatePopUpSubmitButton>
              </DeletePopUpButtonWrapper>
            </DeletePopUp>
          </DeletePopUpContainer>
        )}
        <StatesWrapper>
          {allStates &&
            allStates.map((val) => (
              <StateOptions
                id={val._id}
                onClick={(e) => {
                  setStateSelected(val?.cityName);
                  setStateId(val?._id);
                  getThemesByState(e);
                }}
                selected={stateSelected == val.cityName}
              >
                {val.cityName}
              </StateOptions>
            ))}
        </StatesWrapper>
        <StateAddIcon
          onClick={() => setAddStatePopUp(true)}
          className="fa-solid fa-circle-plus"
          style={{ color: "#07515c" }}
        />
      </StatesContainer>
      <ThemeContainer>
        <StateHeading>Themes :</StateHeading>

        <StateAddIcon
          onClick={() => setAddThemePopUp(true)}
          className="fa-solid fa-circle-plus"
          style={{ color: "#07515c" }}
        />
      </ThemeContainer>
      <MainThemeContainer>
        <RecentlyDocumentHeader>
          <RecentlyDocumentHeaderElem>Name</RecentlyDocumentHeaderElem>
          <RecentlyDocumentHeaderElem>Title</RecentlyDocumentHeaderElem>
          <RecentlyDocumentHeaderElem>Description</RecentlyDocumentHeaderElem>
          <RecentlyDocumentHeaderElem>Actions</RecentlyDocumentHeaderElem>
        </RecentlyDocumentHeader>
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
                    <ThemeBoxElement>
                      <DeleteIcon
                        id={val?._id}
                        onClick={(e) => handleDeleteThemePopUp(e)}
                        className="fa-solid fa-trash"
                      />
                      <EditIcon
                        onClick={(e) => handleEditTheme(e)}
                        id={val?._id}
                        className="fa-solid fa-pen-to-square"
                      />
                    </ThemeBoxElement>
                  </RecentlyDocumentUploaded>
                );
              })}
        </ThemeCardWrapper>

        {/* <ThemeCardWrapper>
          {themeData &&
            themeData.map((val) => {
              return (
                // <ThemeCard>
                //   <ThemeNameIconWrapper>
                //     {" "}
                //     <ThemeName>{val?.name}</ThemeName>
                //     <div>
                //       {" "}
                //       <DeleteIcon
                //         id={val?._id}
                //         onClick={(e) => handleDeleteThemePopUp(e)}
                //         className="fa-solid fa-trash"
                //       />
                //       <EditIcon
                //         onClick={(e) => handleEditTheme(e)}
                //         id={val?._id}
                //         className="fa-solid fa-pen-to-square"
                //       />
                //     </div>
                //   </ThemeNameIconWrapper>
                //   <ThemeTitle>{val?.heading}</ThemeTitle>
                //   <ThemeDescription>{val?.description}</ThemeDescription>
                // </ThemeCard>
              );
            })}
        </ThemeCardWrapper> */}
        <PriorityButton isPriority={isPriorityChanged} onClick={handlePriority}>
          Save
        </PriorityButton>
      </MainThemeContainer>
      <BackgroundImageContainer>
        <StateHeading>Background Image : </StateHeading>
        <BackgroundImage
          src={`http://http://139.59.82.13:4000/:4000/uploadscitiesimages/${backgroundImage}`}
        />
      </BackgroundImageContainer>
    </Root>
  );
};

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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0;
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
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  color: #01575c;
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
  box-shadow: #000 2px 1px 1px 1px;
  width: 30vw;
  height: 30vh;
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
  box-shadow: #000 2px 1px 1px 1px;
  width: 42vw;
  height: 50vh;
  border-radius: 5px;
`;
const AddStatePopUp = styled.div`
  position: relative;
  background-color: #01575c;
  box-shadow: #000 2px 1px 1px 1px;
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
  width: 110px;
  padding: 5px 0;
  text-align: center;
  color: #fff;
  background-color: #333;
  border-radius: 50px;
`;

export const RecentlyDocumentHeader = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  margin: 5px 5%;
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
  justify-content: center;
  color: rgb(22 22 22);
  padding-left: 4px;
  font-weight: 600;
  font-size: 18px;
`;

export const RecentlyDocumentUploaded = styled.div`
  cursor: move;
  background: #fff;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  -webkit-box-align: center;
  align-items: center;
  margin: 10px 5%;
  padding: 14px 15px;
  box-shadow: 0px 0px 5px 5px #0000;
  border-radius: 5px;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const MainThemeContainer = styled.div``;
export const ThemeBoxElement = styled.div`
  display: flex;
  justify-content: center;
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
  float: right;
  margin: 10px 50px 0 0;
  padding: 5px 10px;
  color: #fff;
  background-color: ${(props) => (props.isPriority ? `#01565b` : `grey`)};
  border: 1px solid transparent;
  border-radius: 5px;
`;
export default UserLandingPage;
