import React, { useRef, useEffect, useContext, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import SendIcon from "@mui/icons-material/Send";
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ListItem, ListItemText,ListItemButton } from '@mui/material'
import { AuthContext } from '../../ContextApi/ContextApi';
import axios from "axios";
// const ChatAPI = require("twilio-chat");
import { Client } from 'twilio-chat';
import { environmentVariables } from '../../config/config';
import ChatWelcome from './ChatWelcome';





const drawerWidth = 240;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ChatSupport = () => {
  const [open, setOpen] = useState(true);
  const { authData, setAuthData } = useContext(AuthContext);
  const [activeChannel, setActiveChannel] = useState(null);
  const [allChannel, setAllChannel] = useState([])
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatClient, setChatClient] = useState(null);
  const [activeChannelSID,setActiveChannelSID] = useState('')
  const baseUrl = environmentVariables.apiUrl;
  let scrollDiv = useRef(null);


  const scrollToBottom = () => {
    // console.log("scroll bottom called ....");
    // setTimeout(() => {
    // console. log('Will be called after 2 seconds');
    const scrollHeight = scrollDiv.current.scrollHeight;
    const height = scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    // console.log('scrollHeight',scrollHeight);
    // console.log('height',height);
    // console.log('maxScrollTop',maxScrollTop);
    scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    // scrollDiv.current.scrollTop = scrollHeight
    // }, 1000);

  };

  const getTwilioAuthToken = async () => {
    // authData.data.data.email
    return await axios({
      method: "POST",
      url: `${baseUrl}/auth/generateToken`,
      data: {
        email: authData.data.email
      }
    })
  }

  const initializeChatClient = async () => {
    //  initializeChatClient
    try {
      // Replace with your backend endpoint to generate the token
      const response = await getTwilioAuthToken();
      const token = response.data.token;
      const client = new Client(token);
      // console.log("Token created.....",client);
      setChatClient(client);
    } catch (error) {
      console.error("Error initializing Chat client:", error);
    }
  }
 
  const sendMessage = async () => {
    if (activeChannel && inputText.trim() !== '') {
      try {
        let messageAttributes = null
        let response = await activeChannel.sendMessage(inputText, messageAttributes);
        setInputText('');
        // console.log("sent");
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    else {
      console.log("channel no found");
    }
  };
  
  const handleNewMessage = (message) => {
    // console.log('New message received:', message);
    // Handle the new message as desired
    setMessages(messages => [...messages, message]);
    messages.push(message)
    // console.log("messages:" + messages)
  };
  const getAllMessages = async (channel) => {
    const newMessages = await channel.getMessages();
    setMessages(newMessages.items || []);

  }
  const selectChannel = (channel) => {
    setActiveChannel(channel);
    setActiveChannelSID(channel.sid)
    // console.log("channel selected...");
  }
  // Assuming you have a valid Twilio Chat client
  const getAllChannels = async (client) => {
    try {
      const channels = await client.getSubscribedChannels();
      // console.log('All channels:', channels);
      setAllChannel(channels.items)
    } catch (error) {
      console.error('Error retrieving channels:', error);
    }
  };
  const handleChannelAdded = (channel) => {
    // console.log('New channel created:', channel);
    // Perform any desired actions when a new channel is created
    getAllChannels(chatClient)
  };
  const handleChannelDeleted = (channel) => {
    // console.log('Channel deleted:', channel);
    // Perform any desired actions when a channel is deleted
    getAllChannels(chatClient)
  };
  const handleChannelRemoved = (channel) => {
    // console.log('Channel removed:', channel);
    // Perform any desired actions when a channel is removed
    getAllChannels(chatClient)
  };

  useEffect(() => {
    if (activeChannel) {
      getAllMessages(activeChannel)
      scrollToBottom();
      console.log({ activeChannel });
    }
    // scrollToBottom();
    if (activeChannel) {
      activeChannel.on('messageAdded', handleNewMessage);
      scrollToBottom();
    }
    
    return () => {
      if (activeChannel) {
        activeChannel.off('messageAdded', handleNewMessage);
      }
    };
  }, [activeChannel])

  useEffect(() => {
    if (chatClient) {
      // console.log({ chatClient });
      getAllChannels(chatClient)
    }
    if (chatClient) {
      // Attach the event listener
      chatClient.on('channelAdded', handleChannelAdded);
    }
    if (chatClient) {
      // Attach the event listener
      chatClient.on('channelDeleted', handleChannelDeleted);
      // chatClient.off('channelDeleted', handleChannelDeleted); //  in case  of memory  leak you can use it  
    }
    if(chatClient){
      chatClient.on('channelRemoved', handleChannelRemoved);
    }
  }, [chatClient])

  useEffect(() => {
    if (authData) {
      initializeChatClient();
    }
  }, [])

  

  // console.log("messages",messages)
  return (
    <ThemeProvider theme={defaultTheme} >
      <Box sx={{ display: 'flex' }} >
        {/* <CssBaseline /> */}

        <Drawer variant="permanent" open={open} style={{ borderLeft: "1px solid lightgray" }}>
          <div style={{ position: "sticky", top: 0, zIndex: 9999 }} >
            <Toolbar
              sx={{
                display: 'flex',
                // alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <div style={{ height: "60px", width: "60px", borderRadius: "50%", background: "skyblue", marginRight: "80px", color: "white", fontSize: "35px", textAlign: "center" }}>{authData.data.name.charAt(0).toUpperCase()}</div>
            </Toolbar>
            <div className="col-md-12 text-center">
              <p><b>{authData.data.name}</b></p>
              {/* <p>pradeep@bastionex.net</p>
              <p>pradeep@bastionex.net</p>
              <p>Backend Developer</p> */}
            </div>
          </div>
          {/* <Divider sx={{ my: 1 }} /> */}
          <List style={{ backgroundColor: "#f0f0f0", height: "470px", overflow: 'auto' }}>
            {/* selected={true}  */}
            {
              allChannel && allChannel.map((row, index) => {
                return (
                  <>
                    <ListItem  sx={{ backgroundColor: (row.sid == activeChannelSID) ? 'skyblue' : 'inherit',cursor: 'pointer', ":hover": { background: "skyblue" } }} onClick={() => { selectChannel(row) }}>
                      <ListItemText primary={row.channelState.friendlyName} />
                    </ListItem>
                    
                    <Divider />
                  </>
                )
              })
            }
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '80vh',
            overflow: 'auto',
          }}
          ref={scrollDiv}
        >
          {
            activeChannel ?
              <>
                <Grid container sx={{ position: "sticky", top: 0, }}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 60,
                      }}
                    >
                      <b>{activeChannel ? activeChannel.channelState.friendlyName : 'Demo'}</b>
                    </Paper>
                  </Grid>
                </Grid>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                  <Grid container>
                    {
                      messages && messages.length ?
                        messages.map((message, index) => {
                          let messageAlignment = message.author == authData.data.email ? '-webkit-right' : "-webkit-left"
                          return (
                            <Grid key={message.sid} item xs={12} style={{ textAlign: messageAlignment }}>
                              <Paper
                                sx={{
                                  p: 1,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  height: 40,
                                  // textAlign:"left",
                                  marginTop: "3px",
                                  background: "ligthgray",
                                  width: 'fit-content'
                                }}
                              >
                                {message.body}
                              </Paper>
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
                  }}>
                  <Grid item xs={6} md={6} lg={6}>
                    <Paper
                      sx={{
                        height: 70,
                        width: "100%",
                        padding: "8px",
                      }}
                    >
                      <TextField
                        id="outlined-multiline-static"
                        label="Type your message"
                        multiline
                        fullWidth
                        // rows={2}
                        autoFocus
                        size="medium"
                        style={{ fontSize: "13px" }}
                        // defaultValue="Default Value"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={2} md={2} lg={2}>
                    <Paper
                      sx={{
                        height: 70,
                        padding: "8px",
                      }}
                    >
                      <Button color="primary" onClick={sendMessage} style={{ marginTop: "2px", paddingTop: "7px", paddingBottom: "7px" }} variant="contained" size="large" endIcon={<SendIcon />}>
                        Send
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </>
              :
              <>
                <ChatWelcome />
              </>
          }


        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ChatSupport