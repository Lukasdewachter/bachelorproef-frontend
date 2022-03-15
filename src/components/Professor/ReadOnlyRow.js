import React from "react";

const ReadOnly = ({ professor, handleEditClick,handleDeleteClick }) =>{
    return(
        <tr key={professor.idProfessor}>
            <td>{professor.idProfessor}</td>
            <td>{professor.name}</td>
            <td>{professor.surname}</td>
            <td>{professor.tel}</td>
            <td>{professor.address}</td>
            <td>{professor.fieldOfStudy}</td>
            <td>{professor.mail}</td>
            <td>{professor.campus}</td>
            <td>{professor.coordinator}</td>
            <td>
                <button onClick={(event)=>handleEditClick(event,professor)}>Edit</button>
                <button onClick={()=>handleDeleteClick(professor.idProfessor)}>Delete</button>
            </td>
            </tr>
        );
};
export default ReadOnly;