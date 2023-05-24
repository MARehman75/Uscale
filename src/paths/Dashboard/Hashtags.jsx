import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
import Collapse from '@mui/material/Collapse';
import { FormControl } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {
    DndContext, closestCenter
} from "@dnd-kit/core"

import {
    arrayMove, SortableContext, verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import SortableHash from "./SortableHash"
import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useRefreshToken from '../../hooks/useRefreshToken';
const cookies = new Cookies();

export default function Hashtags() {
    const [addHashtag, setAddHashtag] = useState(false)
    const [hashtag, setHashtag] = useState('')
    const [hashtagGroups, setHashtagGroups] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const refreshToken = useRefreshToken();
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        axiosPrivate.get("uschedule/hashtags/groups/", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access')}`
            },
            withCredentials: true
        }).then(res => {
            console.log(res.data, 'data')
            if (!res.data.Error) {
                let data = res?.data
                let arr = []
                for (let i = 0; i < data.length; i++) {
                    arr.push(
                        { id: data[i]?.id, name: data[i]?.name, labels: data[i]?.hashtags, showInputField: false, newLabel: '' }
                    )
                }
                setHashtagGroups(arr)
            } else {
                setHashtagGroups([])
            }
        }).catch(err => {
            console.log(err, 'err')

        })
    }, [refresh])
    const handleNewLabelClick = (groupId) => {
        setHashtagGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, showInputField: true } : group
            )
        );
    };

    const handleNewLabelSave = (name, groupId) => {
        axiosPrivate.post("uschedule/hashtags/",
            {
                name: name,
                group: groupId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.get('access')}`
                },
                withCredentials: true
            }
        ).then(res => {
            console.log(res?.data, 'res')
            setRefresh(!refresh)
        }).catch(err => {
            console.log(err, 'err')
        })
    };

    const handleNewLabelChange = (event, groupId) => {
        const newLabel = event.target.value;
        console.log(newLabel, groupId)
        // setHashtagGroups((prevState) =>
        //     prevState.map((group) =>
        //         group.id === groupId ? { ...group, newLabel } : group
        //     )
        // );
    };

    const handleNewLabelCancel = (groupId) => {
        setHashtagGroups((prevState) =>
            prevState.map((group) =>
                group.id === groupId ? { ...group, newLabel: '', showInputField: false } : group
            )
        );
    };

    const handleClick = (groupId, label) => {
        // Placeholder function for handling click on existing label chips
        console.log(`Clicked on label: ${label} in group: ${groupId}`);
    };

    const handleDeleteLabel = (groupId, label) => {
        axios.delete(`uschedule/hashtags/${groupId}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access')}`
            },
            withCredentials: true
        }).then(res => {
            console.log(res.data, 'data')
            setRefresh(!refresh)
        })
    };

    const handleDeleteHash = (groupId) => {
        // setHashtagGroups((prevState) => prevState.filter((group) => group.id !== groupId));
        axiosPrivate.delete(`http://127.0.0.1:8000/uschedule/hashtags/groups/${groupId}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access')}`
            },
            withCredentials: true
        }).then(res => {
            console.log(res.data, 'data')
            setRefresh(!refresh)
        })
    };

    const handleAddGroup = () => {
        // const newGroupId = Math.max(...hashtagGroups.map(group => group.id)) + 1;
        // console.log(newGroupId, 'new group id', hashtagGroups?.length)
        // setHashtagGroups(prevGroups => [
        //     ...prevGroups,
        //     { id: hashtagGroups?.length === 0 ? 1 : newGroupId, name: hashtag, labels: [], showInputField: false, newLabel: '' }
        // ]);
        axiosPrivate.post("uschedule/hashtags/groups/", { name: hashtag }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('access')}`
            },
            withCredentials: true
        }
        ).then(res => {
            console.log(res.data, 'data')
            setHashtag('')
            setAddHashtag(false)
            setRefresh(!refresh)
        })

    };

    const handleDragEnd = (event) => {
        console.log("Drag end called");
        const { active, over } = event;
        console.log("Active: " + active.id);
        console.log("OVER :" + over.id);

        if (active.id !== over.id) {
            setHashtagGroups((items) => {
                const newItems = arrayMove(
                    items,
                    items.findIndex((item) => item.id === active.id),
                    items.findIndex((item) => item.id === over.id)
                );

                console.log("New items: ", newItems);

                return newItems;
            });
        }
    }

    return (

        <div>
            <div className='modal-head d-flex justify-content-between pt-2 pb-0'>
                <div className='label-head d-flex align-items-center'>
                    <p>Hashtag Groups</p>
                </div>
            </div>
            <hr className='mt-0' />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <Container>
                    <SortableContext
                        items={hashtagGroups}
                        strategy={verticalListSortingStrategy}>
                        {hashtagGroups?.map(group => <SortableHash
                            group={group}
                            id={group?.id}
                            handleNewLabelClick={handleNewLabelClick}
                            handleNewLabelSave={handleNewLabelSave}
                            handleNewLabelChange={handleNewLabelChange}
                            handleNewLabelCancel={handleNewLabelCancel}
                            handleClick={handleClick}
                            handleDeleteLabel={handleDeleteLabel}
                            handleDeleteHash={handleDeleteHash}
                            handleAddGroup={handleAddGroup} />)}
                    </SortableContext>
                </Container>
            </DndContext>
            {/* {hashtagGroups.map((group) => (
                
            ))} */}
            <hr />

            {/* <Button className='btn btn-add d-flex align-items-center justify-content-center' onClick={handleAddGroup}>
                <FontAwesomeIcon icon={faPlus} size="md" className="me-2"></FontAwesomeIcon>Add New Hashtag Group</Button> */}
            {!addHashtag ? <Button className='btn btn-add d-flex align-items-center justify-content-center' onClick={() => setAddHashtag(true)}>
                <FontAwesomeIcon icon={faPlus} size="md" className="me-2"></FontAwesomeIcon>Add New Hashtag Group</Button>
                : <Collapse in={true} className="label-input ms-2">
                    <form className='d-flex align-items-center'>
                        <FormControl
                            type="text"
                            placeholder="New group"
                            value={hashtag}
                            onChange={(e) => setHashtag(e.target.value)}
                        />
                        <Button type="button" onClick={handleAddGroup} className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                        <Button onClick={() => setAddHashtag(false)} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                    </form>
                </Collapse>}
        </div>

    )
}
