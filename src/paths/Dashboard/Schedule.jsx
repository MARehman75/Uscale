import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Campaign from './Campaign';
import MainQueue from './MainQueue';
import TimeFormat from './TimeFormat';




export default function Schedule({ schShow, setSchShow }) {

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function TabPanel1(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel1-${index}`}
                aria-labelledby={`simple-tab1-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel1.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };


    function a11yProps1(index) {
        return {
            id: `simple-tab1-${index}`,
            'aria-controls': `simple-tabpanel1-${index}`,
        };
    }

    const [tabText, setTabText] = useState("Select for each day and time what posts  can be published");

    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) {
            setTabText("Select for each day and time what posts  can be published")
        } else {
            setTabText("Select on which days to posts")
        }
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    return (
        <div>
            <div className='calender-head' id='schedule'>
                <Button variant="light" onClick={() => setSchShow(true)} className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={faCalendar} style={{ fontSize: '1.6rem', color: "#3D3D3D" }}></FontAwesomeIcon>
                    <p>Schedule</p>
                </Button>
                <Modal
                    size="xl"
                    show={schShow}
                    onHide={() => setSchShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className='py-4'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <div className='calender-head d-flex align-items-center ps-4'>
                                <FontAwesomeIcon icon={faCalendar} size="lg" className="ms-1 me-2  icon"></FontAwesomeIcon> <h2 className='mb-0'>Schedule Settings</h2><FontAwesomeIcon icon={faAngleRight} className="ms-2" style={{ color: "#bdbdbd", fontSize: "1rem" }}></FontAwesomeIcon>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-5'>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='modal-head modal-bd'>
                                    <Tab label="Preset Times" {...a11yProps(0)} />
                                    <Tab label="Time Format" {...a11yProps(1)} />
                                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                                    <em style={{ fontSize: "18px", padding: "13px 16px" }}>{tabText}</em>
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value2} onChange={handleChange2} aria-label="basic tabs example" className='modal-head'>
                                            <Tab label="Main Queue" {...a11yProps1(0)} />
                                            <Tab label="Campaigns" {...a11yProps1(1)} />
                                            {/* <Tab label="Item Three" {...a11yProps(5)} /> */}
                                        </Tabs>
                                    </Box>
                                    <TabPanel1 value={value2} index={0}>
                                        <MainQueue />
                                    </TabPanel1>
                                    <TabPanel1 value={value2} index={1}>
                                        <Campaign />
                                    </TabPanel1>
                                    {/* <TabPanel value={value} index={2}>
                                                                Item Three
                                                            </TabPanel> */}
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TimeFormat />
                            </TabPanel>

                            {/* <TabPanel value={value} index={2}>
                                                        Item Three
                                                    </TabPanel> */}
                        </Box>

                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
