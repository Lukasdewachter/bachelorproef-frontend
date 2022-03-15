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
                <button onClick={(event)=>handleEditClick(event,company)}>Edit</button>
                <button onClick={()=>handleDeleteClick(company.idCompany)}>Delete</button>
            </td>
            </tr>
        );
};
export default ReadOnly;