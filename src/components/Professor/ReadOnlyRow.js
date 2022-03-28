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
                <button className="btn-edit" onClick={(event)=>handleEditClick(event,professor)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className="btn-delete" onClick={()=>handleDeleteClick(professor.idProfessor)}><ion-icon name="close-circle-outline"></ion-icon></button>
            </td>
            </tr>
        );
};
export default ReadOnly;