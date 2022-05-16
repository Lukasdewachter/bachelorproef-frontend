import React from "react";
import { getRole } from "../auth";

const ReadOnly = ({ student, handleEditClick,handleDeleteClick }) =>{
    return(
        <div>
        <dl className="dl-read-student" key={student.id}>
            <dt className="dt-read-student">{student.id} </dt>
            <dt className="dt-read-student"><ion-icon name="person-outline"></ion-icon> {student.firstName} {student.lastName}</dt>
            <dt className="dt-read-student"><ion-icon name="home-outline"></ion-icon> {student.address} </dt>
            <dt className="dt-read-student"><ion-icon name="call-outline"></ion-icon> {student.tel}</dt>
            <dt  className="dt-read-student"><ion-icon name="mail-outline"></ion-icon> {student.mail}</dt>
            <dt className="dt-read-student"><ion-icon name="book-outline"></ion-icon> {student.fieldOfStudy}</dt>
            <dt className="dt-read-student"><ion-icon name="location-outline"></ion-icon> {student.campus}</dt>
            {getRole()==="Admin" && (
            <dt className="dt-read-student">
                <button className='btn-edit-student' onClick={(event)=>handleEditClick(event,student)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete-student' onClick={()=>handleDeleteClick(student.id)}><ion-icon name="close-circle-outline"></ion-icon></button>            
            </dt>)}
            </dl>
        </div>
        );
};
export default ReadOnly;