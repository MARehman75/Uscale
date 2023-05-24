import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{ background: "#DAEDFF", boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%)" }}>
          <Toolbar className='d-flex align-items-center'>
            <IconButton
              color="black"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className='Title-head'>
              <h2 style={{ marginBottom: "0" }}>Uscale</h2>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/dashboard">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <HomeIcon style={{ width: '36px', height: '36px' }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" id="Home-text" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>

          <div className='Sb-head' style={{ padding: "8px 20px" }}>
            <h6>Tools</h6>
          </div>
          <List>
            {['Uschedule', 'Manage Channels'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                {text === 'Uschedule' ? (
                  <Link to="/CalenderView">
                    <ListItemButton
                     className='pb-0'
                      sx={{
                        minHeight: 40,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        <CalendarTodayIcon style={{ width: '37px', height: '37px' }} />
                      </ListItemIcon>

                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0, color: 'rgba(95, 95, 95, 0.96)' }}
                      />
                    </ListItemButton>
                    <ListItem sx={{ display: 'block' }} className='py-0'>
                      <p style={{ marginLeft: '55px', fontSize: "12px", color: "rgba(95, 95, 95, 0.54)", lineHeight:"1.2" }}>
                        Schedule content for up to <br/>3 months with <Link to={{}} style={{color:"#168fff"}}>Uscale Pro</Link>
                      </p>
                    </ListItem>
                  </Link>
                ) : (
                  text === 'Manage Channels' && (
                    <Link to="/manage-channels">
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          marginTop: '10px'
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={require('./img/set.png')}
                            alt="Image description"
                            style={{ width: '37px', height: '37px' }}
                          />
                        </ListItemIcon>

                        <ListItemText
                          primary={text}
                          sx={{ opacity: open ? 1 : 0, color: 'rgba(95, 95, 95, 0.96)' }}
                        />
                      </ListItemButton>
                    </Link>
                  )
                )}
              </ListItem>
            ))}
          </List>

          <Divider />

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div className='Appbar container-fluid d-lg-flex d-md-flex d-block justify-content-between align-items-center py-2 px-3'>
            <div className='Appbar-dt'>
              <p>User Name (Free)</p>
            </div>
            <div className='Appbar-dt d-flex align-items-center'>
              {/* <p className='d-flex align-items-center'>Try Pro for 14 days<FontAwesomeIcon icon={faArrowRight} size="xs" className="ms-2"></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} size="xs" className="ms-1"></FontAwesomeIcon></p> */}
              <div className='d-flex align-items-center justify-content-around'>
                {/* <FontAwesomeIcon icon={faBell} size="lg" className="ms-1 px-2"></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faGear} size="lg" className="ms-1 px-2"></FontAwesomeIcon> */}
                <DropdownButton id="dropdown-item-button" title={<FontAwesomeIcon icon={faCircleUser} size="lg" className="ms-1 px-2"></FontAwesomeIcon>}>
                  {/* <Dropdown.ItemText></Dropdown.ItemText> */}
                  <Dropdown.Item as="button">Your Profile</Dropdown.Item>
                  <Dropdown.Item as="button">Settings</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => {
                    window.localStorage.setItem("isLoggedIn", "false");
                    navigate('/');
                  }}>Sign out</Dropdown.Item>
                  {/* <Dropdown.Item as="button">Something else</Dropdown.Item> */}
                </DropdownButton>
              </div>
            </div>
          </div>
          <div>
            {/* render here */}
            {children}
          </div>


        </Box>
      </Box>
      <Outlet />
    </>
  )
}

export default SideBar