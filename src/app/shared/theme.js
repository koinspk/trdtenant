import React, { useState, useEffect, createContext } from 'react';
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
import { Alert, Backdrop, Button, Menu, MenuItem, Modal, Snackbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import  { mainListItems,secondaryListItems } from './listitems';
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Services } from '../service/services';
import SnackbarContext from '../context/snackbar';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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


const mdTheme = createTheme({
  typography: {
    fontFamily: 'Poppins, serif'
  },
  palette: {
    primary: {
      light: '#ffffff',
      main: '#25476A',
    },
    secondary: {
      light: '#ffffff',
      main: '#FA9F1B'
    }
  },
});

function LogOffAlert({
  status,
  changeEvent,
  onClose
}) {
  return (
    <Modal
      open={status}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal_wrapper" sx={{ maxWidth: 500 }}>
        <h2 className='modal_title'>Logout</h2>
        <Box sx={{ pb: 2 }}>
          Are you sure, do you want to logout ?
        </Box>
        <Box className='modalaction'>
          <Button className='btn cancel_btn' onClick={onClose}>No</Button>
          <Button className='btn submit_btn' onClick={changeEvent}>Yes</Button>
        </Box>
      </Box>
    </Modal>
  )
}

function DashboardContent() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [curentUser, setCurentUser] = useState();
  const [logOff, setLogOff] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [contextValue, setContextValue] = useState({
    open: false,
    message: ''
  });

  const updateSnackbar = (value) => {
    setContextValue(value)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    localUser()
  }, []);

  // useEffect(() => {
  //  setTimeout(() => {
  //   setContextValue({
  //     open : false,
  //     message : ''
  //   })
  //  }, 4000);
  // }, [contextValue]);

  const localUser = async () => {
    let cuser = await Services.getCurentUser(setCurentUser);
    setCurentUser(cuser)
  }
  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    updateSnackbar({
      ...contextValue,
      open : false,
    });
  };

  const logout = () => {
    localStorage.removeItem("tsdtenant");
    localStorage.removeItem("tsdrftoken");
    navigate('/login');
  }

  return (
    <ThemeProvider theme={mdTheme} >
      <SnackbarContext.Provider value={{ contextValue, updateSnackbar }}>
        <Box sx={{ display: 'flex' }} className="header_wrap">
          <CssBaseline />
          <AppBar position="absolute" open={open} style={{ background: '#25476A', color: '#ffffff' }}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  // marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                onClick={toggleDrawer}
                color="inherit"
                sx={{
                  // marginRight: '36px',
                  ...(!open && { display: 'none' }),
                }}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Truck Sales & Distribution
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <AccountCircleIcon />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                className="profile_menu"
              >
                <Box className="header" sx={{ px: 2, py: 1, }}>
                  <Box className="name">{curentUser?.username ?? 'Unknown'}</Box>
                  <Box className='mail'>{curentUser?.emailid ?? 'Unknown@gg.com'}</Box>
                </Box>
                <MenuItem onClick={handleClose}> Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={() => setLogOff(true)}> Logout  </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open} PaperProps={{
            sx: {
              backgroundColor: "#ffffff",
              color: "#001e3c",
            }
          }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: [1],
              }}
            >
              <img src={require('../../assets/truck_logo_dark.png')} className='logo' style={{ height: 73, marginBottom: 20 }} />
            </Toolbar>
            {/* <Divider /> */}
            <List component="nav" className='navigation_menu'>
              {mainListItems}

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
              height: '100vh',
              overflow: 'auto',
            }}
          >

            <Snackbar
              open={contextValue.open}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={3000}
              message={contextValue.message}
              key={"top" + "right"}
              onClose={snackbarClose}
            >
              <Alert onClose={snackbarClose} severity="success" sx={{ width: '100%' }} >{contextValue.message}</Alert>
            </Snackbar>


            <LogOffAlert onClose={() => setLogOff(false)} changeEvent={logout} status={logOff} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ position: 'absolute', zIndex: 0 }}><path fill="#25476A" fillOpacity="1" d="M0,128L60,128C120,128,240,128,360,128C480,128,600,128,720,144C840,160,960,192,1080,213.3C1200,235,1320,245,1380,250.7L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, zIndex: 1, position: 'relative' }}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}