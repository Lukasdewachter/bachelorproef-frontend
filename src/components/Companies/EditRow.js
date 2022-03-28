import React from "react";
import '../MainStyleSheet.css'
const EditRow = ({editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <tr>
        <td></td>
        <td>
            <input
                type='text'
                name='companyName'
                required='required'
                placeholder='company'
                value={editFormData.companyName}
                onChange={handleEditChange} 
            />
        </td>
        <td>
            <input
                type='text'
                name='contactName'
                required='required'
                placeholder='contact'
                value={editFormData.contactName}
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
                type='email'
                name='mail'
                required='required'
                placeholder='mail'
                value={editFormData.mail}
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