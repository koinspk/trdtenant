import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import { Alert, Box, Fade, Snackbar } from '@mui/material';

const theme = createTheme({
    palette: {
        success: green,
        error: red,
    },
});
function Network() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Snackbar
                open={!isOnline}
                // onClose={handleClose}
                TransitionComponent={Fade}
                key={Fade}
            >
            <Alert severity="error" sx={{ width: '100%', backgroundColor : '#ffffff' }}> Please check your Network status.</Alert>
            </Snackbar>
        </ThemeProvider>
    )
}


export default Network
