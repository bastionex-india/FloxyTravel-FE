import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../ContextApi/ContextApi";
// import moment from 'moment'
import Cardbg1 from "../../Images/bg.jpg";
import { useNavigate } from "react-router-dom";

// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
const LeftCardWrapper = styled.div`
  width: calc(60% - 10px);
  /* height: 100%; */
  @media (max-width: 648px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${(p) =>
    p.bgImage &&
    `
    background-image:url(${p.bgImage});
  `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
  width: 100%;
  height: 300px;
  position: relative;
  cursor: pointer;
`;
const CardText = styled.div`
  color: #fff;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export default function LeaveRecord() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // console.log("jjjjjjjjjjjjjj",data)
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const componentClicked = (item) => {
    navigate("/hoteldetails", { state: item });
  };
  const getVendorData = async () => {
    await axios
      .get("http://http://139.59.82.13:4000/:4000/auth/vendorget", {
        headers: { _token: authData.data.token },
      })
      .then((response) => {
        // console.log('rrrrrrrrrrrr',response.data.data.hotels)
        setData(response.data.data.hotels);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getVendorData();
  }, []);

  return (
    <div>
      <div>
        {data.map((item, key) => {
          console.log(".................", item, key);
          return (
            <LeftCardWrapper>
              <Card
                bgImage={`http://http://139.59.82.13:4000/:4000/uploads/${item.image[0]}`}
                onClick={() => componentClicked(item)}
              >
                <TextWrapper>
                  <TextWrapper>
                    <CardText>{item.hotelname}</CardText>
                    <CardText>
                      {item.city} , {item.state}
                    </CardText>
                  </TextWrapper>
                </TextWrapper>
              </Card>
            </LeftCardWrapper>
          );
        })}
      </div>

      {/* <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card> */}
    </div>
  );
}
