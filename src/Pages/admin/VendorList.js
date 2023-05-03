import React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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

const Root = styled.div`
  width: 90%;
  padding-left: 50px;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10%;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const getAllListData = async () => {
    await axios
      .get("http://188.166.176.89:4000/auth/getvendorlist", {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log("vendorlist",response.data)
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
  // const addVendor=()=>{

  // }
  const [open, setOpen] = useState(false);
  // const [open1, setOpen1] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleClickOpen1 = () => {
  //   setOpen1(true);
  // };

  const handleClose = () => {
    // alert("ddd")
    console.log(
      "aaaaaaa",
      name,
      email,
      number,
      password,
      cpassword,
      adminValue
    );
    if (adminValue === "vendor") {
      axios({
        method: "post",
        url: `http://188.166.176.89:4000/auth/addvendor`,
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
          // console.log(response.data.data,"00000000000001111111111")
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
        url: `http://188.166.176.89:4000/auth/admin/register`,
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
      .delete(`http://188.166.176.89:4000/auth/deletevendor/${item._id}`, {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        console.log(response.data.data);
        navigate("/");
        // toast(response.data.data)
        // getAllUSers();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <Root>
      <button onClick={handleClickOpen}>Add Vendor or admin</button>
      {/* <button onClick={handleClickOpen1}>Add Admin</button> */}
      <CardWrapper>
        {data.map((item, index) => {
          // console.log("dddddddddd",item)
          return (
            item.active !== true && (
              <Card
                sx={{ maxWidth: 345 }}
                key={index}
                style={{ cursor: "pointer" }}
              >
                {/* <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="../../Images/brandLogo.png"
                            onClick={()=>getAnotherComponent(item)}
                        /> */}
                <CardContent>
                  <DeleteIcon onClick={() => deleteVendor(item)} />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    onClick={() => getAnotherComponent(item)}
                  >
                    Name : {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    onClick={() => getAnotherComponent(item)}
                  >
                    Email : {item.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    onClick={() => getAnotherComponent(item)}
                  >
                    Contact : {item.mobile}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
              </Card>
            )
          );
        })}

        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Add Vendor or Admin"}</DialogTitle>
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
                  label="Email"
                  variant="outlined"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Contact"
                  variant="outlined"
                  required
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  required
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <FormControl>
                  {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setAdminValue(e.target.value)}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      checked={adminValue === "admin"}
                    />
                    <FormControlLabel
                      value="vendor"
                      control={<Radio />}
                      label="Vendor"
                      checked={adminValue === "vendor"}
                    />
                  </RadioGroup>
                </FormControl>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1}>Cancel</Button>
              <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* <div>
      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Vendor or Admin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField id="outlined-basic" label="Name" variant="outlined" required type='text' value={adminName} onChange={e=>setadminName(e.target.value)}/>
            <TextField id="outlined-basic" label="Email" variant="outlined" required type='email' value={adminEmail} onChange={e=>setAdminEmail(e.target.value)}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" required type='password' value={adminPassword} onChange={e=>setAdminPassword(e.target.value)}/>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" required type='password' value={admincpassword} onChange={e=>setAdminCPassword(e.target.value)}/>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e)=>setAdminValue1(e.target.value)}
              >
                <FormControlLabel value="admin" control={<Radio />} label="Admin"  checked={adminValue1 === "admin"} />
                <FormControlLabel value="vendor" control={<Radio />} label="Vendor" checked={adminValue1 === "vendor"}/>
              </RadioGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3}>Cancel</Button>  
          <Button onClick={handleClose2}>Submit</Button>
        </DialogActions>
      </Dialog>
      
    </div> */}
        <ToastContainer />
        {/* <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="../../Images/download.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="../../../public/download.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="../../../public/download.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="../../../public/download.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */}
      </CardWrapper>
    </Root>
  );
};

export default VendorList;
