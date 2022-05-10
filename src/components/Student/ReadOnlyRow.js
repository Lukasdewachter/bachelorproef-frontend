import React from "react";

const ReadOnly = ({ student, handleEditClick,handleDeleteClick }) =>{
    return(
        <div>
        <dl className="dl-read" key={student.id}>
            <dt className="dt-read">{student.id} {student.firstName} {student.lastName}</dt>
            <dt className="dt-read">{student.address} {student.tel}</dt>
            <dt  className="dt-read">{student.mail}</dt>
            <dt className="dt-read">{student.fieldOfStudy} {student.campus}</dt>
            <dt className="dt-read">
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,student)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(student.id)}><ion-icon name="close-circle-outline"></ion-icon></button>
                           
            </dt>
            </dl>
        </div>
        );
};
export default ReadOnly;