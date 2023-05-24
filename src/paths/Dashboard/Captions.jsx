import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Collapse from '@mui/material/Collapse';
import axios from "axios";
import { FormControl } from 'react-bootstrap';
import {
    DndContext, closestCenter
} from "@dnd-kit/core"

import {
    arrayMove, SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import SortableCaptions from "./SortableCaptions"
import Alert from './Alert';
import SnackBar from './SnackBar';


export default function Captions() {

    const [captionGroups, setCaptionGroups] = useState([]);
    const [addCaption, setAddCaption] = useState(false)
    const [error, setError] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alert, setAlert] = useState()
    const [captionName, setCaptionName] = useState("");


    // Fetch group names from server when page loads
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const respons = await axios.get("http://127.0.0.1:8000/uschedule/captions/groups/", {
                headers: {
                    "Authorization": "Bearer " + getCookie("access")
                }
            });
            console.log("resp", respons);
            setCaptionGroups(respons.data);
            // setDataFetched(true);
        } catch (error) {
            console.error("Error while fetching groups: ", error);
        }
    };

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const handleNewCaptionClick = (groupId) => {
        setCaptionGroups(prevGroups => {
            return prevGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, showInputField: true, showNameInputField: false };
                } else {
                    return group;
                }
            });
        });
    };

    const handleNewCaptionSave = async (event, groupId, name) => {
        event.preventDefault();
        const group = captionGroups.find((group) => group.id === groupId);
        // Check if a label with the same name already exists in the group
        if (group.captions.some(caption => caption.name === group.newCaption)) {
            console.error("Error: Caption already exists");
            setError(true);
            return;
        }
        try {
            const resp = await axios.post(
                "http://127.0.0.1:8000/uschedule/captions/",
                {
                    name: group.newCaption,
                    group: groupId,
                },
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("access"),
                    },
                }
            );
            console.log("new caption", resp.data);
            fetchData()
            setError(false);
        } catch (error) {
            console.error("Error while adding new caption: ", error);
        }
    };

    const handleNewCaptionChange = (event, groupId) => {
        const newCaption = event.target.value;
        setCaptionGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, newCaption } : group
            )
        );
    };

    const handleNewCaptionCancel = (groupId) => {
        setCaptionGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, newCaption: '', showInputField: false } : group
            )
        );
    };

    const handleClick = (groupId, caption) => {
        // Placeholder function for handling click on existing caption chips
        console.log(`Clicked on caption: ${caption} in group: ${groupId}`);
    };

    const handleDeleteCaption = async (groupId, caption) => {
        try {
            const resp = await axios.delete(
                `http://127.0.0.1:8000/uschedule/captions/${caption.id}/`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("access"),
                    },
                }
            );
            console.log("caption deleted", resp.data);
            // setDataFetched(false);
            fetchData();
            setSnackbarOpen(true);
            setAlert("Caption has been successfully deleted")
        } catch (error) {
            console.error("Error while deleting caption: ", error);
        }
    };

    const handleDeleteLabelGroup = async (groupId, caption) => {
        try {
            const del = await axios.delete(`http://127.0.0.1:8000/uschedule/captions/groups/${groupId}/`, {
                headers: {
                    "Authorization": "Bearer " + getCookie("access")
                }
            });
            console.log("deleted", del)

            // Update the state
            setCaptionGroups(captionGroups.filter((group) => group.id !== groupId));
            fetchData();
            const deletedGroup = captionGroups.find((group) => group.id === groupId);
            setSnackbarOpen(true);
            setAlert(`${deletedGroup.name} has been successfully deleted`)
            if (captionName.length === 1) {
                console.error("Error: You cannot delete all the groups.");
            }
        } catch (error) {
            console.error("Error while deleting group: ", error);
        }
    };

    const handleAddCaption = async (event) => {
        event.preventDefault();
        if (captionName.trim() === "") {
            return; // Don't add empty group names
        }
        // Check if a group with the same name already exists
        if (captionGroups.some(group => group.name === captionName)) {
            console.error("Error: Group already exists");
            setError(true);
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/uschedule/captions/groups/",
                { name: captionName },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + getCookie('access')
                    }
                });
            console.log("resp", response.data);
            setCaptionName("")
            setAddCaption(false)
            fetchData();
            setError(false);
        } catch (error) {
            console.error("Error while adding group: ", error);
        }
    };

    const handleDragEnd = (event) => {
        console.log("Drag end called");
        const { active, over } = event;
        console.log("Active: " + active.id);
        console.log("OVER :" + over.id);

        if (active.id !== over.id) {
            setCaptionGroups((items) => {
                const newItems = arrayMove(
                    items,
                    items.findIndex((item) => item.id === active.id),
                    items.findIndex((item) => item.id === over.id)
                );

                console.log("New items: ", newItems);

                return newItems;
            });
        }
        // fetchData()
    }

    const handleNewGroupNameChange = (groupId, newName) => {
        setCaptionGroups((prevCaptionGroups) => {
            return prevCaptionGroups.map((group) => {
                if (group.id === groupId) {
                    return { ...group, newName };
                }
                return group;
            });
        });
    };

    const handleEditGroupName = async (id, newName) => {
        try {
            const resp = await axios.put(`http://127.0.0.1:8000/uschedule/captions/groups/${id}/`,
                { name: newName },
                {
                    headers: {
                        "Authorization": "Bearer " + getCookie("access")
                    }
                }
            );
            console.log("resp", resp.data);
            const newGroups = [...captionGroups];
            const index = newGroups.findIndex((group) => group.id === id);
            newGroups[index].name = newName;
            setCaptionGroups(newGroups);
        } catch (error) {
            console.error("Error while updating group: ", error);
        }
    }


    return (

        <div>
            <div className='modal-head d-flex justify-content-between pt-2 pb-0'>
                <div className='label-head d-flex align-items-center'>
                    <p>Caption Groups</p>
                    <em className='ms-5'>Create captions that apply across categories</em>
                </div>
            </div>
            <hr className='mt-0' />
            {captionGroups?.length ? (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <Container>
                        <SortableContext
                            items={captionGroups}
                            strategy={verticalListSortingStrategy}
                        >
                            {captionGroups?.map(group => (
                                <SortableCaptions
                                    group={group}
                                    id={group?.id}
                                    handleNewCaptionClick={handleNewCaptionClick}
                                    handleNewCaptionSave={handleNewCaptionSave}
                                    handleNewCaptionChange={handleNewCaptionChange}
                                    handleNewCaptionCancel={handleNewCaptionCancel}
                                    handleClick={handleClick}
                                    handleDeleteCaption={handleDeleteCaption}
                                    handleDeleteLabelGroup={handleDeleteLabelGroup}
                                    handleNewGroupNameChange={handleNewGroupNameChange}
                                    handleEditGroupName={handleEditGroupName}
                                // handleAddGroup={handleAddGroup}
                                // AddGroupForm={AddGroupForm}
                                />
                            ))}
                        </SortableContext>
                    </Container>
                </DndContext>
            ) : (
                <div>
                    <Alert />
                </div>
            )}

            <hr />

            {/* <Button className='btn btn-add d-flex align-items-center justify-content-center' onClick={handleAddGroup}>
                <FontAwesomeIcon icon={faPlus} size="md" className="me-2"></FontAwesomeIcon>Add New Label Group</Button> */}
            <div className="add-group-form-container">
                {!addCaption ? <Button className='btn btn-add d-flex align-items-center justify-content-center' onClick={() => setAddCaption(true)}>
                    <FontAwesomeIcon icon={faPlus} size="md" className="me-2"></FontAwesomeIcon>Add New Caption Group</Button>
                    : <Collapse in={true} className="label-input ms-2">
                        <form className='d-flex align-items-center'>
                            <FormControl
                                type="text"
                                placeholder="New group"
                                value={captionName}
                                onChange={(e) => setCaptionName(e.target.value)}
                            />
                            <Button type="submit" onClick={handleAddCaption} className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                            <Button onClick={() => setAddCaption(false)} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                        </form>
                    </Collapse>}
            </div>
            {error &&
                <p p style={{ color: "red", fontSize: "14px" }}>Error: That name already exists</p>
            }
            <SnackBar
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                alert={alert}
                setAlert={setAlert}
            />
        </div>

    );
}
