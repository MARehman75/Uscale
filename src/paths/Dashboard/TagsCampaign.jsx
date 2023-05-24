import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCircleCheck, faCalendar, faTrash, faClock, faCheck, faAngleUp, faEarthAfrica,faBars } from '@fortawesome/free-solid-svg-icons';

export default function TagsCampaign() {
    return (
        <div>
            <div className='modal-head d-flex justify-content-between py-3'>
                <div className='label-head d-flex align-items-center'>
                    <p>Campaigns</p>
                    <em className='ms-5'>Create Scheduled Campaigns Across Multiple Social Media Channels</em>
                </div>
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-between'>
                <div className='col-10 d-flex align-items-center'>

                    <div className='d-flex align-items-center' >
                        <div className='d-flex align-items-center'>
                            <FontAwesomeIcon icon={faBars} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>
                            <div className='christ me-2'></div>
                        </div>
                        {/* <div className='d-flex flex-column align-items-center justify-content-start'> */}

                        <div className='d-flex align-items-center flex-column'>
                            <div>
                                <p style={{ fontSize: "16px", fontWeight: "700", color: "#168fff" }}>Christmas Campaign</p>
                            </div>
                            {/* <div>
                <FontAwesomeIcon icon={faCircleUser} size="lg" className=""></FontAwesomeIcon>
                <FontAwesomeIcon icon={faCircleCheck} size="lg" className="ms-1"></FontAwesomeIcon>
                <img
                    src={require('./img/Line.png')}
                    alt="logo"
                    className='mx-2'
                />
                <img
                    src={require('./img/image22.png')}
                    alt="logo"
                />
                <img
                    src={require('./img/image23.png')}
                    alt="logo"
                />
            </div> */}
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='tb-date ms-5'>
                        <FontAwesomeIcon icon={faCalendar} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>Nov 15 - Dec 26,2022 <span className='ms-5'> <FontAwesomeIcon icon={faClock} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>12 Scheduled</span>
                        <span className='ms-5'> <FontAwesomeIcon icon={faCheck} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>4 Pending Approval</span>
                    </div>
                </div>
                <FontAwesomeIcon icon={faTrash} size="xl" className="btn mt-2 col-2" style={{ fontSize: '26px' }}></FontAwesomeIcon>

            </div>
            <div className='modal-bd d-flex align-items-center col-11 mx-auto'>
                {/* <p>All Posts</p><FontAwesomeIcon icon={faAngleUp} size="md" className="ms-3" style={{ color: "#5f5f5f" }}></FontAwesomeIcon> */}
            </div>
            <div className='tags-bd d-flex justify-content-between align-items-center col-11 mx-auto mt-3'>
                <div className='d-flex align-items-center'>
                    <p>December 12, 2022</p>
                    <FontAwesomeIcon icon={faClock} size="lg" className="ms-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>
                </div>
                <span>Last Updated 3 hours ago<FontAwesomeIcon icon={faCircleUser} size="lg" className="ms-2"></FontAwesomeIcon></span>
                <span><FontAwesomeIcon icon={faEarthAfrica} size="lg" className="me-2"></FontAwesomeIcon>America/Toronto</span>
            </div>
            <div className='campaign-container d-flex justify-content-between align-items-center p-3 col-11 mx-auto'>
                <div>
                    <div className='d-flex align-items-center'>
                        <div style={{ background: "#1A1A1A", height: '37px', width: "37px", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center position-relative'>
                            <img
                                src={require('./img/image26.png')}
                                alt="logo"
                            />
                            <img
                                src={require('./img/image22.png')}
                                alt="logo" className='position-absolute' style={{
                                    bottom: "-8px",
                                    right: "-9px"
                                }}
                            />
                        </div>
                        <div style={{ background: "#1A1A1A", height: '37px', width: "37px", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center position-relative ms-2'>
                            <img
                                src={require('./img/image26.png')}
                                alt="logo"
                            />
                            <img
                                src={require('./img/image23.png')}
                                alt="logo" className='position-absolute' style={{
                                    bottom: "-8px",
                                    right: "-9px"
                                }}
                            />
                        </div>
                        <small className='ms-3'>Lastpatina</small>
                    </div>

                    <p> Always do your own research and determine your own risk tolerance.​ Comment below your preferred platform!
                        <br /> #Investing #Diversification #Portfolio #PersonalFinance</p>
                    <div className='d-flex align-items-center'>
                        <p>Labels:</p>
                        <div className='label-input d-flex align-items-center px-2 ms-2'>
                            Intro Level Content
                        </div>
                        <div className='label-input d-flex align-items-center px-2 ms-2'>
                            Portfolio
                        </div>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCircleUser} size="lg" className=""></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" className="ms-1"></FontAwesomeIcon>
                    </div>
                </div>
                <div>
                    <img
                        src={require('./img/image24.png')}
                        alt="logo"
                    />
                </div>
            </div>
        </div>
    )
}
