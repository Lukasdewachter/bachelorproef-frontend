import React from "react";

const ReadOnly = ({ student, handleEditClick,handleDeleteClick }) =>{
    return(
        <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.firstName}</td>
            <td>{student.surname}</td>
            <td>{student.tel}</td>
            <td>{student.address}</td>
            <td>{student.fieldOfStudy}</td>
            <td>{student.mail}</td>
            <td>{student.campus}</td>
            <td>
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,student)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(student.idStudent)}><ion-icon name="close-circle-outline"></ion-icon></button>
                           
            </td>
            </tr>
        );
};
export default ReadOnly;