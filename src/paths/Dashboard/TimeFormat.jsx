import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import TimezoneSelect from 'react-timezone-select'

export default function TimeFormat() {

    const [selectedTimezone, setSelectedTimezone] = useState({})


    return (
        <div>
            <div className='modal-head d-flex justify-content-between py-3'>
                <p>First Day of the Week</p>
                <Form.Select aria-label="Default select example" id='select-day'>
                    <option>Selection Day</option>
                    <option value="1">Sunday</option>
                    <option value="2">Monday</option>
                    <option value="3">Tuesday</option>
                    <option value="4">Wednesday</option>
                    <option value="5">Thursday</option>
                    <option value="6">Friday</option>
                    <option value="7">Saturday</option>
                </Form.Select>

            </div>
            <hr className='mt-0' />
            <div className='modal-head d-flex justify-content-between'>
                <p>Time Format</p>
                <Form>
                    {['radio'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3 modal-bd d-flex">

                            <div className='d-flex align-items-center'>
                                <p className='me-3'>12-hour</p>
                                <Form.Check
                                    inline
                                    // label="1"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                /></div>
                            <div className='d-flex align-items-center'>
                                <p className='me-3'>24-hour</p>
                                <Form.Check
                                    inline
                                    // label="2"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>

                        </div>
                    ))}
                </Form>

            </div>
            <hr className='mt-0' />
            <div className='modal-head d-flex justify-content-between'>
                <p>Set Timezone</p>
                <div className="select-wrapper">
                    <TimezoneSelect
                        value={selectedTimezone}
                        onChange={setSelectedTimezone}
                    />
                </div>
            </div>
            <hr />
        </div>
    )
}
