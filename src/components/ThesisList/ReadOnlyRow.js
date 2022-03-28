import React from "react";

const ReadOnly = ({ thesis, handleEditClick,handleDeleteClick }) =>{
    return(
        <tr key={thesis.idThesis}>
            <td>{thesis.idThesis}</td>
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
export default ReadOnly;