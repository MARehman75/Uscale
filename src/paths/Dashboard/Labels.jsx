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

import SortableItem from "./SortableItem"
import Alert from './Alert';
import SnackBar from './SnackBar';


export default function Labels() {

    const [labelGroups, setLabelGroups] = useState([]);
    const [addGroup, setAddGroup] = useState(false)
    const [error, setError] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [alert, setAlert] = useState()
    const [groupName, setGroupName] = useState("");


    // Fetch group names from server when page loads
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const respons = await axios.get("http://127.0.0.1:8000/uschedule/tags/label-group/", {
                headers: {
                    "Authorization": "Bearer " + getCookie("access")
                }
            });
            console.log("resp", respons);
            setLabelGroups(respons.data);
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

    const handleNewLabelClick = (groupId) => {
        setLabelGroups(prevGroups => {
            return prevGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, showInputField: true, showNameInputField: false };
                } else {
                    return group;
                }
            });
        });
    };

    const handleNewLabelSave = async (event, groupId, name) => {
        event.preventDefault();
        const group = labelGroups.find((group) => group.id === groupId);
        // Check if a label with the same name already exists in the group
        if (group.labels.some(label => label.name === group.newLabel)) {
            console.error("Error: Label already exists");
            setError(true);
            return;
        }
        try {
            const resp = await axios.post(
                "http://127.0.0.1:8000/uschedule/tags/label/",
                {
                    name: group.newLabel,
                    group: groupId,
                },
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("access"),
                    },
                }
            );
            console.log("new label", resp.data);
            fetchData();
            setError(false);
        } catch (error) {
            console.error("Error while adding new label: ", error);
        }
    };

    const handleNewLabelChange = (event, groupId) => {
        const newLabel = event.target.value;
        setLabelGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, newLabel } : group
            )
        );
    };

    const handleNewLabelCancel = (groupId) => {
        setLabelGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, newLabel: '', showInputField: false } : group
            )
        );
    };

    const handleClick = (groupId, label) => {
        // Placeholder function for handling click on existing label chips
        console.log(`Clicked on label: ${label} in group: ${groupId}`);
    };

    const handleDeleteLabel = async (groupId, label) => {
        try {
            const resp = await axios.delete(
                `http://127.0.0.1:8000/uschedule/tags/label/${label.id}/`,
                {
                    headers: {
                        Authorization: "Bearer " + getCookie("access"),
                    },
                }
            );
            console.log("label deleted", resp.data);
            // setDataFetched(false);
            fetchData();
            setSnackbarOpen(true);
            setAlert("Label has been successfully deleted")
        } catch (error) {
            console.error("Error while deleting label: ", error);
        }
    };

    const handleDeleteLabelGroup = async (groupId, label) => {
        try {
            const del = await axios.delete(`http://127.0.0.1:8000/uschedule/tags/label-group/${groupId}/`, {
                headers: {
                    "Authorization": "Bearer " + getCookie("access")
                }
            });
            console.log("deleted", del)

            // Update the state
            setLabelGroups(labelGroups.filter((group) => group.id !== groupId));
            fetchData();
            const deletedGroup = labelGroups.find((group) => group.id === groupId);
            setSnackbarOpen(true);
            setAlert(`${deletedGroup.name} has been successfully deleted`)
            if (groupName.length === 1) {
                console.error("Error: You cannot delete all the groups.");
            }
        } catch (error) {
            console.error("Error while deleting group: ", error);
        }
    };

    const handleAddGroup = async (event) => {
        event.preventDefault();
        if (groupName.trim() === "") {
            return; // Don't add empty group names
        }
        // Check if a group with the same name already exists
        if (labelGroups.some(group => group.name === groupName)) {
            console.error("Error: Group already exists");
            setError(true);
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/uschedule/tags/label-group/",
                { name: groupName },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + getCookie('access')
                    }
                });
            console.log("resp", response.data);
            setGroupName("")
            setAddGroup(false)
            fetchData();
            setError(false)
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
            setLabelGroups((items) => {
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
        setLabelGroups((prevLabelGroups) => {
            return prevLabelGroups.map((group) => {
                if (group.id === groupId) {
                    return { ...group, newName };
                }
                return group;
            });
        });
    };

    const handleEditGroupName = async (id, newName) => {
        try {
            const resp = await axios.put(`http://127.0.0.1:8000/uschedule/tags/label-group/${id}/`,
                { name: newName },
                {
                    headers: {
                        "Authorization": "Bearer " + getCookie("access")
                    }
                }
            );
            console.log("resp", resp.data);
            const newGroups = [...labelGroups];
            const index = newGroups.findIndex((group) => group.id === id);
            newGroups[index].name = newName;
            setLabelGroups(newGroups);
        } catch (error) {
            console.error("Error while updating group: ", error);
        }
    }


    return (

        <div>
            <div className='modal-head d-flex justify-content-between pt-2 pb-0'>
                <div className='label-head d-flex align-items-center'>
                    <p>Label Groups</p>
                    <em className='ms-5'>Create labels that apply across categories</em>
                </div>
            </div>
            <hr className='mt-0' />
            {labelGroups?.length ? (
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <Container>
                        <SortableContext
                            items={labelGroups}
                            strategy={verticalListSortingStrategy}
                        >
                            {labelGroups?.map(group => (
                                <SortableItem
                                    group={group}
                                    id={group?.id}
                                    handleNewLabelClick={handleNewLabelClick}
                                    handleNewLabelSave={handleNewLabelSave}
                                    handleNewLabelChange={handleNewLabelChange}
                                    handleNewLabelCancel={handleNewLabelCancel}
                                    handleClick={handleClick}
                                    handleDeleteLabel={handleDeleteLabel}
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
                {!addGroup ? <Button className='btn btn-add d-flex align-items-center justify-content-center' onClick={() => setAddGroup(true)}>
                    <FontAwesomeIcon icon={faPlus} size="md" className="me-2"></FontAwesomeIcon>Add New Label Group</Button>
                    : <Collapse in={true} className="label-input ms-2">
                        <form className='d-flex align-items-center'>
                            <FormControl
                                type="text"
                                placeholder="New group"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <Button type="submit" onClick={handleAddGroup} className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                            <Button onClick={() => setAddGroup(false)} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
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
