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
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GraphCheck from "./GraphCheck";

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
      .get(`${environmentVariables.apiUrl}/admin/getvendorlist`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        setData(response.data.message);
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
        });
    }
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  const deleteVendor = (item) => {
    
    axios
      .delete(`${environmentVariables.apiUrl}/auth/deletevendor/${item._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log(response.data.data);
        getAllListData();
        setShowModel(false);
        navigate("/");

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
                setResponseData(response.data.data);

                action.resetForm();
                getAllListData();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
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
                setAdminResponseData(response.data.data);

                action.resetForm();
                toast(response.data.message);
                setOpen(false);
              })
              .catch((error) => {
                console.log("///////////////", error);
              });
          }
        }
      },
    });

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
        <h6 style={{textAlign: 'center'}} class="card-title">EARNINGS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $80
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total earnings</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">HOTELS</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        $50
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Total hotels</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div class="card-body">
        <h6 style={{textAlign: 'center'}} class="card-title">BOOKINGS</h6>
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
        <h6 style={{textAlign: 'center'}} class="card-title">PENDING</h6>
        <h1 style={{textAlign: 'center', color: '#008080'}} class="card-text">
        25
        </h1>
        <p style={{textAlign: 'center'}} class="card-title">Pending bookings</p>
      </div>
    </div>
  </div>
</div>

     <GraphCheck/> 

</>    

  );
};

export default VendorList;
