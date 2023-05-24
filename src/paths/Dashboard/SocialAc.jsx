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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar, faGear, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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



const SocialAc = () => {
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
                        {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                                        {text === 'Home' ? <HomeIcon /> :
                                            text === 'Drafts' && <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <div className='Sb-head' style={{ padding: "8px 20px" }}>
                        <h6>Tools</h6>
                    </div>
                    <List>
                        {['Uschedule'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                                        {text === "Uschedule" ? <NetworkPingIcon /> : <MailIcon />}
                                    </ListItemIcon>

                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <div className='Appbar d-lg-flex d-md-flex d-block justify-content-between align-items-center py-2 px-3'>
                        <div className='Appbar-dt'>
                            <p>User Name (Free)</p>
                        </div>
                        <div className='Appbar-dt d-flex align-items-center'>
                            <p className='d-flex align-items-center'>Try Pro for 14 days<FontAwesomeIcon icon={faArrowRight} size="xs" className="ms-2"></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faStar} size="xs" className="ms-1"></FontAwesomeIcon></p>
                            <div className='d-flex align-items-center justify-content-around'>
                                <FontAwesomeIcon icon={faBell} size="lg" className="ms-1 px-2"></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faGear} size="lg" className="ms-1 px-2"></FontAwesomeIcon>
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

                    <div style={{ padding: '24px' }}>
                        <div className='Social-head text-center mt-3 mb-lg-4 mb-md-4 mb-2'>
                            <h2 style={{
                                fontWeight: "700", color: "rgba(95, 95, 95, 0.96)"
                            }} className='mb-0'>Connect your social accounts</h2>
                            <p>Add a social account to plan and schedule content</p>
                        </div>

                        <div className="p-xl-5 p-lg-4 p-md-4 p-4">
                            <div className="row d-flex justify-content-around">
                                <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-md-0 mb-3">
                                    <Link to={"/"}>
                                        <div className='img-title img-bg d-flex flex-column align-items-center text-center'>
                                            <div className='img-rd'>
                                                <img
                                                    src={require('./img/tiktok.png')}
                                                    alt="logo"
                                                />
                                            </div>
                                            <p className='mb-0 mt-3'>TikTok</p>
                                        </div>
                                        <button className='btn social-btn mt-1 col-12'>Business Account</button>
                                    </Link>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-md-0 mb-3">
                                    <Link to={"/"}>
                                        <div className='img-title text-center img-bg'>
                                            <div className='img-rd'>
                                                <img
                                                    src={require('./img/insta.png')}
                                                    alt="logo"
                                                /></div>
                                            <p className='mb-0 mt-3'>Instagram</p>
                                        </div>
                                        <button className='btn social-btn mt-1 col-12'>Business Account</button>
                                    </Link>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-md-4">
                                    <Link to={"/"}>
                                        <div className='img-title img-bg'>
                                            <div className='img-rd'>
                                                <img
                                                    src={require('./img/twitter.png')}
                                                    alt="logo"
                                                /></div>
                                            <p className='mb-0 mt-3'>Twitter</p>
                                        </div>
                                        <button className='btn social-btn mt-1 col-12'>Profile</button>
                                    </Link>
                                </div>
                                <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-md-4 mt-3">
                                    <Link to={"/"}>
                                        <div className='img-title img-bg'>
                                            <div className='img-rd'>
                                                <img
                                                    src={require('./img/linkdin.png')}
                                                    alt="logo"
                                                />
                                            </div>
                                            <p className='mb-0 mt-3'>Linkedin</p>
                                        </div>
                                        <button className='btn social-btn mt-1 col-12'>Page or Profile</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <button className='btn btn-connect'>Connect Later</button>
                        </div>
                    </div>
                </Box>
            </Box>
            <Outlet />
        </>
    )
}

export default SocialAc 