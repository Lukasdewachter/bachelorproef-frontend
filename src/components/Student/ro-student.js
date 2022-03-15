import React from "react";

const ReadOnly = ({ student, handleEditClick }) =>{
    return(
        <tr key={student.idStudent}>
            <td>{student.idStudent}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
            <td>{student.tel}</td>
            <td>{student.address}</td>
            <td>{student.fieldOfStudy}</td>
            <td>{student.mail}</td>
            <td>{student.campus}</td>
            <td><button onClick={(event)=>handleEditClick(event,student)}>Edit</button></td>
            </tr>
        );
};
export default ReadOnly;