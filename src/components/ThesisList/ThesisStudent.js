import React from "react";
import './ThesisStyleSheet.css'

const ThesisBlock = ({ thesis, handleEditClick,handleDeleteClick }) =>{
    return(
        <div className="thesisBlock">
            <h2>{thesis.name}</h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon>{thesis.campus}</p>
            <p><ion-icon name="bookmarks-outline"></ion-icon>{thesis.fieldOfStudy}</p>
            <ion-icon name="star-outline"></ion-icon>
            <button>Meer info</button>
        </div>  
        );
};
export default ThesisBlock;