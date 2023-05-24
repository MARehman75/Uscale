import { useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import useAuth from '../../hooks/useAuth';
import OvalLoader from '../../utils/loaders/Oval';
import CloseButton from 'react-bootstrap/CloseButton';
import { useGoogleLogin } from '@react-oauth/google';
import { axiosPrivate } from '../../api/axios';
const cookies = new Cookies();

const LogIn = ({ goToSignup, setShowModal, goToForget, showAlert, setShowAlert }) => {
    const { setAuth } = useAuth();

    const emailRef = useRef();
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [validated] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showGoogleLoader, setShowGoogleLoader] = useState(false);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => { setUser(codeResponse); setShowGoogleLoader(true) },
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(() => {
        if (user?.access_token) {
            console.log(user, 'user')
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
    const handleLogin = async (e) => {
        setShowLoader(true)
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(
                "account/token/",
                {
                    username: email,
                    password: password,
                    grant_type: "password",
                    client_id: "hXFobwedqCsK61oLy10SfPA1XLIAdCShxuJd18ZJ",
                    client_secret: "6joQ8GWFGKfQHlN8XIVkMauHUuhIDKz0KtV9dhwuWSHXb5TFfcjdjaiTr25YmAoMONbadZV6TxQGNDoCxkAjJm5PQ3onJ1rdS2ePSu1TP7k2FrJdeG4ShLz6x6Lfm32w"
                },
            )
            const accessToken = response?.data?.access_token;
            localStorage.setItem("access", JSON.stringify(response?.data?.access_token));
            window.localStorage.setItem("isLoggedIn", "true")
            cookies.set('access', response?.data?.access_token);
            cookies.set('refresh', response?.data?.refresh_token);
            setAuth({ accessToken });
            setEmail('');
            setPassword('');
            setShowLoader(false)
            navigate("/dashboard");
        } catch (err) {
            setShowLoader(false)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('incorrect email or password');
            } else if (err.response?.status === 401) {
                setErrMsg('incorrect email or password');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    // useEffect(() => {
    //     emailRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])
    return (
        <>
            <div className="container mt-2 p-lg-5 p-md-5 p-4">
                <div className="row">
                    <Form className='text-center' noValidate validated={validated}>
                        <h4 className='mb-4'>Login</h4>
                        {
                            showAlert &&
                            <div className="alert alert-success alert-dismissible position-relative fade show mx-auto alert-style" role="alert">
                                Your password has been changed <strong>successfully!</strong>
                                <div style={{ float: "right", fontSize: '20px' }}><CloseButton onClick={() => setShowAlert(false)} /></div>
                            </div>
                        }
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
                                type="email"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                className="form-control form-control-lg"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="password"
                                className="form-control form-control-lg"
                                name="password"
                                value={password}
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <div className='d-flex flex-column'>
                            <button onClick={handleLogin} type="button" className="btn btn-form d-flex align-items-center justify-content-center py-3 px-2 mb-3" disabled={!email || !password || showLoader}>
                                {showLoader ? <OvalLoader height={"30px"} width={"30px"} /> : "Sign In"}</button>
                            <small><Link onClick={() => { goToForget(true); setShowModal(false); }}>Forgot your password?</Link></small>
                            <small>No account? <Link to={""} onClick={() => { setShowModal(false); goToSignup(true); }}>Create one</Link></small>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LogIn
