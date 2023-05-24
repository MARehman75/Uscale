import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapse from '@mui/material/Collapse';
import { faBars, faTrash, faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Modal from './Modal';


export default function SortableCaptions({
    group,
    handleNewCaptionClick,
    handleNewCaptionSave,
    handleNewCaptionChange,
    handleNewCaptionCancel,
    handleClick,
    handleDeleteCaption,
    handleEditGroupName,
    handleDeleteLabelGroup,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: group.id });

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(group.name);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        handleDeleteLabelGroup(group.id);
        handleCloseModal();
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleEditClickInternal = (event) => {
        event.stopPropagation();
        setIsEditing(true);
        setEditValue(group.name);
    }

    const handleEditCancel = () => {
        setIsEditing(false);
    }

    const handleEditSave = (event) => {
        event.preventDefault();
        setIsEditing(false);
        handleEditGroupName(group.id, editValue);
    }
    console.log(group.id, 'iddd')
    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <div className='modal-head d-flex justify-content-between hashtag' key={group.id}>
                <div className='d-flex flex-column mb-2'>

                    <p style={{ fontSize: '16px' }} className={`d-flex align-items-center ${isEditing ? 'align-items-baseline' : ''}`}>
                        <FontAwesomeIcon icon={faBars} size="lg" className="me-3"  {...listeners} />
                        {isEditing ? (
                            <form onSubmit={handleEditSave} className='d-flex align-items-center my-2'>
                                <FormControl
                                    type="text"
                                    placeholder="Enter group name"
                                    value={editValue}
                                    onChange={(event) => setEditValue(event.target.value)}
                                    style={{ height: "29px" }}
                                />
                                <Button type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                                <Button onClick={handleEditCancel} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                            </form>
                        ) : (
                            <div className='d-flex'>
                                {group.name}
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    type='button'
                                    className="btn mt-2 ms-1 d-none"
                                    onClick={handleEditClickInternal}
                                />
                            </div>
                        )}
                    </p>


                    <Stack direction="row" spacing={1} className="label-group  ms-4 mb-2 d-flex flex-wrap">
                        {group.captions.map((captionObject) => (
                            <Chip
                                key={captionObject.id}
                                label={captionObject.name}
                                onClick={() => handleClick(group.id, captionObject)}
                                onDelete={() => handleDeleteCaption(group.id, captionObject)}
                                className='mt-1 ms-2'
                            />
                        ))}
                    </Stack>

                    <div className='d-flex align-items-center' style={{ marginLeft: "2rem" }}>
                        {group.showInputField ? (
                            <Collapse in={true} className="label-input">
                                <form onSubmit={(event) => handleNewCaptionSave(event, group.id)} className='d-flex align-items-center'>
                                    <FormControl
                                        type="text"
                                        placeholder="New label"
                                        value={group.newLabel}
                                        onChange={(event) => handleNewCaptionChange(event, group.id)}
                                    />
                                    <Button type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                                    <Button onClick={() => handleNewCaptionCancel(group.id)} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                                </form>
                            </Collapse>

                        ) : (
                            <Button onClick={() => handleNewCaptionClick(group.id)} className='btn btn-new d-flex align-items-center justify-content-center'>
                                <FontAwesomeIcon icon={faPlus} size="md" className="me-1"></FontAwesomeIcon>New Caption
                            </Button>
                        )}
                    </div>
                </div>
                <div className='d-flex'>
                    <div className="flex-grow-1">
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            type='button'
                            className="btn mt-2 ms-1"
                            onClick={handleEditClickInternal}
                            style={{ fontSize: '26px' }}
                        />
                    </div>
                    {/* <FontAwesomeIcon icon={faTrash} className="btn mt-2" style={{ fontSize: '26px' }} onClick={() => handleDeleteLabelGroup(group.id)}></FontAwesomeIcon> */}
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="btn mt-2"
                        style={{ fontSize: '26px' }}
                        onClick={handleShowModal}
                    />
                    <Modal show={showModal} handleClose={handleCloseModal} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    )
}
