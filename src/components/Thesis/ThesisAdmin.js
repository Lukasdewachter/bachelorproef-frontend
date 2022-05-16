import React from "react";
import '../MainStyleSheet.css'

const ReadOnly = ({ thesis, handleEditClick,handleDeleteClick,handleMoreInfoClick }) =>{
    return(
        <div className="thesisBlock">
            <h2>{thesis.name}</h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
            <ion-icon name="star-outline" size="medium"></ion-icon>
            <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">More info</button>
        </div>
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