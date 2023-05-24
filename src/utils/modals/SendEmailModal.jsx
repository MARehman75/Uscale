import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import SendEmail from '../../paths/register/SendEmail';
const SendEmailModal = ({
    showModal, setShowModal
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
                    <SendEmail />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default SendEmailModal;