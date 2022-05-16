import React from "react";
import './ThesisStyleSheet.css'

const ProfComp = ({thesis, handleMoreInfoClick }) =>{
    
  
    return(
        <div  className="thesisBlock">
            <h2>{thesis.name}</h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
            <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">Meer info</button>
        </div>
        );
};


const ProfCompThesisInfo = ({thesis, handleMoreInfoClick}) => {
    console.log(thesis.bookmarked)
    return(
        <div className="thesisInfoBlock">
            <ion-button onClick={(event)=>handleMoreInfoClick(event, null)}><ion-icon name="close" size="large" class="thesisInfoClose"  title="Sluit meer info"></ion-icon></ion-button>
            <h1>{thesis.name}</h1>
            <p>{thesis.longDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
        </div>
    )
}
export {ProfComp, ProfCompThesisInfo};