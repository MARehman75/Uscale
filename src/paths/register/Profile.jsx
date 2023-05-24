import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [edit, setEdit] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('03317726261');
    const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('03317726261');
    const [email, setEmail] = useState('abduladeer@nexquery.com');
    const [address, setAdress] = useState(`In publishing and graphic design, Lorem ipsum is a placeholder text commonly used Lahore Pin Code 52000`)
    const [firstName, setFirstName] = useState('Abdul');
    const [lastName, setLastName] = useState('Qadeer');
    const [membershipNumber, setMemberShipNumber] = useState('2134123');
    const [dateOfRegisteration, setDateOfRegisteration] = useState('03-Apr-2023');
    const [image, setImage] = useState('');
    const handleSave = () => { setEdit(false) };
    return (
        <div className='container ' id='Seller-View'>
            <div className='row'>
                <div className='Seller-main shadow  p-5 '>
                    <div className='col-lg-12'>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex'>
                                <h3>My Profile</h3>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-8 order-2'>
                            <div className='seller-form '>
                                <form className="row">

                                    <div className="col-lg-12 col-md-12 col-12 mb-3">
                                        <label htmlFor="inputEmail1" className="form-label"><strong>Phone Number</strong></label>
                                        {!edit ? <h6>03317726261</h6> :
                                            <input
                                                type="text"
                                                className="form-control form_clr"
                                                id="inputEmail1"
                                                name={phoneNumber}
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />}
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-12 mb-3">
                                        <label htmlFor="inputEmail2" className="form-label"><strong>Alternate Contact Number</strong></label>
                                        {!edit ? <h6>03317726261</h6> :
                                            <input
                                                type="text"
                                                className="form-control form_clr"
                                                id="inputEmail2"
                                                name={alternatePhoneNumber}
                                                value={alternatePhoneNumber}
                                                onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                                            />}
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-12 mb-3">
                                        <label htmlFor="inputEmail3" className="form-label"><strong>Email Id</strong></label>
                                        {!edit ? <h6>abduladeer@nexquery.com</h6> :
                                            <input
                                                type="text"
                                                className="form-control form_clr"
                                                id="inputEmail3"
                                                name={email}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />}
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-12 mt-3">
                                        <label htmlFor="inputEmail4" className="form-label"><strong>Address</strong></label>
                                        {!edit ? <h6>In publishing and graphic design, Lorem ipsum is a<br /> placeholder text commonly used <br />Lahore<br /> Pin Code 52000</h6> :
                                            <Form.Group
                                                className=""
                                                controlId="Form.ControlTextarea1"
                                                name={address}
                                                id="message" onChange={(e) => setAdress(e.target.value)}
                                                required>
                                                <Form.Control as="textarea"
                                                    value={address}
                                                    rows={3} placeholder="Write your address here..." />
                                            </Form.Group>}
                                    </div>


                                </form>
                            </div>
                        </div>

                        <div className='col-lg-4 order-1  mb-lg-0 mb-4'>
                            {/* <div className='pic-section p-5'> */}
                            {/* <h3>Add Image</h3> */}
                            <div className="Seller-profilepic-about mt-2" >
                                <center>
                                    <div className="upload__image-wrapper-about">
                                        <div className="image-item">
                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                                        </div>
                                    </div>
                                </center>
                            </div>
                            <div className="col-12 text-center mt-3">
                                <Link to={''} className=" mail-size ">
                                    {firstName} {lastName}
                                </Link>
                                <h6 className='mt-2'>Membership No: {membershipNumber}</h6>
                            </div>
                            <div className='col-12 text-center mt-5'>
                                <h6>Date of Registeration: {dateOfRegisteration}</h6>
                            </div>
                            <div className='col-12 text-center '>
                                {!edit ?
                                    <button className='btn btn-secondary btn-sm' style={{ fontWeight: 10,backgroundColor:"white",color:'#168FFF' }} onClick={() => setEdit(true)}>Edit Profile</button> :
                                    <div className=''>
                                        <button className='btn btn-secondary btn-sm me-1' style={{ fontWeight: 10, width:'4rem' }} onClick={() => setEdit(false)}>Cancel</button>
                                        <button className='btn btn-success btn-sm ms-1' style={{ fontWeight: 10, width:'4rem' }} onClick={() => handleSave()}>Save</button>
                                    </div>}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile