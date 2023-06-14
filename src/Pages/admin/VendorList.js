import React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { environmentVariables } from "../../config/config";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import { ButtonBase, TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { VendorRegisterSchema } from "./schemas/VendorRegisterSchems";
import Check from './Check.js';
import { Modal } from "react-bootstrap";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10%;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 20px;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const boldTextCss = {
  fontWeight: 700
}

const VendorList = () => {
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [adminResponseData, setAdminResponseData] = useState([]);
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [vendorValue, setVendorValue] = useState("");
  const [adminValue, setAdminValue] = useState("");
  const [error, setError] = useState("");
  const [showModal,setShowModel] = useState(false);

  const getAllListData = async () => {
    await axios
      .get(`${environmentVariables.apiUrl}/auth/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log("vendorlist",response.data)
        setData(response.data.data.Records);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    getAllListData();
  }, []);

  const getAnotherComponent = (item) => {
    navigate("/gethotelsbyvendorid", { state: item });
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    if (adminValue === "vendor") {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/auth/addvendor`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          mobile: number,
          password: password,
          cpassword: cpassword,
          adminType: adminValue,
        },
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          // setUpdatedHotelData(response.data.message)
          setResponseData(response.data.data);

          setName("");
          setEmail("");
          setNumber("");
          setPassword("");
          setCPassword("");
          setAdminValue("");

          toast(response.data.message);
          setOpen(false);
        })
        .catch((error) => {
          console.log("///////////////", error);
          // setError('Details are not valid');
        });
    } else {
      axios({
        method: "post",
        url: `${environmentVariables.apiUrl}/auth/admin/register`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          username: name,
          email: email,
          mobile: number,
          password: password,
          cpassword: cpassword,
          adminType: adminValue,
        },
        headers: { _token: authData.data.token },
      })
        .then((response) => {
          // console.log(response.data.data,"00000000000001111111111")
          // setUpdatedHotelData(response.data.message)
          setAdminResponseData(response.data.data);

          setName("");
          setEmail("");
          setNumber("");
          setPassword("");
          setCPassword("");
          setAdminValue("");

          toast(response.data.message);
          setOpen(false);
        })
        .catch((error) => {
          console.log("///////////////", error);
          // setError('Details are not valid');
        });
    }
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  // const handleClose2=()=>{

  // }
  // const handleClose3=()=>{
  //   setOpen1(false);
  // }
  const deleteVendor = (item) => {
    // alert(item._id)
    axios
      .delete(`${environmentVariables.apiUrl}/auth/deletevendor/${item._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log(response.data.data);
        getAllListData();
        setShowModel(false);
        navigate("/");

        // toast(response.data.data)
        // getAllUSers();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: VendorRegisterSchema,
      onSubmit: async (values, action) => {
        console.log("aaaa", values, adminValue);
        if (adminValue === "") {
          setError("Options must be selected");
        } else {
          if (adminValue === "vendor") {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/addvendor`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                name: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                // console.log(response.data.data,"00000000000001111111111")
                // setUpdatedHotelData(response.data.message)
                setResponseData(response.data.data);

                action.resetForm();
                getAllListData();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
                // setError('Details are not valid');
              });
          } else {
            axios({
              method: "post",
              url: `${environmentVariables.apiUrl}/auth/admin/register`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: {
                username: values.name,
                email: values.email,
                mobile: values.contact,
                password: values.password,
                cpassword: values.confirmPassword,
                adminType: adminValue,
              },
              headers: { _token: authData.data.token },
            })
              .then((response) => {
                // console.log(response.data.data,"00000000000001111111111")
                // setUpdatedHotelData(response.data.message)
                setAdminResponseData(response.data.data);

                action.resetForm();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
                // setError('Details are not valid');
              });
          }
        }
      },
    });
  // console.log("first",errors);

  function deleteConfirmation()
  {
    setShowModel(true);
  }

  function hideModal()
  {
    setShowModel(false);
  }

  return (
    <>
      <div class="row row-cols-4 g-4" style={{width: '70rem'}}>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded" >
      <div  class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">PENDING</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $80
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total pendings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">EARNINGS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $50
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total earnings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">BOOKINS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        68
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total bookings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">SERVICES</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        25
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total services</p>
      </div>
    </div>
  </div>
</div>

<TableContainer component={Paper} style={{width: '70rem'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell style={boldTextCss}>Vendor Name</TableCell>
                  <TableCell style={boldTextCss} align="left">Email</TableCell>
                  <TableCell style={boldTextCss} align="left">Contact Number</TableCell>
                  <TableCell style={boldTextCss} align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data && data.map((item, index) => {
                    const bookingDate = new Date(item.createdAt);
                    return (
                      item.active !== true &&(
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                        {item.name}              
                        </TableCell>
                        <TableCell align="left">{item.email}</TableCell>
                        <TableCell align="left">{item.mobile}</TableCell>
                        <TableCell align="left"><Button size="small" variant="contained" type="button"><DeleteIcon onClick={deleteConfirmation} /></Button></TableCell>
                        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className="alert alert-danger">Are you sure you want to delete the vendor?</div></Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={hideModal}>
              {/*  */}
                Cancel
              </Button>
              <Button variant="danger" onClick={() => deleteVendor(item) } >
              {/*  */}
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
                      </TableRow>

                      
                      )
                      
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
      

</>    

  );
};

export default VendorList;
