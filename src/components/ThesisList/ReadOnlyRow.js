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
                <button onClick={(event)=>handleEditClick(event,thesis)}>Edit</button>
                <button onClick={()=>handleDeleteClick(thesis.idThesis)}>Delete</button>
            </td>
            </tr>
        );
};
export default ReadOnly;