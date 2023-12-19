import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
// import PauseIcon from '@mui/icons-material/Pause';
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Image } from "react-bootstrap";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";
// import IconButton from '@mui/icons-material/IconButton';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReactBootstrapButton from "react-bootstrap/Button";
import ReactBootstrapForm from "react-bootstrap/Form";
import CancelIcon from "@mui/icons-material/Cancel";
import Avtar from "../../../Images/avatar.png";
import { useContext } from "react";
import { AuthContext } from "../../../ContextApi/ContextApi";
import { environmentVariables } from "../../../config/config";

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
`;
const Heading = styled.div`
  color: #012e31;
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
`;
const Container = styled.div`
  // background-color: grey;
  border-radius: 10px;
  // box-shadow: -6.1px 3.5px 27px 0 rgb(0 0 0 / 10%);
  margin-top: 50px;
  margin-bottom: 100px;
  height: 300px;
`;
const DivSection = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: -6.1px 3.5px 27px 0 rgb(0 0 0 / 10%);
  margin-top: 70px;
`;
const CustomButton = styled.button`
  color: #fff;
  padding: 9px 0px;
  border: none;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  width: 75px;
  border-radius: 5px;
`;
const UserImg = styled.img``;

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [parentItem, setParentItem] = useState("");
  const [keyValueOfParent, setKeyValueOfParent] = useState("");
  const [subRows, setSubRows] = useState("");
  const [subIds, setSubIds] = useState("");
  const [Ids, setIds] = useState("");
  const [commentText, setCommentText] = useState("");

  const [state, setState] = useState({ right: false });

  useEffect(() => {
    otherProps.subData &&
      otherProps.subData.map((item) => {
        if (keyValueOfParent === Number(item.key)) {
          setSubRows((current) => [...current, item]);
        }
      });
  }, [parentItem, keyValueOfParent]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const submit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${environmentVariables?.apiUrl}/auth/addcomments`,
      data: { id: Ids._id, commentText: commentText },
    })
      .then((response) => {
        toast(response.data.data);
        otherProps.getData();
        setCommentText("");
      })
      .catch((error) => {
        console.log(error);
        // toast("Something Went wrong")
      });
  };
  const list = (anchor, item) => {
    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 650 }}
        role="presentation"
      >
        <Root>
          <Container>
            <h5 onClick={toggleDrawer(anchor, false)}>
              {" "}
              <CancelIcon
                style={{ color: "#01575c", cursor: "pointer" }}
              />{" "}
            </h5>
            <Heading> {Ids.taskname} </Heading>
            <ReactBootstrapForm>
              <ReactBootstrapForm.Group
                className="mb-3"
                controlId="formBasicEmail"
              >
                <ReactBootstrapForm.Control
                  as="textarea"
                  rows={6}
                  placeholder="Write an update..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </ReactBootstrapForm.Group>
              <ReactBootstrapButton
                type="submit"
                style={{ backgroundColor: "#01575c", float: "right" }}
                onClick={submit}
              >
                Submit
              </ReactBootstrapButton>
            </ReactBootstrapForm>
            {Ids.taskComments &&
              Ids.taskComments.map((item, key) => {
                return <DivSection key={key}>{item}</DivSection>;
              })}
          </Container>
          <ToastContainer />
        </Root>
      </Box>
    );
  };
  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton
            onClick={() => {
              setIsExpanded(!isExpanded);
              setParentItem(otherProps.itemValue);
              setKeyValueOfParent(otherProps.keyValue);
            }}
          >
            {isExpanded ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <>
          <TableRow style={{ fontSize: "50px" }}>
            <TableCell></TableCell>
            <TableCell style={{ fontSize: "15px", fontWeight: "600" }}>
              SubTask
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Files
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned To
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned By
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned Date
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Due Date
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600", width: "10%" }}
            >
              Time Taken
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Testing
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Approval
            </TableCell>
          </TableRow>

          <>
            {subRows &&
              subRows.map((item, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell></TableCell>
                    <TableCell>
                      {item.taskname}
                      {["right"].map((anchor) => (
                        <React.Fragment key={anchor}>
                          <Button
                            onClick={toggleDrawer(anchor, true)}
                            style={{ float: "right" }}
                          >
                            <ChatBubbleOutlineIcon
                              style={{ color: "#01575c" }}
                              onClick={() => setIds(item)}
                            />
                          </Button>
                          <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                          >
                            {list(anchor, item)}
                          </Drawer>
                        </React.Fragment>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {item.myFile === undefined || item.myFile === null ? (
                        <span>No image</span>
                      ) : (
                        <Image
                          src={`/uploads/${item.myFile}`}
                          style={{
                            height: "30px",
                            width: "30px",
                            cursor: "pointer",
                          }}
                          alt="image"
                          onClick={() =>
                            window.open(`/uploads/${item.myFile}`, "_blank")
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {otherProps.employees &&
                        otherProps.employees.map((employee, index) => {
                          if (employee.email === item.assignedTo) {
                            return (
                              <MenuItem
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                key={index}
                              >
                                {employee?.profile ? (
                                  <Image
                                    src={`/uploads/${employee?.profile}`}
                                    style={{ height: "30px", width: "30px" }}
                                    roundedCircle
                                    alt="image"
                                  />
                                ) : (
                                  <UserImg
                                    src={Avtar}
                                    alt="hello"
                                    style={{ height: "30px", width: "30px" }}
                                  />
                                )}
                                &nbsp;
                                <span>
                                  {employee.firstName + employee.lastName}
                                </span>
                              </MenuItem>
                            );
                          }
                        })}
                    </TableCell>
                    <TableCell align="center">
                      {otherProps.tl &&
                        otherProps.tl.map((tl, index) => {
                          if (tl.email === item.assignedBy) {
                            return (
                              <MenuItem
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                key={index}
                              >
                                {tl?.profile ? (
                                  <Image
                                    src={`/uploads/${tl?.profile}`}
                                    style={{ height: "30px", width: "30px" }}
                                    roundedCircle
                                    alt="image"
                                  />
                                ) : (
                                  <UserImg
                                    src={Avtar}
                                    alt="hello"
                                    style={{ height: "30px", width: "30px" }}
                                  />
                                )}
                                &nbsp;
                                <span>{tl.firstName + tl.lastName}</span>
                              </MenuItem>
                            );
                          }
                        })}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.assignedDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.dueDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">{item.timeTaken}</TableCell>
                    <TableCell align="center">
                      <CustomButton
                        style={{
                          backgroundColor:
                            item?.testing === "Done"
                              ? "green"
                              : item?.testing === "Working on it"
                              ? "orange"
                              : item?.testing === "Stuck"
                              ? "red"
                              : "none",
                          padding: "8px",
                        }}
                      >
                        {item?.testing}
                      </CustomButton>
                    </TableCell>
                    <TableCell align="center">
                      <CustomButton
                        style={{
                          backgroundColor:
                            item?.approval === "Done"
                              ? "green"
                              : item?.approval === "Working on it"
                              ? "orange"
                              : item?.approval === "Stuck"
                              ? "red"
                              : "none",
                          padding: "8px",
                        }}
                      >
                        {item?.approval}
                      </CustomButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </>
          <TableRow>
            <TableCell padding="checkbox" />
            {expandComponent}
          </TableRow>
        </>
      )}
    </>
  );
};
const ITTask = (props) => {
  const { authData } = useContext(AuthContext);
  const [allData, setAllData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [employees, setEmployees] = useState("");
  const [tl, setTl] = useState("");

  const getData = () => {
    setAllData([]);
    setSubData([]);
    axios
      .get(`${environmentVariables?.apiUrl}/auth/getsoftwaredevelopmettasks`, {
        headers: { _token: authData.data.token.token },
      })
      .then((res) => {
        res.data.message &&
          res.data.message.map((item) => {
            if (item.isSubTask === undefined) {
              setAllData((current) => [...current, item]);
              // setAllData(item);
            } else {
              setSubData((current) => [...current, item]);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();

    axios
      .get(`${environmentVariables?.apiUrl}/auth/getAllUsers`, {
        headers: { _token: authData.data.token.token },
      })
      .then((res) => {
        res.data.message &&
          res.data.message.map((item) => {
            if (item.group === "IT") {
              setEmployees((current) => [...current, item]);
            } else if (item.group === "ITTL" || item.isAdmin === "admin") {
              setTl((current) => [...current, item]);
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400 }}
      style={{ overflowX: "scroll" }}
    >
      <Table
        sx={{ minWidth: 1700 }}
        stickyHeader
        aria-label="sticky table customized"
      >
        <TableHead>
          <TableRow style={{ fontSize: "50px" }}>
            <TableCell></TableCell>
            <TableCell style={{ fontSize: "15px", fontWeight: "600" }}>
              Task
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Files
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned To
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned By
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Assigned Date
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Due Date
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600", width: "10%" }}
            >
              Time Taken
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Testing
            </TableCell>
            <TableCell
              align="center"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Approval
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allData &&
            allData?.map((item, key) => {
              return (
                <ExpandableTableRow
                  key={key}
                  subData={subData}
                  itemValue={item}
                  allData={allData}
                  keyValue={key}
                  getData={getData}
                  employees={employees}
                  tl={tl}
                >
                  <>
                    <TableCell align="left">{item.taskname} </TableCell>
                    <TableCell align="center">
                      {item.myFile === undefined || item.myFile === null ? (
                        <span>No image</span>
                      ) : (
                        <Image
                          src={`/uploads/${item.myFile}`}
                          style={{
                            height: "30px",
                            width: "30px",
                            cursor: "pointer",
                          }}
                          alt="image"
                          onClick={() =>
                            window.open(`/uploads/${item.myFile}`, "_blank")
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {employees &&
                        employees.map((employee, index) => {
                          if (employee.email === item.assignedTo) {
                            return (
                              <MenuItem
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                key={index}
                              >
                                {employee?.profile ? (
                                  <Image
                                    src={`/uploads/${employee?.profile}`}
                                    style={{ height: "30px", width: "30px" }}
                                    roundedCircle
                                    alt="image"
                                  />
                                ) : (
                                  <UserImg
                                    src={Avtar}
                                    alt="hello"
                                    style={{ height: "30px", width: "30px" }}
                                  />
                                )}
                                &nbsp;
                                <span>
                                  {employee.firstName + employee.lastName}
                                </span>
                              </MenuItem>
                            );
                          }
                        })}
                    </TableCell>
                    <TableCell align="center">
                      {tl &&
                        tl.map((tl, index) => {
                          if (tl.email === item.assignedBy) {
                            return (
                              <MenuItem
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                key={index}
                              >
                                {tl?.profile ? (
                                  <Image
                                    src={`/uploads/${tl?.profile}`}
                                    style={{ height: "30px", width: "30px" }}
                                    roundedCircle
                                    alt="image"
                                  />
                                ) : (
                                  <UserImg
                                    src={Avtar}
                                    alt="hello"
                                    style={{ height: "30px", width: "30px" }}
                                  />
                                )}
                                &nbsp;
                                <span>{tl.firstName + tl.lastName}</span>
                              </MenuItem>
                            );
                          }
                        })}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.assignedDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {moment(item.dueDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">{item.timeTaken}</TableCell>
                    <TableCell align="center">
                      <CustomButton
                        style={{
                          backgroundColor:
                            item?.testing === "Done"
                              ? "green"
                              : item?.testing === "Working on it"
                              ? "orange"
                              : item?.testing === "Stuck"
                              ? "red"
                              : "none",
                          padding: "8px",
                        }}
                      >
                        {item?.testing}
                      </CustomButton>
                    </TableCell>
                    <TableCell align="center">
                      <CustomButton
                        style={{
                          backgroundColor:
                            item?.approval === "Done"
                              ? "green"
                              : item?.approval === "Working on it"
                              ? "orange"
                              : item?.approval === "Stuck"
                              ? "red"
                              : "none",
                          padding: "8px",
                        }}
                      >
                        {item?.approval}
                      </CustomButton>
                    </TableCell>
                  </>
                </ExpandableTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ITTask;
