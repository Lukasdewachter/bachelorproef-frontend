import React from "react";
import '../MainStyleSheet.css'

const ProfComp = ({thesis,handleMoreInfoClick }) =>{
    return(
        <div>
            <h2>{thesis.name}</h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
            <ion-icon name="star-outline" size="medium"></ion-icon>
            <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">Meer info</button>
        </div>
        );
};
export {ProfComp};