import { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faCalendarDay, faClosedCaptioning, faFolderBlank } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import PropTypes from 'prop-types';
import SideBar from './SideBar';
import Schedule from './Schedule';
import Tags from './Tags';
import HashtagModal from './HashtagModal';
import Captions from './Captions';
import CaptionsModal from './CaptionsModal';



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


const CalenderView = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [schShow, setSchShow] = useState(false);
    const [tagShow, setTagShow] = useState(false);
    const [hashShow, setHashShow] = useState(false);
    const [captionShow, setCaptionShow] = useState(false);

    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const [tabText, setTabText] = useState('Select for each day and time what posts can be published ');
    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 1) {
            setTabText('Select on which days to posts');
        } else {
            setTabText('Select for each day and time what posts can be published ');
        }
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    const [showCode, setShowCode] = useState(false);

    const toggleCode = () => {
        setShowCode(!showCode);
    };

    const handleEventDrop = (arg) => {
        // Handle the event drop event here
        console.log('Event dropped:', arg.event);
    };

    const handleEventReceive = (arg) => {
        // Handle the event receive event here
        console.log('Event received:', arg.event);
    };

    // const [selectedValue, setSelectedValue] = useState("Selection Day");

    // const handleSelect = (eventKey) => {
    //     setSelectedValue(eventKey);
    // };


    // const [step, setStep] = useState(1);

    // const handleNext = () => {
    //     setStep(step + 1);

    //     if (step === 3) {
    //         setLgShow(false)
    //     }


    //     // Update modal content based on the new step value
    //     // You can use conditional rendering to display different content for each step
    // };


    // const [para, setPara] = useState("Select for each day and time what posts can be published")





    return (
        <>
            <SideBar>
                <div>
                    <div className='container-fluid'>
                        <div className="row  py-2 px-3" style={{ background: "rgba(95, 95, 95, 0.12)" }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='calender-head d-flex align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <h2 className='mb-0'>Calender View</h2>
                                        {/* <Dropdown> */}
                                        {/* <Dropdown.Toggle id="dropdown-custom-components" className='d-flex align-items-center p-0'> */}
                                        <p className='mb-0 d-flex align-items-center'><FontAwesomeIcon icon={faEarthAmerica} size="lg" className="ms-1 pe-2"></FontAwesomeIcon>America/Toronto</p>
                                        {/* </Dropdown.Toggle> */}

                                        {/* <Dropdown.Menu>
                                                <Dropdown.Item eventKey="17">China</Dropdown.Item>
                                                <Dropdown.Item eventKey="18">Russia</Dropdown.Item>
                                                <Dropdown.Item eventKey="19" active>
                                                    Pakistan
                                                </Dropdown.Item>
                                               
                                            </Dropdown.Menu> */}
                                        {/* </Dropdown> */}
                                    </div>
                                    <div className='calender-head d-flex align-items-center flex-column ms-4 px-4' onClick={toggleCode} style={{ cursor: "pointer" }}>
                                        <FontAwesomeIcon icon={faCalendarDay} size="lg" className=""></FontAwesomeIcon>
                                        <p>Settings</p>
                                    </div>
                                    {showCode && (
                                        <div className='calender-head d-flex align-items-center' style={{ borderLeft: "1px solid #A8A8A8" }}>
                                            <div className='calender-head d-flex align-items-center flex-column cl-list pt-0'>
                                                <Schedule schShow={schShow} setSchShow={setSchShow} />
                                            </div>
                                            <div className='calender-head d-flex align-items-center flex-column cl-list'>
                                                <Tags tagShow={tagShow} setTagShow={setTagShow} />
                                            </div>
                                            <div className='calender-head d-flex align-items-center flex-column cl-list'>
                                                <CaptionsModal captionShow={captionShow} setCaptionShow={setCaptionShow} />
                                            </div>
                                            <div className='calender-head d-flex align-items-center flex-column cl-list'>
                                                <HashtagModal hashShow={hashShow} setHashShow={setHashShow} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='calender-head' id='schedule'>
                                    <Button className="d-flex flex-column align-items-center new-post"><FontAwesomeIcon icon={faFolderBlank} size="lg" className="ms-1 pe-2"></FontAwesomeIcon>New Post</Button>
                                    {/* <Schedule /> */}
                                </div>


                            </div>

                        </div>

                    </div>
                    <div className='py-2 px-3'>
                        {/* <h1>Demo App</h1> */}
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView='dayGridMonth'
                            weekends={false}
                            headerToolbar={{
                                start: 'today prev,next',
                                center: 'title',
                                end: 'dayGridMonth, timeGridWeek, timeGridDay',
                            }}
                            height={"90vh"}
                            editable={true}
                            droppable={true}
                            eventDrop={handleEventDrop}
                            eventReceive={handleEventReceive}
                            events={[
                                {
                                    title: 'Event 1',
                                    start: '2023-04-01T12:00:00',
                                    end: '2023-04-01T14:00:00',
                                },
                                {
                                    title: 'Event 2',
                                    start: '2023-04-02T12:00:00',
                                    end: '2023-04-02T14:00:00',
                                },
                            ]}
                        />
                    </div>
                </div>
            </SideBar>
        </>
    )
}

export default CalenderView;