import { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faBars, faClock } from '@fortawesome/free-solid-svg-icons';
import TimePicker from 'react-time-picker';
import Form from 'react-bootstrap/Form';
import MySwitch from './IosSwitch';




export default function Campaign() {

    const [checked, setChecked] = useState(true);

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
    };

    const [schedule, setSchedule] = useState([
        { day: "Sunday", time: { start: null, end: null } },
        { day: "Monday", time: { start: null, end: null } },
        { day: "Tuesday", time: { start: null, end: null } },
        { day: "Wednesday", time: { start: null, end: null } },
        { day: "Thursday", time: { start: null, end: null } },
        { day: "Friday", time: { start: null, end: null } },
        { day: "Saturday", time: { start: null, end: null } },
    ]);

    const handleTimeChange = (dayIndex, timeType, newTime) => {
        setSchedule(prevSchedule => {
            const updatedDay = { ...prevSchedule[dayIndex] };
            updatedDay.time[timeType] = newTime;
            const updatedSchedule = [...prevSchedule];
            updatedSchedule[dayIndex] = updatedDay;
            return updatedSchedule;
        });
    };
    return (
        <div>
            <div>
                <div className='d-flex p-0' style={{ overflowX: "auto" }}>

                    <FormGroup className='modal-bd px-4'>
                        <div className='d-flex align-items-center'>
                            <p className='mb-0 me-3'>Recycle Posts</p>
                            <FormControlLabel
                                control={
                                    <MySwitch
                                        checked={checked}
                                        onChange={handleSwitchChange}
                                    />
                                }
                            />
                        </div>
                        <em>Re-uses your posts</em>


                    </FormGroup>
                    <FormGroup className='modal-bd ps-2 pe-4'>
                        <div className='d-flex align-items-center'>
                            <p className='mb-0 me-3'>Pause Queue</p>
                            <FormControlLabel
                                control={
                                    <MySwitch
                                        checked={checked}
                                        onChange={handleSwitchChange}
                                    />
                                }z
                            />
                        </div>
                        <em>
                            Pauses all posts in the queue</em>


                    </FormGroup>
                    <div className='modal-bd'>
                        <div className='d-flex align-items-center'>
                            <p className='mb-0 me-3'>Reset Queue</p><button className='btn btn-reset d-flex align-items-center justify-content-center'>Reset</button></div>
                        <em>Cancels all posts in the queue</em>
                    </div>
                </div>
                <hr />
                <div className='d-flex'>
                    <div className='d-flex align-items-center'>
                        <FontAwesomeIcon icon={faBars} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>
                        <div className='christ me-2'></div><p style={{ fontSize: "16px", fontWeight: "700", color: "#168fff", whiteSpace: "nowrap" }}>Christmas Campaign</p><button className='btn ms-3' style={{ fontSize: "12px", fontWeight: "400", color: "#bdbdbd" }}>Edit</button>
                    </div>
                    <div className='d-flex align-items-center'>
                        <Form.Select aria-label="Default select example" id='drop-days'>
                            <option>7-Day</option>
                            <option value="1">6-Day</option>
                            <option value="2">12-Day</option>
                            <option value="3">14-Day</option>
                        </Form.Select>
                        <div className='tb-date ms-5' style={{ whiteSpace: 'nowrap' }}>
                            <FontAwesomeIcon icon={faCalendar} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>Nov 15 - Dec 26,2022 <span className='ms-5'> <FontAwesomeIcon icon={faClock} size="lg" className="ms-1 pe-2" style={{ color: "#5f5f5f" }}></FontAwesomeIcon>12 Scheduled</span>
                        </div>
                    </div>

                </div>
                <hr className='mb-0' />
                <div id="sch-table">
                    <Table responsive>

                        <tbody className='schedule-td'>
                            {schedule.map((day, index) => (
                                <tr key={index}>
                                    <td style={{ width: "158px" }} className='pt-3'>{day.day}</td>
                                    <td style={{ width: "89px" }}>
                                        <FormGroup className="modal-bd">
                                            <FormControlLabel
                                                control={
                                                    <MySwitch
                                                        checked={checked}
                                                        onChange={handleSwitchChange}
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </td>
                                    <td className='pt-3'>
                                        <TimePicker
                                            value={day.time.start}
                                            onChange={newTime =>
                                                handleTimeChange(index, "start", newTime)
                                            }
                                        />
                                        <TimePicker
                                            className='ms-lg-2 ms-4'
                                            value={day.time.end}
                                            onChange={newTime => handleTimeChange(index, "end", newTime)}
                                        />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
