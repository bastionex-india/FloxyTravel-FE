import React, { useRef, useEffect, useContext, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";
import { AuthContext } from "../../ContextApi/ContextApi";
import axios from "axios";
// const ChatAPI = require("twilio-chat");
import { Client } from "twilio-chat";
import { environmentVariables } from "../../config/config";
import ChatWelcome from "./ChatWelcome";
import moment from "moment/moment";
import Avatar from "@mui/material/Avatar";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import {
  amber,
  blue,
  blueGrey,
  brown,
  common,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from "@mui/material/colors";
import RightClickMenu from './chat/RightClickMenu';

const drawerWidth = 277;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ChatSupport = () => {
  let colorList = [
    amber,
    blue,
    blueGrey,
    brown,
    common,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
  ];

  const [open, setOpen] = useState(true);
  const { authData, setAuthData } = useContext(AuthContext);
  const [activeChannel, setActiveChannel] = useState(null);
  const [allChannel, setAllChannel] = useState([]);
  const [isChannelLoading, setIsChannelLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [chatClient, setChatClient] = useState(null);
  const [activeChannelSID, setActiveChannelSID] = useState("");
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [isSendButtonDisable, setIsSendButtonDisable] = useState(false);
  const baseUrl = environmentVariables.apiUrl;

  const [selectedMessages, setSelectedMessages] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);


  let scrollDiv = useRef(null);


  const handleContextMenu = (e, message) => {
    e.preventDefault(); // Prevent default right-click menu from showing
    setSelectedMessages([...selectedMessages, message])
    setMenuOpen(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  function getSortName(string) {
    string = string.split(" ");
    let shortString = string.map((word) => word.charAt(0).toUpperCase());
    return shortString;
  }
  const scrollToBottom = () => {
    console.log("scroll bottom called ....");
    setTimeout(() => {
      // console. log('Will be called after 2 seconds');
      const scrollHeight = scrollDiv.current.scrollHeight;
      const height = scrollDiv.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      // console.log('scrollHeight',scrollHeight);
      // console.log('height',height);
      // console.log('maxScrollTop',maxScrollTop);
      scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      // scrollDiv.current.scrollTop = scrollHeight
    }, 0);
  };

  const getTwilioAuthToken = async () => {
    // authData.data.data.email
    return await axios({
      method: "POST",
      url: `${baseUrl}/auth/generateToken`,
      data: {
        email: authData.data.email,
      },
    });
  };

  const initializeChatClient = async () => {
    //  initializeChatClient
    try {
      // Replace with your backend endpoint to generate the token
      const response = await getTwilioAuthToken();
      const token = response.data.token;
      const client = new Client(token);
      console.log("Token created.....", client);
      setChatClient(client);
    } catch (error) {
      console.error("Error initializing Chat client:", error);
    }
  };



  const sendMessage = async () => {
    setIsSendButtonDisable(true);
    if (activeChannel && inputText && inputText.trim() !== "") {
      try {
        let messageAttributes = null;
        let response = await activeChannel.sendMessage(
          inputText,
          messageAttributes
        );
        setInputText("");
        // console.log("sent");
        setIsSendButtonDisable(false);
      } catch (error) {
        isSendButtonDisable(false);
        console.error("Error sending message:", error);
      }
    } else {
      console.log("channel no found");
    }
  };
  const SendButton = () => {
    let backgroundColor = inputText ? "#2196F3" : "lightgray";
    return (
      <IconButton onClick={sendMessage} disabled={(inputText || !isSendButtonDisable) ? false : true} color="primary" style={{ backgroundColor: backgroundColor }}>
        <SendIcon sx={{ color: "white", fontSize: "15px" }} />
      </IconButton>
    );
  };
  const handleKeyDown = (event) => {
    // console.log("event.key",event.shiftKey);
    // console.log("event.key",event.key);
    if (event.key === "Enter" && !event.shiftKey) {
      // 👇 Get input value
      sendMessage();
    }
  };

  const getAllMessages = async (channel) => {
    const newMessages = await channel.getMessages();
    setMessages(newMessages.items || []);
  };
  const selectChannel = (channel) => {
    setActiveChannel(channel);
    setActiveChannelSID(channel.sid);

    // console.log("channel selected...");
  };
  // Assuming you have a valid Twilio Chat client
  const getAllChannels = async (client) => {
    setIsChannelLoading(true);
    try {
      const channels = await client.getSubscribedChannels();
      console.log("All channels:", channels);
      setAllChannel(channels.items);
      setIsChannelLoading(false)
    } catch (error) {

      console.error("Error retrieving channels:", error);
    }
  };

  const deleteMessages = async () => {

    for (let index = 0; index < selectedMessages.length; index++) {
      const message = selectedMessages[index];
      try {
        //  hard  delete 
        // let deletedMessage = await message.remove();
        // console.log("deleted ",deletedMessage);

        // soft delete 
        const updatedAttributes = {
          ...message.state.attributes,
          deleted: true,
        };
        await message.updateAttributes(updatedAttributes);


        // console.log('Message deleted successfully!');
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
    return true;
  };

  const handleMessageDelete = async () => {
    // handleMessageDelete
    // console.log("data >>>>>>>>>",selectedMessages);
    let getResult = await deleteMessages()
    if (getResult) {
      getAllMessages(activeChannel)
    }
    setSelectedMessages([])
    handleCloseMenu()
  }
  // mark  All Messages As Consumed
  const markAllMessagesAsConsumed = async (channel) => {
    try {
      await channel.setAllMessagesConsumed();
      // await channel.setNoMessagesConsumed();
      // let getMembersCount = await  channel.getMembersCount()
      // console.log("getMembersCount",getMembersCount)
      await getAllChannels(chatClient);
      console.log("All messages marked as consumed");
    } catch (error) {
      console.error("Error marking all messages as consumed: ", error);
    }
  };



  const handleNewMessage = async (message) => {
    await markAllMessagesAsConsumed(activeChannel)
    // await getAllChannels(chatClient)

    console.log("New message received:", message);
    // Handle the new message as desired
    // message.channel.sid
    setMessages((messages) => [...messages, message]);
    messages.push(message);
    // console.log("messages:" + messages)

    scrollToBottom(); //  to  scroll  message  on bottom
  };

  const handleChannelAdded = (channel) => {
    // console.log('New channel created:', channel);
    // Perform any desired actions when a new channel is created
    getAllChannels(chatClient);
  };
  const handleChannelDeleted = (channel) => {
    // console.log('Channel deleted:', channel);
    // Perform any desired actions when a channel is deleted
    getAllChannels(chatClient);
  };
  const handleChannelRemoved = (channel) => {
    // console.log('Channel removed:', channel);
    // Perform any desired actions when a channel is removed
    getAllChannels(chatClient);
  };

  const handleChangedChannel = async (activeChannel) => {
    setIsMessageLoading(true);
    await markAllMessagesAsConsumed(activeChannel);
    await getAllMessages(activeChannel);
    setIsMessageLoading(false);
    scrollToBottom();
    console.log({ activeChannel });
  };

  useEffect(() => {
    console.log("channel changed...");
    if (activeChannel) {
      handleChangedChannel(activeChannel);
    }
    // scrollToBottom();
    if (activeChannel) {
      activeChannel.on("messageAdded", handleNewMessage);
    }
    return () => {
      if (activeChannel) {
        activeChannel.off("messageAdded", handleNewMessage);
      }
    };
  }, [activeChannel]);

  useEffect(() => {
    console.log("Client changed...");
    if (chatClient) {
      // console.log({ chatClient });
      getAllChannels(chatClient);
    }
    if (chatClient) {
      // Attach the event listener
      chatClient.on("channelAdded", handleChannelAdded);
    }
    if (chatClient) {
      // Attach the event listener
      chatClient.on("channelDeleted", handleChannelDeleted);
      // chatClient.off('channelDeleted', handleChannelDeleted); //  in case  of memory  leak you can use it
    }
    if (chatClient) {
      chatClient.on("channelRemoved", handleChannelRemoved);
    }
  }, [chatClient]);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        // after  click  on outside =>  selected message  will be empty 
        setSelectedMessages([])
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (authData) {
      initializeChatClient();
    }
  }, []);

  // console.log("messages",messages)
  // console.log("seleceted Message",selectedMessages);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>

        <Drawer
          variant="permanent"
          open={open}
          style={{ borderLeft: "1px solid lightgray" }}
        >
          <div style={{ position: "sticky", top: 0, zIndex: 9999 }}>
            <Toolbar
              sx={{
                display: "flex",
                // alignItems: 'center',
                justifyContent: "center",
                px: [1],
              }}
            >
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  background: "skyblue",
                  marginRight: "80px",
                  color: "white",
                  fontSize: "35px",
                  textAlign: "center",
                  margin: "25px 0 5px 0",
                }}
              >
                {authData.data.name.charAt(0).toUpperCase()}
              </div>
            </Toolbar>
            <div className="col-md-12 text-center">
              <p>
                <b>{authData.data.name}</b>
              </p>
              {/* <p>pradeep@bastionex.net</p>
              <p>pradeep@bastionex.net</p>
              <p>Backend Developer</p> */}
            </div>
          </div>
          {/* <Divider sx={{ my: 1 }} /> */}
          <List
            style={{
              backgroundColor: "#fff",
              height: "470px",
              overflow: "auto",
              padding: "0 15px",
              margin: "10px 0",
            }}
          >
            {
              isChannelLoading ?
                <>
                  <Grid container>
                  <Grid item xs={5} component="div">
                  </Grid>
                  <Grid item xs={2} component="div">
                    <CircularLoader></CircularLoader>
                  </Grid>
                  <Grid item xs={5} component="div">
                  </Grid>
                  </Grid>
                </>
                :
                allChannel &&
                allChannel.map((channel, index) => {
                  // console.log("channel.lastConsumedMessageIndex",channel.lastConsumedMessageIndex);
                  // console.log("channel.lastMessage.index",channel.lastMessage.index);
                  let unreadMessageCount = 0;
                  if (
                    channel.lastConsumedMessageIndex &&
                    channel.lastMessage != undefined &&
                    channel.lastMessage.index != undefined &&
                    channel.lastConsumedMessageIndex !== channel.lastMessage.index
                  ) {
                    unreadMessageCount =
                      channel.lastMessage.index -
                      channel.lastConsumedMessageIndex;
                  }
                  //  channel.lastConsumedMessageIndex !== channel.lastMessage.index ? channel.lastMessage.index - channel.lastConsumedMessageIndex : 0
                  let userName = channel.channelState.friendlyName;
                  let number = index % (colorList.length - 1);
                  let shortName = getSortName(userName);


                  let lastMessageDateTime = '';
                  if (channel.lastMessage != undefined && channel.lastMessage.dateCreated != undefined) {
                    lastMessageDateTime = moment(channel.lastMessage.dateCreated).format('hh:mm A')
                    if (moment(channel.lastMessage.dateCreated).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
                      lastMessageDateTime = moment(channel.lastMessage.dateCreated).format("D MMM")
                    }
                  }


                  // console.log("channel", channel);

                  return (
                    <>
                      <ListItem
                        key={index}
                        sx={{
                          backgroundColor:
                            channel.sid == activeChannelSID
                              ? "#F2F2F2"
                              : "inherit",
                          cursor: "pointer",
                          ":hover": { background: "#F2F2F2" },
                          borderRadius: "10px",
                          margin: "2px 0",
                        }}
                        onClick={() => {
                          selectChannel(channel);
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: colorList[number][500],
                            width: "30px",
                            height: "30px",
                            fontSize: "14px",
                          }}
                        >
                          {shortName}
                        </Avatar>
                        &nbsp;
                        <ListItemText
                          primary={channel.channelState.friendlyName}
                        />
                        <Box component="span" sx={{ position: "absolute", fontSize: "10px", top: 0, right: 3 }}>
                          {lastMessageDateTime}
                        </Box>
                        {/* <Box component="span" sx={{position:"absolute",color:"gray",fontSize:"12px",bottom: 0, right:3 }}>
                        last  messages ......
                      </Box> */}
                        <Badge
                          badgeContent={unreadMessageCount}
                          color="primary"
                        ></Badge>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "80vh",
            overflow: "auto",
          }}
          ref={scrollDiv}
        >
          {activeChannel ? (
            <>
              <Grid container sx={{ position: "sticky", top: 0 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "row",
                      lineHeight: 2,
                      height: 60,
                    }}
                  >
                    <Avatar sx={{ bgcolor: amber[500] }}>
                      {getSortName(
                        activeChannel
                          ? activeChannel.channelState.friendlyName
                          : "Admin"
                      )}
                    </Avatar>
                    &nbsp;
                    {activeChannel
                      ? activeChannel.channelState.friendlyName
                      : "Demo"}
                  </Paper>
                </Grid>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                  <Grid container>
                    {
                      isMessageLoading ?
                        <>
                          <Grid item xs={6} component="div" style={{ textAlign: "center" }}>
                          </Grid>
                          <Grid item xs={6} component="div">
                            <CircularLoader></CircularLoader>
                          </Grid>
                        </>
                        :
                        messages && messages.length ?
                          messages.map((message, index) => {

                            let messageDateTime = moment(message.dateCreated).format('hh:mm A')
                            if (moment(message.dateCreated).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
                              messageDateTime = moment(message.dateCreated).format("D MMM")
                            }
                            let messageAlignment = message.author == authData.data.email ? '-webkit-right' : "-webkit-left"
                            let textColor = message.author == authData.data.email ? 'skyblue' : "#e9e9e9"
                            let isDeleted = (message.attributes != null && message.attributes.deleted != undefined) ? message.attributes.deleted : false;
                            // console.log("message isDeleted >>>>>>",isDeleted);

                            return (
                              <Grid key={index} item xs={12} component="div" style={{ textAlign: messageAlignment }}>
                                <Paper
                                  sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 40,
                                    marginTop: "3px",
                                    background: textColor,
                                    width: 'fit-content'
                                  }}
                                  onContextMenu={(e) => {

                                    !isDeleted && handleContextMenu(e, message)
                                  }}
                                >
                                  {
                                    isDeleted ?
                                      <i>This message was deleted</i>
                                      :
                                      <>
                                        {message.body}
                                        <span style={{ fontSize: "8px", textAlign: "right" }}>{messageDateTime}</span>
                                      </>
                                  }

                                </Paper>

                                {menuOpen && (
                                  <div ref={menuRef}>
                                    <RightClickMenu x={menuPosition.x} y={menuPosition.y} handleMessageDelete={handleMessageDelete} onClose={handleCloseMenu} />
                                  </div>
                                )}

                              </Grid>
                            )
                          })
                          :
                          null
                    }
                  </Grid>
                </Container>
                <Grid container
                  sx={{
                    position: "fixed",
                    bottom: 0,
                    width: "120%",
                    marginBottom: "10px",
                    padding: "0px 20px 0px 20px",
                  }}>
                  <Grid item xs={6} md={6} lg={6}>
                    <TextField
                      id="filled-multiline-flexible"
                      // label="Multiline"
                      placeholder="Type Your Message..."
                      multiline
                      size="small"
                      // maxRows={1}
                      sx={{ outline: "none" }}
                      style={{ width: "100%" }}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      InputProps={{
                        endAdornment: <SendButton />,
                        style: {
                          borderRadius: "12px 12px",
                          outline: "none",
                          textAlignVertical: "top",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )
            :
            (
              <>
                <ChatWelcome />
              </>
            )

          }
        </Box>
      </Box>

    </ThemeProvider>
  );
};

export default ChatSupport;
