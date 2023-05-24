import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import OvalLoader from '../../utils/loaders/Oval';
import { axiosPrivate } from '../../api/axios';
const SendEmail = () => {
    const [validated] = useState(false)
    const [showAlert, setShowAlert] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [email, setEmail] = useState('');
    const handleSignup = () => {
        setShowLoader(true)
        let body = {
            email: email,
        }
        axiosPrivate.post('account/user/reset-password/email/', body)
            .then(res => {
                setShowAlert(res?.data?.Success)
                setShowLoader(false)
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
                <Form className='text-center' noValidate validated={validated}>
                    <div className={errMsg ? "alert alert-danger alert-dismissible fade show" : "offscreen"}>
                        {errMsg}
                        <button type="button" className={errMsg ? "btn-close" : "d-none"} onClick={() => setErrMsg('')}></button>
                    </div>
                    <div className={showAlert ? "alert alert-info alert-dismissible fade show" : "offscreen"}>
                        {showAlert}
                        <button type="button" className={showAlert ? "btn-close" : "d-none"} onClick={() => setShowAlert('')}></button>
                    </div>
                    <h4 className='mb-4'>Enter your email address to reset your password.</h4>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="email"
                            id="email"
                            autoComplete="off"
                            className="form-control "
                            name="email"
                            value={email}
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </Form.Group>
                    <div className='d-flex flex-column'>
                        <button
                            type="button"
                            disabled={!email || showLoader ? true : false}
                            onClick={handleSignup}
                            className="btn btn-form d-flex align-items-center justify-content-center py-3 px-2 mb-2">
                            {showLoader ? <OvalLoader height={"30px"} width={"30px"} /> : "Varify Email"}
                        </button>
                    </div>
                </Form>
            </div>
        </>
    )
}
export default SendEmail;