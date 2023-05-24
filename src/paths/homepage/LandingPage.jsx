import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Globe2 } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlayCircle, faPlay } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useLocation } from 'react-router-dom';
import SignupModal from '../../utils/modals/SignupModal';
import { useEffect, useState } from 'react';
import LoginModal from '../../utils/modals/LoginModal';
import SendEmailModal from '../../utils/modals/SendEmailModal';
import QueryString from 'query-string';

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};


const LandingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false)
    const location = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const [hovarBackground, setHovarBackground] = useState(false)
    useEffect(() => {
        const values = QueryString.parse(location.search);
        if (values.success) {
            setShowAlert(true)
            setShowLoginModal(true)
        }
        if (values.canceled) {

        }
    }, [location.search]);
    return (
        <div>

            <SignupModal
                showModal={showModal}
                setShowModal={setShowModal}
                goToLogin={setShowLoginModal}
            />
            <LoginModal
                showModal={showLoginModal}
                setShowModal={setShowLoginModal}
                goToSignup={setShowModal}
                goToForget={setShowEmailModal}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
            />
            <SendEmailModal
                showModal={showEmailModal}
                setShowModal={setShowEmailModal}
            />
            <Navbar collapseOnSelect expand="lg" className="p-4">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='mb-lg-0 mb-3' />
                    <Navbar.Collapse id="responsive-navbar-nav" className='d-lg-flex justify-content-between'>
                        <Nav className="">
                            <div className="Title-head">
                                <h2>Uscale</h2>
                            </div>

                        </Nav>
                        <Nav>
                            {/* <a href="/login" id="signin" className='mt-lg-0 mt-2'>Sign In</a> */}
                            <Link to={""} onClick={() => setShowLoginModal(true)} id="signin" className='mt-lg-0 mt-2'>Sign In</Link>
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn ms-lg-4 ms-0 py-2 px-2 d-flex align-items-center mt-lg-0 mt-3"
                                id="nav-right-btn" >Get Started Free
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    className="ms-3"
                                    style={{ fontSize: "11px" }}
                                />
                            </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Logo */}

            <div className="logo d-flex justify-content-center align-items-center mt-2">
                <img
                    src={require('./img/logo.png')}
                    alt="logo"
                />
            </div>


            {/* Hero */}

            <section id="hero">
                <div className="container mt-5 px-lg-5 py-lg-5 px-2">
                    <div className="row">
                        <div className="col-lg-10 col-12 text-center mx-auto">
                            <h1>Build & scale a digital brand from the ground up</h1>
                            <p className="col-lg-9 col-md-9 col-10 mx-auto mt-3">
                                Uscale makes it easy for people and teams to grow an audience and promote digital assets directly to customers.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='position-relative'>
                    <img
                        src={require('./img/1.gif')}
                        alt="logo"
                        style={{ width: "100%", maxHeight: "480px" }}
                    />
                    <div className='d-lg-flex d-md-flex hero-section'>
                        <Form.Control type="email" placeholder="Enter your email Address" />
                        <button className='btn btn-primary ms-lg-3 ms-md-3 ms-0 mt-lg-0 mt-md-0 mt-2'>Start a Project</button></div>


                </div>
            </section>

            {/* schedule and automate section */}

            <section id='automate' className='mt-5'>
                <div className="container">
                    <div className="row Title-head">
                        <h2
                            className='col-lg-6 col-12 text-center mx-auto'
                            style={{ textDecoration: "underline" }}>
                            Schedule, automate & sell digital content across platforms
                        </h2>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-7 col-12">
                            <div>
                                <img
                                    src={require('./img/2.png')}
                                    alt="logo"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-5 col-12 px-lg-5 py-lg-5 px-md-2 py-md-5 px-3 mt-lg-0 mt-md-4 mt-5">
                            <div className='automate-data'>
                                <p style={{ fontSize: "32px" }}>
                                    Whether you are <strong>managing a social media account, building a community</strong> or <strong>selling online content</strong>
                                    solo or in a team, Uscale will let you streamline and scale with ease.</p>
                                <button className='btn btn-primary p-3'>
                                    <FontAwesomeIcon
                                        icon={faPlayCircle}
                                        className="me-3" />
                                    See how it works
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calender Section */}

            <section className='mt-5'>
                <div className="container">
                    <div className="row Title-head">
                        <h2>
                            Uschedule, a smart and intuitive content calendar
                        </h2>
                        <p style={{ fontSize: "32px" }} className="mt-4">Uschedule allows you to <strong>plan, schedule, publish </strong> and <strong> analyze </strong> your social media content across multiple channels.</p>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-6 col-12">
                            <div>
                                <img
                                    src={require('./img/3.png')}
                                    alt="logo"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 py-lg-3 px-lg-5 py-md-3 px-md-2 py-3 px-3 mt-lg-0 mt-4">
                            <div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                                    <p className='ms-4'><strong>Maintain a strong social media presence </strong> by scheduling your content in advance and staying consistent</p></div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon><p className='ms-4'><strong>Get an instant overview </strong> of published and scheduled content across all your channels <strong> from a single calendar view </strong></p></div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon><p className='ms-4'><strong>Save time creating quality content </strong> and focusing on strategy rather than mindlessly repeating busy work</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <p style={{ fontSize: "32px" }}>Collaborate with ease</p>
                        <div className="col-lg-6 col-12  py-lg-3 pe-lg-5 py-md-3 pe-md-3 py-3 px-3 mt-3">
                            <div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                                    <p className='ms-4'><strong>Organize your posts </strong> by teams, accounts and campaigns</p></div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon><p className='ms-4'><strong>Invite people to edit with you or set your whole team up in Uscale </strong>
                                    to leave feedback, get approvals, and scale your content</p></div>
                                <div className='d-flex align-items-baseline'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon><p className='ms-4'><strong>Worry-free editing and collaboration with version history </strong></p></div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div>
                                <img
                                    src={require('./img/4.png')}
                                    alt="logo"
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powerfull Integrations */}

            <section className='mt-5'>
                <div className="container">
                    <div className="row Title-head">
                        <h2>Powerfull Integrations</h2>
                        <p style={{ fontSize: "32px" }} className="mt-3">Collaborate with ease</p>
                    </div>
                </div>
                <div style={{ background: "#DAEDFF" }} className="mt-3">
                    <div className="container">
                        <div className="row" style={{ background: "#DAEDFF" }}>
                            <div className="col-lg-6 col-12 p-lg-5 p-md-5 py-5 px-3">
                                <div className='text-center'>
                                    <img
                                        src={require('./img/5.png')}
                                        alt="logo"
                                    />
                                    <p style={{ fontSize: "22px" }} className="text-start mt-4">Canva is a free graphic design platform that's great for making invitations, business cards,
                                        Instagram posts, and more. Discover how the powerful combination of Uscale and Canva can
                                        help you save time on what actually matters...Creating content!</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 p-lg-5 p-md-5 py-5 px-3">
                                <div className='text-center'>
                                    <div className='d-flex align-items-center justify-content-center powerfull-integ-imgs'>
                                        <img
                                            src={require('./img/6.png')}
                                            alt="logo"
                                        />
                                        <img
                                            src={require('./img/7.png')}
                                            alt="logo"
                                        />
                                        <img
                                            src={require('./img/8.png')}
                                            alt="logo"
                                        />
                                        <div style={{ padding: "0 10px" }}>
                                            <img
                                                src={require('./img/9.png')}
                                                alt="logo"
                                                style={{ border: "1px solid white", background: "white", borderRadius: "8px", padding: "9px" }}
                                            /></div>
                                    </div>
                                    <p className='py-lg-4 px-lg-5 py-md-4 px-md-5 py-4 px-1'>Add media content from tools like Google Drive, Dropbox and Canva</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}

            <div className="container mt-5">
                <div className="row Title-head">
                    <h2>Feature 2: Uautomate (Content Automator)</h2>
                    <h2 className='mt-5'>Feature 3: Usell</h2>

                    <h2 className='text-center col-lg-8 col-12 mx-auto mt-3' style={{ fontWeight: "400" }}>With Uscale Pro, you can plan and collaborate with others, without limits</h2>
                </div>
            </div>

            {/* Slider */}

            <section id="slider" className='p-5 mt-5'>

                <Slider {...settings} className="slider-section">
                    <div className='text-center'>
                        <img
                            src={require('./img/slide1.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                    <div className='text-center'>
                        <img
                            src={require('./img/slide2.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                    <div className='text-center'>
                        <img
                            src={require('./img/slide3.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                    <div className='text-center'>
                        <img
                            src={require('./img/slide1.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                    <div className='text-center'>
                        <img
                            src={require('./img/slide2.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                    <div className='text-center'>
                        <img
                            src={require('./img/slide3.png')}
                            alt="logo"
                        />
                        <p className='mt-3'>Feature</p>
                    </div>
                </Slider>
            </section>


            {/* See all feature section */}

            <section className='mt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-12 mx-auto">
                            <div className='text-center see_all'>
                                <p style={{ fontSize: "26px" }}>See Uscale’s powerful publishing features at work</p>
                                <div className='d-lg-flex d-md-flex justify-content-center feature mt-4'>
                                    <Form.Control type="email" placeholder="Enter your email Address" />
                                    <button className='btn btn-primary ms-lg-3 ms-md-3 ms-0 mt-lg-0 mt-md-0 mt-3 d-flex align-items-center py-lg-1 px-lg-2 py-md-1 px-md-2 p-2'>Try Uscale Pro for 14 days
                                        <FontAwesomeIcon icon={faPlay} className="ms-3" style={{ fontSize: "13px" }}></FontAwesomeIcon>
                                    </button>
                                </div>
                                <Link to={"/"} className="d-flex align-items-center justify-content-center my-5">See all features <FontAwesomeIcon icon={faPlay} className="ms-3" style={{ fontSize: "10px" }}></FontAwesomeIcon></Link>
                            </div>
                        </div>
                        <img
                            src={require('./img/2.gif')}
                            alt="logo"
                            style={{ maxHeight: "659px" }}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}

            <footer id="footer" className='mt-5 mb-1'>
                <div className="container">
                    <div className="row footer-body py-5">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className='Title-head'>
                                <h2 style={{ color: "white" }}>Uscale</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div>
                                <button className='btn btn-primary d-flex align-items-center signInButton' onClick={() => setShowModal(true)} style={{ fontSize: "26px" }}>Start a Project
                                    <FontAwesomeIcon icon={faPlay} className="ms-3" style={{ fontSize: "13px" }}></FontAwesomeIcon></button>
                                <Link to={""} className='btn btn-sign mt-3 px-lg-2 px-md-2 px-0' onClick={() => setShowLoginModal(true)}>Sign in</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-3">
                            <div className='d-flex flex-column'>
                                <Link to={"/"}>Terms of use</Link>
                                <Link to={"/"} className="mt-3">Privacy policy</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 mt-lg-0 mt-3">
                            <div className='d-flex flex-column'>
                                <Link to={"/"}>Contact us</Link>
                                <Link to={"/"} className="mt-3">Our story</Link>
                            </div>
                        </div>
                    </div>
                    <div className='footer-end d-lg-flex justify-content-between'>
                        <p style={{ fontSize: "20px", lineHeight: "42px", color: "white" }}>© 2022 Uscale Softwares Inc. All Rights Reserved</p>
                    </div>
                </div>

            </footer>

        </div>

    )
}

export default LandingPage;