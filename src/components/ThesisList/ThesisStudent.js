import React from "react";
import './ThesisStyleSheet.css'

const ThesisBlock = ({ thesis, handleEditClick,handleDeleteClick }) =>{
    return(
        <div className="thesisBlock">
            <h2>{thesis.name}</h2>
            <p>{thesis.description}</p>
        </div>  
        );
};
export default ThesisBlock;