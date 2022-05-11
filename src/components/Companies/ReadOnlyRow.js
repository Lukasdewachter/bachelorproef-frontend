import React from "react";

const ReadOnly = ({company, handleEditClick,handleDeleteClick }) =>{
    return(
        <div>
        <dl className="dl-read" key={company.id}>
            <dt className="dt-read">{company.id} </dt>
            <dt className="dt-read"><ion-icon name="business-outline"></ion-icon> {company.companyName}</dt>
            <dt className="dt-read"><ion-icon name="person-outline"></ion-icon> {company.firstName} {company.lastName}</dt>
            <dt className="dt-read"><ion-icon name="home-outline"></ion-icon> {company.address} </dt>
            <dt className="dt-read"><ion-icon name="call-outline"></ion-icon> {company.tel}</dt>
            <dt  className="dt-read"><ion-icon name="mail-outline"></ion-icon> {company.mail}</dt>
            <dt className="dt-read"><ion-icon name="book-outline"></ion-icon> {company.fieldOfStudy}</dt>
            <dt className="dt-read"><ion-icon name="location-outline"></ion-icon> {company.campus}</dt>
            <dt className="dt-read">
                <button className='btn-edit' onClick={(event)=>handleEditClick(event,company)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className='btn-delete' onClick={()=>handleDeleteClick(company.id)}><ion-icon name="close-circle-outline"></ion-icon></button>
                           
            </dt>
            </dl>
        </div>
        );
};
export default ReadOnly;