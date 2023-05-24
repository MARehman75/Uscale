import React from 'react';
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import { HuePicker } from 'react-color';
import Button from 'react-bootstrap/Button';
import Collapse from '@mui/material/Collapse';
import { FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Categories() {
    const CategoriesRow = ({ newCategory, onDelete, id, recentColors }) => {
        const [selectedBox, setSelectedBox] = useState(false);
        const [currentColor, setCurrentColor] = useState("#FFFFFF");
        const [showModal, setShowModal] = useState(false);
        const [isSelected, setIsSelected] = useState(false);
        const [selectedBoxId, setSelectedBoxId] = useState(0);
        const [isActive, setIsActive] = useState(false)

        // const raju = (a)=>{
        //     // return a
        //     setSelectedBoxId(a)
        //     console.log(selectedBoxId)
        // }

        // console.log(recentColors)
        // const selectedBoxIds = recentColors.map(box => box.id);
        // console.log(selectedBoxIds)
        // console.log(recentColors[0].id)
        // console.log(id)
        // console.log(newCategory)
        // console.log(onDelete)

        // const data = recentColors
        // const RecentColorsIds = data.map(item => item.id);
        // const extractedRecentColors = data.map(item => item.color);

        // console.log(RecentColorsIds)
        // console.log(extractedRecentColors)

        const renderBoxes = () => {
            const maxBoxes = 3;
            const boxes = [];
            for (let i = 0; i < maxBoxes; i++) {
                const box = recentColors[i];
                // console.log(box)
                const backgroundColor = box ? box.color : '#FFFFFF';
                const boxElement = (
                    <div
                        // box-${i}
                        key={box ? box.id : `box-${i}`}
                        // id={box ? box.id : ''}
                        className='clr-div save-box'
                        style={{ backgroundColor }}
                        onClick={(event) => handleBoxClick(event, box.id)}
                    ></div>
                );
                boxes.push(boxElement);
                // console.log(boxElement)
            }
            return boxes;
        };

        const handleBoxClick = (event, key) => {
            const box = event.target;

            if (box.id === "nofill") {
                setCurrentColor('#FFFFFF');
                setSelectedBox(false);
                return;
            }
            if (selectedBox) {
                selectedBox.style.border = "1px solid #D9D9D9";
            }
            setSelectedBox(box);
            box.style.border = "4px solid #0064ff";
            setCurrentColor(box.style.backgroundColor);
            box.dataset.color = box.style.backgroundColor;
            const boxId = key
            // console.log("Clicked box ID is:", boxId)
            setSelectedBoxId(boxId)
            setIsActive(true)
            // console.log(selectedBoxId)
            // updateCategoriesColors(box.style.backgroundColor, id, isSelected, recentColors[0].id)
            // console.log(box.style.backgroundColor, id, isSelected, recentColors[0].id)
            setIsSelected(false)
        }
        //if i have a function boxClick and i am passing the id of the box in this function as argument , if i want to set the value of a state as Id of the box when the box is clicked

        const handleOnChange = (color) => {
            const newColor = color.hex;
            setCurrentColor(newColor);
            if (selectedBox) {
                selectedBox.style.backgroundColor = newColor;
                selectedBox.dataset.color = newColor;
                console.log(newColor, id)
                storeCategoriesColors(newColor, id)
                updateCategoriesColors(newColor, id, isActive, selectedBoxId)
                // console.log(newColor, id, isSelected, recentColors[0].id)
            }
            setIsSelected(false)
            
        };
        // const accessToken = cookies.get('access');
        const storeCategoriesColors = async (color, category) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/uschedule/tags/category-colors/',
                    {
                        color: color,
                        category: category
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const updateCategoriesColors = async (color, category, is_active, id) => {
            // console.log(document.cookie);
            try {
                const response = await axios.put(`http://127.0.0.1:8000/uschedule/tags/category-colors/${id}/`,
                    {
                        color: color,
                        category: category,
                        is_active: is_active
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
            console.log(color, category, is_active, id)
        };



        const handleDelete = () => {
            setShowModal(true);
        };
        const handleConfirmDelete = () => {
            onDelete();
            // close the modal
            setShowModal(false);
        };
        const handleCancelDelete = () => {
            setShowModal(false);
        };

        useEffect(() => {
            if (selectedBox) {
                selectedBox.style.border = "4px solid #0064ff";
            }
        }, [selectedBox]);
        useEffect(() => {
            setIsSelected(true);
        }, []);
        const selectedStyle = {
            border: isSelected ? '4px solid #0064ff' : "1px solid #D9D9D9"
        };

        const appstyle = {
            backgroundColor: currentColor
        }

        return (
            <>
                <div id="sch-table" className="color-picker-container">
                    <Table responsive>

                        <tbody className='tag-td'>
                            <tr>
                                <td><div className='d-flex align-items-center'><FontAwesomeIcon icon={faBars} size="lg" className="ms-1 pe-2"></FontAwesomeIcon>
                                    <div className='color-div z-index d-flex align-items-center px-3 position-relative'>
                                        {newCategory}
                                        <span className='border border-dark' style={appstyle}></span>
                                    </div>
                                </div> </td>
                                <td className='d-flex mt-1' id='nofill'>
                                    <div className={`clr-div save-box`} style={{ ...selectedStyle, backgroundColor: '#FFFFFF' }} onClick={handleBoxClick} ></div>
                                </td>
                                <td>
                                    <Form className='d-flex mt-1' style={{ borderRight: "1px solid #D9D9D9", borderLeft: "1px solid #D9D9D9", paddingLeft: '20px', paddingRight: '20px' }}>
                                        {/* {[0, 1, 2].map((index) => {
                                            const color = recentColors[index]?.color || '#FFFFFF';
                                            const id = recentColors[index]?.id;
                                            console.log(id)
                                            return (
                                            <div
                                                key={index}
                                                className='clr-div save-box'
                                                style={{ backgroundColor: color || '#FFFFFF' }}
                                                // style={{ backgroundColor:  recentColors[index]?.color || '#FFFFFF' }}
                                                onClick={()=>handleBoxClick(id)}
                                            ></div>)
                                            })} */}

                                        {/* {recentColors.map(box => (
                                            <div
                                                key={box.id}
                                                className='clr-div save-box'
                                                style={{ backgroundColor: box.color || '#FFFFFF' }}
                                                onClick={handleBoxClick}
                                            ></div>
                                        ))} */}
                                        {renderBoxes()}
                                    </Form>
                                </td>
                                <td className='px-4 d-flex align-items-center' style={{ paddingTop: "2rem" }}>
                                    <div className=' d-flex align-items-center justify-content-between'>
                                        < HuePicker
                                            color={currentColor}
                                            onChangeComplete={handleOnChange}
                                        />
                                        <FontAwesomeIcon onClick={handleDelete} icon={faTrash} size="xl" className="btn ms-1 pe-2 py-0" style={{ fontSize: '19px' }}></FontAwesomeIcon>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Modal show={showModal} onHide={handleCancelDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete {newCategory}?</Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" className='btn-cancel d-flex align-items-center justify-content-center ms-2' style={{ width: "73.99px" }} onClick={handleCancelDelete}>
                                Cancel
                            </Button>
                            <Button variant="danger" type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "73.99px" }} onClick={handleConfirmDelete}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }

    const Alert = () => {
        return (
            <div>
                <div className="alert alert-secondary" role="alert">
                    "No Category found. Please create a new Category to continue."
                </div>
            </div>
        )
    }


    const [colorPickers, setColorPickers] = useState([]);
    const [showInputField, setShowInputField] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [err, setErr] = useState();

    //http://127.0.0.1:8000/uschedule/tags/category/

    const accessToken = cookies.get('access');
    const storeCategories = async (name) => {
        // console.log(document.cookie);
        try {
            const response = await axios.post('http://127.0.0.1:8000/uschedule/tags/category/',
                {
                    name: name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteColorPickerById = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/uschedule/tags/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setColorPickers(colorPickers.filter((colorPicker) => colorPicker.key !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getCategories = async () => {
            const accessToken = cookies.get('access');

            try {
                const response = await axios.get('http://127.0.0.1:8000/uschedule/tags/category/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                let array = response?.data
                let dataToSave = array?.map(elem =>
                    <CategoriesRow newCategory={elem?.name} key={elem?.id} id={elem?.id} recentColors={elem?.recent_colors} />
                )
                setColorPickers(dataToSave);
            } catch (error) {
                console.error(error);
            }
        };
        getCategories()
    }, [])

    const handleNewCategoryClick = () => {
        setShowInputField(!showInputField);
        setErr('')
    };
    const handleNewCategorySave = (event) => {
        event.preventDefault();

        const alredyAdded = colorPickers.find(
            (component) => component.key === newCategory
        );
        if (alredyAdded) {
            setErr(`Category ${newCategory} already exist`)
        }
        //key={colorPickers.length}
        else {
            setColorPickers([...colorPickers, <CategoriesRow newCategory={newCategory} />]);
            // setColorPickers([...colorPickers, {newCategory: newCategory}]);
            setNewCategory('');
            storeCategories(newCategory);
            setShowInputField(false);
        }
    };
    const handleNewCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };
    const handleNewCategoryCancel = () => {
        setNewCategory('');
        setShowInputField(false);
    };

    const isSaveDisabled = newCategory === '';

    const hasCategories = colorPickers.length > 0;

    return (
        <>
            {hasCategories ? (
                <>
                    <div id="sch-table">
                        <Table responsive>
                            <thead className='tag-head'>
                                <tr>
                                    <th style={{ paddingLeft: '40px', paddingRight: '0px' }}>Category Name</th>
                                    <th style={{ paddingLeft: '20px', paddingRight: '0px' }}>No Fill</th>
                                    <th style={{ paddingLeft: '0px', paddingRight: '0px' }}>Recent Colors</th>
                                    <th style={{ paddingLeft: '0px', paddingRight: '70px' }}>More Colors</th>
                                </tr>
                            </thead>
                        </Table>

                        {colorPickers.map((colorPicker) => (
                            <tr key={colorPicker.key}>
                                <td>{React.cloneElement(colorPicker, { onDelete: () => deleteColorPickerById(colorPicker.key) })}</td>
                            </tr>
                        ))}
                    </div>
                </>) : <Alert />
            }

            <div>
                {showInputField ? (
                    <Collapse in={showInputField} className="label-input ms-2">
                        <form onSubmit={handleNewCategorySave} className='d-flex align-items-center'>
                            <FormControl
                                type="text"
                                placeholder="New Category"
                                value={newCategory}
                                onChange={handleNewCategoryChange}
                            />
                            <Button disabled={isSaveDisabled} type="submit" className='btn-new d-flex align-items-center justify-content-center ms-2' style={{ width: "43.99px" }}>Save</Button>
                            <Button onClick={handleNewCategoryCancel} className='btn-cancel d-flex align-items-center justify-content-center ms-2'>Cancel</Button>
                        </form>
                        <h6 style={{ color: 'red' }}>{err}</h6>
                    </Collapse>

                ) : (
                    <Button onClick={handleNewCategoryClick} variant="light" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', backgroundColor: "white", color: "#0064ff" }}><FontAwesomeIcon icon={faPlus} size="md" className="me-1"></FontAwesomeIcon>Add New Category Tag</Button>
                )}
            </div>

        </>
    )
}
