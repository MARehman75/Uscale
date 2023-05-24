import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight,faClosedCaptioning,faHashtag } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Captions from './Captions';



export default function CaptionsModal({ captionShow, setCaptionShow }) {

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

    // function a11yProps(index) {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`,
    //     };
    // }
    
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

    // function a11yProps1(index) {
    //     return {
    //         id: `simple-tab1-${index}`,
    //         'aria-controls': `simple-tabpanel1-${index}`,
    //     };
    // }

    // const [value, setValue] = useState(0);
    // const [value2, setValue2] = useState(0);
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };
    // const handleChange2 = (event, newValue) => {
    //     setValue2(newValue);
    // };

    return (
        <div>
            <div className='calender-head' id='schedule'>
                <Button variant="light" onClick={() => setCaptionShow(true)} className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={faClosedCaptioning} style={{fontSize:'1.6rem',color:"#3D3D3D"}}></FontAwesomeIcon>
                    <p>Captions</p>
                </Button>
                <Modal
                    size="xl"
                    show={captionShow}
                    onHide={() => setCaptionShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton className='py-4'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <div className='calender-head d-flex align-items-center ps-4'>
                                <FontAwesomeIcon icon={faClosedCaptioning} size="lg" className="ms-1 me-2 icon"></FontAwesomeIcon> <h2 className='mb-0'>Captions</h2><FontAwesomeIcon icon={faAngleRight} className="ms-2" style={{ color: "#bdbdbd", fontSize: "1rem" }}></FontAwesomeIcon>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='px-5'>
                        <Box sx={{ width: '100%' }}>
                            <Captions/>
                        </Box>

                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
