import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function DelModal({ show, handleClose, handleDelete }) {
    return (
        <div>
            <Modal show={show} onHide={handleClose} id="dl-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this label group?</Modal.Body>
                <Modal.Footer>
                    <Button className="btn-cancel d-flex align-items-center justify-content-center" onClick={handleClose} style={{ maxWidth: '73.99px' }}>
                        Cancel
                    </Button>
                    <Button variant="danger" className="btn-new d-flex align-items-center justify-content-center ms-2" onClick={handleDelete} style={{ maxWidth: '73.99px' }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
