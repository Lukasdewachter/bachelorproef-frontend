import React from "react";
import '../MainStyleSheet.css'
const EditRow = ({editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <tr>
        <td></td>
        <td>
            <input
                type='text'
                name='name'
                required='required'
                placeholder='name'
                value={editFormData.name}
                onChange={handleEditChange} 
            />
        </td>
        <td>
            <input
                type='text'
                name='surname'
                required='required'
                placeholder='surname'
                value={editFormData.surname}
                onChange={handleEditChange} 
            />
        </td>
        <td>
            <input
                type='number'
                name='tel'
                required='required'
                placeholder='tel number'
                value={editFormData.tel}
                onChange={handleEditChange}
                />
        </td>
        <td>
            <input
                type='text'
                name='address'
                required='required'
                placeholder='address'
                value={editFormData.address}
                onChange={handleEditChange}
                 />
        </td>
        <td>
            <input
                type='text'
                name='fieldOfStudy'
                required='required'
                placeholder='field of study'
                value={editFormData.fieldOfStudy}
                onChange={handleEditChange}
                />
        </td>
        <td>
            <input
                type='email'
                name='mail'
                required='required'
                placeholder='mail'
                value={editFormData.mail}
                onChange={handleEditChange}
                 />
        </td>
        <td>
            <input
                type='text'
                name='campus'
                required='required'
                placeholder='campus'
                value={editFormData.campus}
                onChange={handleEditChange}
                 />
        </td>
        <td>
            <button type='submit'>Save</button>
            <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
    );
}
export default EditRow;