import React from "react";
import { getRole } from "../auth";

const ReadOnly = ({professor, handleEditClick,handleDeleteClick, isCoordinator }) =>{
    return(
        <div>
        <dl className="dl-read" key={professor.id}>
            <dt className="dt-read">{professor.id} </dt>
            <dt className="dt-read"><ion-icon name="person-outline"></ion-icon> {professor.firstName} {professor.lastName}</dt>
            <dt className="dt-read"><ion-icon name="home-outline"></ion-icon> {professor.address} </dt>
            <dt className="dt-read"><ion-icon name="call-outline"></ion-icon> {professor.tel}</dt>
            <dt  className="dt-read"><ion-icon name="mail-outline"></ion-icon> {professor.mail}</dt>
            <dt className="dt-read"><ion-icon name="book-outline"></ion-icon> {professor.fieldOfStudy}</dt>
            <dt className="dt-read"><ion-icon name="location-outline"></ion-icon> {professor.campus}</dt>
            <dt className="dt-read">{isCoordinator(professor.coordinator)}</dt>
            {getRole() ==="Admin" && (
            <dt className="dt-read">
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,professor)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(professor.id)}><ion-icon name="close-circle-outline"></ion-icon></button>
            </dt>
            )}
            </dl>
        </div>
        );
};
export default ReadOnly;