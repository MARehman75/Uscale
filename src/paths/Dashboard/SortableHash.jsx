import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Collapse from '@mui/material/Collapse';
import { faBars, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import DeleteModal from '../../utils/modals/DeleteModal';


export default function SortableHash({
    id,
    group,
    handleNewLabelClick,
    handleNewLabelSave,
    handleNewLabelChange,
    handleNewLabelCancel,
    handleClick,
    handleDeleteLabel,
    handleDeleteHash,
}) {
    const [addHashtag, setAddHashtag] = useState(false)
    const [hashtag, setHashtag] = useState('')
    const [showModel, setShowModel] = useState(false)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const handleAddHashTag = () => {
        setAddHashtag(true)
        handleNewLabelClick(id)
    }
    const handleCancelAddHashTag = () => {
        setAddHashtag(false)
        handleNewLabelCancel(id)
    }
    const handleSaveNewHashTag = () => {
        setAddHashtag(false)
        handleNewLabelSave(hashtag, id)
        setHashtag('')
    }
    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <DeleteModal
                showModel={showModel}
                setShowModel={setShowModel}
                itemType={"Hashtag"}
                itemName={group.name}
                itemId={id}
                deleteFunction={handleDeleteHash}
            />
            <div className='modal-head d-flex justify-content-between hashtag' key={id}>
                <div className='d-flex flex-column'>
                    <p style={{ fontSize: '16px' }} {...listeners}><FontAwesomeIcon icon={faBars} size="lg" className="me-3"></FontAwesomeIcon>{group.name}</p>
                    <Stack direction="row" spacing={1} className="label-group mt-2 ms-5 mb-1">
                        {group.labels.map((label) => (
                            <Chip
                                key={label?.id}
                                label={label?.name}
                                onClick={() => handleClick(label?.id, label?.name)}
                                onDelete={() => handleDeleteLabel(label?.id, label?.name)}
                            />
                        ))}
                    </Stack>
                    <div className='d-flex align-items-center ms-5'>
                        {!addHashtag ? <Button onClick={() => handleAddHashTag()} className='btn btn-new d-flex align-items-center justify-content-center'>
                            <FontAwesomeIcon icon={faPlus} size="md" className="me-1"></FontAwesomeIcon>New Hashtag</Button>
                            : <Collapse in={group.showInputField} className="label-input ms-2">
                                <form onSubmit={() => handleSaveNewHashTag()} className='d-flex align-items-center'>
                                    <FormControl
                                        type="text"
                                        placeholder="New label"
                                        value={hashtag}
                                        onChange={(event) => setHashtag(event.target.value)}
                                    />
                                    <Button type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                                    <Button onClick={() => handleCancelAddHashTag()} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                                </form>
                            </Collapse>}
                    </div>

                </div>
                <FontAwesomeIcon icon={faTrash} size="xl" className="btn mt-2" style={{ fontSize: '26px' }} onClick={() => setShowModel(true)}></FontAwesomeIcon>
            </div>
        </div>
    )
}
