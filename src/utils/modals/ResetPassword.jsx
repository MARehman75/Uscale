import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import OvalLoader from '../../utils/loaders/Oval';
import { axiosPrivate } from '../../api/axios';
const password_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;

const ResetPassword = () => {
    const { id, token } = useParams();
    const [validated] = useState(false)
    const [showAlert, setShowAlert] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false)
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    useEffect(() => {
        setValidPassword(password_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])
    const handleSignup = () => {
        setErrMsg('')
        setShowAlert('')
        setShowLoader(true)
        let body = {
            password: password,
        }
        axiosPrivate.put(`account/user/reset-password/${id}/${token}/`, body)
            .then(res => {
                setShowAlert(res?.data?.Success)
                setShowLoader(false)
                setShowSignIn(true)
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
            <div className="container mt-5 p-lg-5 p-md-5 p-4">
                <div className="row">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-12 mx-auto shadow p-lg-5 p-md-5 py-5 px-3 sign-form rounded">
                        <Form className='text-center' noValidate validated={validated}>
                            <div className={errMsg ? "alert alert-danger alert-dismissible fade show" : "offscreen"}>
                                {errMsg}
                                <button type="button" className={errMsg ? "btn-close" : "d-none"} onClick={() => setErrMsg('')}></button>
                            </div>
                            <div className={showAlert ? "alert alert-info alert-dismissible fade show" : "offscreen"}>
                                {showAlert}
                                <button type="button" className={showAlert ? "btn-close" : "d-none"} onClick={() => setShowAlert('')}></button>
                            </div>
                            <h4 className='mb-4'>Reset Password</h4>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="password"
                                    id="typePasswordX"
                                    className="form-control mb-3"
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
                                <p
                                    id="pwdnote"
                                    style={{ color: "red", fontSize: "14px" }}
                                    className={passwordFocus && password && !validPassword ? "instructions" : "visually-hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                                    &nbsp;8 to 24 characters.Must include uppercase or lowercase letters and a number.
                                </p>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    type="password"
                                    id="confirm_password"
                                    className="form-control mb-3"
                                    value={matchPassword}
                                    autoComplete="on"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p
                                    id="confirmnote"
                                    style={{ color: "red", fontSize: "14px" }}
                                    className={matchFocus && !validMatch ? "instructions" : "visually-hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} style={{ color: "red" }} />
                                    &nbsp;Must match the first password input field.
                                </p>
                            </Form.Group>
                            <div className='d-flex flex-column'>
                                <button
                                    type="button"
                                    disabled={!validPassword || !validMatch || showLoader ? true : false}
                                    onClick={handleSignup}
                                    className="btn btn-form d-flex align-items-center justify-content-center py-3 px-2 mb-2">
                                    {showLoader ? <OvalLoader height={"30px"} width={"30px"} /> : "Change Password"}
                                </button>
                                {showSignIn
                                    &&
                                    <small>
                                        <Link to={"/?success=true"} >
                                            Sign in
                                        </Link>
                                    </small>
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;