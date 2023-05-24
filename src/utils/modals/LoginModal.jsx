import Modal from 'react-bootstrap/Modal';
import LogIn from '../../paths/register/LogIn';
import CloseButton from 'react-bootstrap/CloseButton';
const LoginModal = ({
    showModal, setShowModal, goToSignup, goToForget, showAlert, setShowAlert
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
                    <div style={{ float: "right", fontSize: '20px' }}><CloseButton onClick={handleClose} /></div>
                    <LogIn goToSignup={goToSignup} setShowModal={setShowModal} goToForget={goToForget} showAlert={showAlert} setShowAlert={setShowAlert} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default LoginModal;