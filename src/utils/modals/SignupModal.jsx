import Modal from 'react-bootstrap/Modal';
import SignUp from '../../paths/register/SignUp';
import CloseButton from 'react-bootstrap/CloseButton';
const SignupModal = ({
    showModal, setShowModal,goToLogin
}) => {

    const handleClose = () => {
        setShowModal(false)
    };
    return (
        <>
            <Modal show={showModal} onHide={handleClose}
                aria-labelledby="example-custom-modal-styling-title"
                dialogClassName="modal-width"
                centered
                animation={false}>
                
                <Modal.Body>
                <div style={{float:"right",fontSize:'20px'}}><CloseButton onClick={handleClose}/></div>
                    <SignUp goToLogin={goToLogin} setShowModal={setShowModal}/>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default SignupModal;