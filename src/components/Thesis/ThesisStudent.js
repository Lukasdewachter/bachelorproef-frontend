import React from "react";
import './ThesisStyleSheet.css'

const ThesisBlock = ({thesis, handleMoreInfoClick, handleBookmarkClick}) =>{
    return(
        <div className="thesisBlock">
            <h2>
                {!thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark-outline" size="large"></ion-icon></ion-button>
                )}
                {thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark" size="large"></ion-icon></ion-button>
                )}
                {thesis.name}
            </h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
            <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">Meer info</button>
        </div>  
        );
};


const ThesisInfo = ({thesis, handleMoreInfoClick, handleStarClick, handleBookmarkClick}) => {
    console.log(thesis.bookmarked)
    return(
        <div className="thesisInfoBlock">
            <h1>
                {!thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark-outline" size="large"></ion-icon></ion-button>
                )}
                {thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark" size="large"></ion-icon></ion-button>
                )}
                {thesis.name}
            </h1>
            <ion-button onClick={(event)=>handleMoreInfoClick(event, null)}><ion-icon name="close" size="large" class="thesisInfoClose"  title="Sluit meer info"></ion-icon></ion-button>
            <p>{thesis.longDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>           
        </div>
    )
}

export {ThesisBlock, ThesisInfo};
