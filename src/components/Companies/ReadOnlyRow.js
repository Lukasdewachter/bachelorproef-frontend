import React from "react";

const ReadOnly = ({ company, handleEditClick,handleDeleteClick }) =>{
    return(
        <tr key={company.idCompany}>
            <td>{company.idCompany}</td>
            <td>{company.companyName}</td>
            <td>{company.contactName}</td>
            <td>{company.tel}</td>
            <td>{company.address}</td>
            <td>{company.mail}</td>
            <td>
                <button className="btn-edit" onClick={(event)=>handleEditClick(event,company)}><ion-icon name="pencil-outline"></ion-icon></button>
                <button className="btn-delete" onClick={()=>handleDeleteClick(company.idCompany)}><ion-icon name="close-circle-outline"></ion-icon></button>
            </td>
            </tr>
        );
};
export default ReadOnly;