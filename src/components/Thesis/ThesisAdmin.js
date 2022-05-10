import React from "react";
import '../MainStyleSheet.css'

const ReadOnly = ({ thesis, handleEditClick,handleDeleteClick }) =>{
    return(
        <tr key={thesis.id}>
            <td>{thesis.id}</td>
            <td>{thesis.name}</td>
            <td>{thesis.description}</td>
            <td>{thesis.fieldOfStudy}</td>
            <td>{thesis.campus}</td>
            <td>
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,thesis)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(thesis.idThesis)}><ion-icon name="close-circle-outline"></ion-icon></button>
                
            </td>
            </tr>
        );
};

const EditRow = ({editFormData, handleEditChange, handleCancelClick}) => {
    return(
    <tr>
        <td></td>
        <td className="td-edit">
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
            <button className='btn-save' type='submit'><ion-icon name="checkmark-outline"></ion-icon></button>
            <button className='btn-delete' type='button' onClick={handleCancelClick}><ion-icon name="close-circle-outline"></ion-icon></button>
        </td>
    </tr>
    );
}
export {ReadOnly, EditRow};