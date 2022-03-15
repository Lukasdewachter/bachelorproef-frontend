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
                name='description'
                required='required'
                placeholder='description'
                value={editFormData.description}
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