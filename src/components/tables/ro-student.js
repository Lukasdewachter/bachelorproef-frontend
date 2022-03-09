import React from "react";

const ReadOnly = ({ student }) =>{
    return(
        <tr key={'student_'+student.idStudent+student.name+student.surname+student.tel+student.address+student.fieldOfStudy+student.mail+student.campus}>
            <td>{student.idStudent}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
            <td>{student.tel}</td>
            <td>{student.address}</td>
            <td>{student.fieldOfStudy}</td>
            <td>{student.mail}</td>
            <td>{student.campus}</td>
            <td></td>
            {/*<td><button onClick={() => this.deleteStudent(student.idStudent)}>x</button></td>*/}
            </tr>
        );
};
export default ReadOnly;