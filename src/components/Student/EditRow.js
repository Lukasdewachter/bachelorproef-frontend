import React from "react";
import '../MainStyleSheet.css'
const EditRow = ({student,editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <dl className="dl-edit">
        <dt>
            <input
                type='text'
                name='firstName'
                required='required'
                placeholder='first name'
                value={editFormData.firstName}
                onChange={handleEditChange}
                size = "10" 
            />
            <input
                type='text'
                name='lastName'
                required='required'
                placeholder='last name'
                value={editFormData.lastName}
                onChange={handleEditChange}
                size = "10" 
            />
        </dt>
        <dt>
            <input
                type='text'
                name='address'
                required='required'
                placeholder='address'
                value={editFormData.address}
                onChange={handleEditChange}
                 />
            <input
                type='text'
                name='tel'
                required='required'
                placeholder='tel number'
                value={editFormData.tel}
                onChange={handleEditChange}
                size="9"
                />
        </dt>
        <dt>
            <input
                type='email'
                name='mail'
                required='required'
                placeholder='mail'
                value={editFormData.mail}
                onChange={handleEditChange}
                 />
        </dt>
        <dt>
            <input
                type='text'
                name='fieldOfStudy'
                required='required'
                placeholder='field of study'
                value={editFormData.fieldOfStudy}
                onChange={handleEditChange}
                />
            <input
                type='text'
                name='campus'
                required='required'
                placeholder='campus'
                value={editFormData.campus}
                onChange={handleEditChange}
                 />
        </dt>
        <dt>
        <button className='btn-save' type='submit'><ion-icon name="checkmark-outline"></ion-icon></button>
            <button className='btn-delete' type='button' onClick={handleCancelClick}><ion-icon name="close-circle-outline"></ion-icon></button>
        </dt>
    </dl>
    );
}
export default EditRow;