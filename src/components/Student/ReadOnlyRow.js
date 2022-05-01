import React from "react";

const ReadOnly = ({ student, handleEditClick,handleDeleteClick }) =>{
    return(
        <div>
        <dl className="dl-read" key={student.id}>
            <dt>{student.id} {student.firstName} {student.lastName}</dt>
            <dt>{student.address} {student.tel}</dt>
            <dt>{student.mail}</dt>
            <dt>{student.fieldOfStudy} {student.campus}</dt>
            <dt>
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,student)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(student.idStudent)}><ion-icon name="close-circle-outline"></ion-icon></button>
                           
            </dt>
            </dl>
            </div>
        );
};
export default ReadOnly;