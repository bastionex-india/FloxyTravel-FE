import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ChatWelcome = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Chat Support
            </Typography>
            {/* <Button variant="contained" color="primary">
                Get Started
            </Button> */}
            <p>you can chat with every user .</p>
        </Box>
    );
}

export default ChatWelcome