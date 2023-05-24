import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
const DeleteModal = ({
    showModel, setShowModel, itemName, itemId, deleteFunction
}) => {
    const handleClose = () => {
        setShowModel(false)
    };
    return (
        <>
            <Modal show={showModel} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {itemName}?</Modal.Body>
                <Modal.Footer>
                    <Button type="submit" className='btn-cancel d-flex align-items-center justify-content-center ms-2' style={{ width: "73.99px" }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "73.99px" }} onClick={() => deleteFunction(itemId)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteModal;