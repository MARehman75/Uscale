
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faTags,faAngleRight, faTag} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Categories from './Categories';
import Labels from './Labels';
import TagsCampaign from './TagsCampaign';




export default function Tags({ tagShow, setTagShow }) {

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

    const [value, setValue] = useState(0);
    const [value2, setValue2] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };
    return (
        <div>
            <div className='calender-head' id='schedule'>
                <Button variant="light" onClick={() => setTagShow(true)} className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={faTags} style={{fontSize:'1.6rem',color:"#3D3D3D"}}></FontAwesomeIcon>
                    <p>Tags</p>
                </Button>
                <Modal
                    size="xl"
                    show={tagShow}
                    onHide={() => setTagShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className='py-4'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <div className='calender-head d-flex align-items-center ps-4'>
                                <FontAwesomeIcon icon={faTags} size="lg" className="ms-1 pe-2 icon "></FontAwesomeIcon>
                                <h2 className='mb-0'>Tags</h2><FontAwesomeIcon icon={faAngleRight} className="ms-2" style={{ color: "#bdbdbd", fontSize: "1rem" }}></FontAwesomeIcon>
                                <div className="col-auto ms-5 tags-head">
                                    <Box>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='modal-head modal-bd'>
                                            <Tab label="Categories" {...a11yProps(0)} />
                                            <Tab label="Labels" {...a11yProps(1)} />
                                            <Tab label="Campaigns" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                </div>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-5'>
                        {/* <Box sx={{ width: '100%' }}> */}

                        {/* <TabPanel value={value} index={0}>
                                <div> */}
                        <Box sx={{ width: '100%' }}>

                            <TabPanel value={value} index={0}>
                                <Categories />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Labels />
                            </TabPanel>

                            <TabPanel value={value} index={2}>
                                <TagsCampaign />
                            </TabPanel>
                        </Box>

                        {/* </div>
                            </TabPanel> */}

                        {/* </Box> */}

                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
