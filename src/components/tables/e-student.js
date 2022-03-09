import React from "react";
import '../MainStyleSheet.css'
const EditRow = () => (
    <tr>
        <td>
        </td>
        <td>
            <input
                type='text'
                name='name'
                required='required'
                placeholder='name' 
            />
        </td>
        <td>
            <input
                type='text'
                name='surname'
                required='required'
                placeholder='surname' 
            />
        </td>
        <td>
            <input
                type='number'
                name='tel'
                required='required'
                placeholder='tel number'
                />
        </td>
        <td>
            <input
                type='text'
                name='address'
                required='required'
                placeholder='address'
                 />
        </td>
        <td>
            <input
                type='text'
                name='fieldOfStudy'
                required='required'
                placeholder='field of study'
                />
        </td>
        <td>
            <input
                type='email'
                name='mail'
                required='required'
                placeholder='mail'
                 />
        </td>
        <td>
            <input
                type='text'
                name='campus'
                required='required'
                placeholder='campus'
                 />
        </td>
        <td></td>
    </tr>
)
export default EditRow;