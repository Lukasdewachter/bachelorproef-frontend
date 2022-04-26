import React from "react";
import '../MainStyleSheet.css'
const EditRow = ({editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <tr>
        <td></td>
        <td>
            <input
                type='text'
                name='firstName'
                required='required'
                placeholder='first name'
                value={editFormData.firstName}
                onChange={handleEditChange} 
            />
        </td>
        <td>
            <input
                type='text'
                name='lastName'
                required='required'
                placeholder='last name'
                value={editFormData.lastName}
                onChange={handleEditChange} 
            />
        </td>
        <td>
            <input
                type='text'
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
        <button className='btn-save' type='submit'><ion-icon name="checkmark-outline"></ion-icon></button>
            <button className='btn-delete' type='button' onClick={handleCancelClick}><ion-icon name="close-circle-outline"></ion-icon></button>
        </td>
    </tr>
    );
}
export default EditRow;