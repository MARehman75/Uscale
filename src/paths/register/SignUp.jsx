import { useState, useEffect, useRef } from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Cookies from "universal-cookie";
import useAuth from '../../hooks/useAuth';
import OvalLoader from '../../utils/loaders/Oval';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosPrivate } from '../../api/axios';
const cookies = new Cookies();
const UserName_REGEX = /^[a-zA-Z][^\s]{3,}$/;
const Email_REGEX = /\S+@\S+\.\S+/;
const password_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;

const SignUp = ({ goToLogin, setShowModal }) => {
    const [validated] = useState(false)
    const usernameRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const { setAuth } = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [showGoogleLoader, setShowGoogleLoader] = useState(false);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { setUser(codeResponse); setShowGoogleLoader(true) },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        setValidEmail(Email_REGEX.test(email));
    }, [email])
    useEffect(() => {
        setValidUserName(UserName_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidPassword(password_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])
    useEffect(() => {
        if (user?.access_token) {
            axiosPrivate.post("account/convert-token/",
                {
                    token: user?.access_token,
                    client_id: process.env.REACT_APP_BACKEND_CLIENT_ID,
                    client_secret: process.env.REACT_APP_BACKEND_CLIENT_SECRET,
                    backend: "google-oauth2",
                    grant_type: "convert_token"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            ).then(res => {
                const accessToken = res?.data?.access_token;
                localStorage.setItem("access", JSON.stringify(res?.data?.access_token));
                window.localStorage.setItem("isLoggedIn", "true")
                cookies.set('access', res?.data?.access_token);
                cookies.set('refresh', res?.data?.refresh_token);
                setAuth({ accessToken });
                setShowGoogleLoader(false)
                navigate("/dashboard");
            })
        }

    }, [user, navigate, setAuth])
    const handleLogin = () => {
        axiosPrivate.post(
            "account/token/",
            {
                username: email,
                password: password,
                grant_type: "password",
                client_id: process.env.REACT_APP_BACKEND_CLIENT_ID,
                client_secret: process.env.REACT_APP_BACKEND_CLIENT_SECRET,
            },
        ).then(response => {
            console.log(response?.data, 'data')
            const accessToken = response?.data?.access_token;
            localStorage.setItem("access", JSON.stringify(response?.data?.access_token));
            cookies.set('access', response?.data?.access_token);
            cookies.set('refresh', response?.data?.refresh_token);
            setAuth({ accessToken });
            setEmail('');
            setPassword('');
            setShowLoader(false)
        }).catch(err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('incorrect Username or password ');
            } else {
                setErrMsg('Login Failed');
            }
        })
    }
    const handleSignup = () => {
        setShowLoader(true)
        let body = {
            username: userName,
            email: email,
            password: password,
        }
        axiosPrivate.post('account/register/', body)
            .then(res => {
                if (res?.data?.Success === "User created") {
                    window.localStorage.setItem("isLoggedIn", "true")
                    handleLogin();
                    navigate("/dashboard");
                }
            }).catch(err => {
                setShowLoader(false)
                if (!err?.response) {
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setErrMsg(err.response?.data.Error);
                }
                console.log(errMsg, 'errMcg')
            })
    }
    return (
        <>
            <div className="container mt-2 p-lg-5 p-md-5 p-4">
                {/* <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-12 mx-auto shadow p-lg-5 p-md-5 py-5 px-3 sign-form rounded"> */}
                <Form className='text-center' noValidate validated={validated}>
                    <h4 className='mb-4'>Sign Up</h4>
                    <Link to={""} onClick={() => login()} className="btn btn-form d-flex align-items-center justify-content-center text-center p-2">
                        {showGoogleLoader ? <OvalLoader height={"30px"} width={"30px"} /> : <><div style={{ background: "white", padding: "3px" }} className="me-3">
                            <img
                                src={require('../homepage/img/google.png')}
                                alt="logo"
                            /></div>Continue with Google</>}</Link>
                    <p style={{ fontSize: "18px", fontWeight: "700", color: "#5F5F5FF5" }} className="text-center my-3">OR</p>
                    <div className={errMsg ? "alert alert-danger alert-dismissible fade show" : "offscreen"}>
                        {errMsg}
                        <button type="button" className={errMsg ? "btn-close" : "d-none"} onClick={() => setErrMsg('')}></button>
                    </div>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            id="username"
                            ref={usernameRef}
                            autoComplete="off"
                            className="form-control form-control-lg mb-3"
                            value={userName}
                            placeholder="Username"
                            onChange={(e) => setUserName(e.target.value)}
                            aria-invalid={validUserName ? "false" : "true"}
                            aria-describedby="usernameidnote"
                            onFocus={() => setUserNameFocus(true)}
                            onBlur={() => setUserNameFocus(false)}
                            required />
                        <p id="usernameidnote" style={{ color: "red", fontSize: '14px' }} className={userNameFocus && userName && !validUserName ? "instructions" : "visually-hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                            <span>&nbsp;</span>(4-24) must start with a letter
                        </p>
                    </Form.Group>
                    <Form.Control
                        type="email"
                        id="email"
                        autoComplete="off"
                        className="form-control form-control-lg mb-3"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        required />
                    <p id="uidnote" style={{ color: "red", fontSize: '14px' }} className={emailFocus && email && !validEmail ? "instructions" : "visually-hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                        <span>&nbsp;</span>(example@gmail.com)
                        Must begin with a letter.
                    </p>


                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            id="typePasswordX"
                            className="form-control form-control-lg mb-3"
                            placeholder="Password"
                            autoComplete="on"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" style={{ color: "red", fontSize: "14px" }} className={passwordFocus && password && !validPassword ? "instructions" : "visually-hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                            &nbsp;8 to 24 characters.Must include uppercase or lowercase letters and a number.
                        </p>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            id="confirm_password"
                            className="form-control form-control-lg mb-3"
                            value={matchPassword}
                            autoComplete="on"
                            placeholder="confirm Password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" style={{ color: "red", fontSize: "14px" }} className={matchFocus && !validMatch ? "instructions" : "visually-hidden"}>
                            <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                            &nbsp;Must match the first password input field.
                        </p>
                    </Form.Group>
                    <div className='d-flex flex-column'>
                        <button
                            type="button"
                            disabled={!validUserName || !validEmail || !validPassword || !validMatch || showLoader ? true : false}
                            onClick={handleSignup}
                            className="btn btn-form d-flex align-items-center justify-content-center py-3 px-2 mb-2">
                            {showLoader ? <OvalLoader height={"30px"} width={"30px"} /> : "Create Account"}</button>
                        <small
                            className='mt-2'>Already have an account? <Link to={""} onClick={() => { setShowModal(false); goToLogin(true); }}>Sign in</Link></small>
                    </div>
                </Form>
            </div>
            {/* </div>
            </div> */}
        </>
    )
}

export default SignUp
