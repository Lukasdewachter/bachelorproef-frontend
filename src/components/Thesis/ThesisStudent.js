import React from "react";
import './ThesisStyleSheet.css'

const ThesisBlock = ({thesis, handleMoreInfoClick, handleBookmarkClick}) =>{
    return(
        <div className="thesisBlock">
            <div className="bookmarkBlock">
                {!thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark-outline" size="large"></ion-icon></ion-button>
                )}
                {thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark" size="large"></ion-icon></ion-button>
                )}
            </div>

            <h2>{thesis.name}</h2>
            <p>{thesis.shortDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon>{thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon>{thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon>{thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon>{thesis.numberOfPers}</p>
            <ion-icon name="star-outline" size="medium"></ion-icon>
            <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">Meer info</button>
        </div>  
        );
};


const ThesisInfo = ({thesis, handleMoreInfoClick, handleStarClick, handleBookmarkClick}) => {
    console.log(thesis.bookmarked)
    return(
        <div className="thesisInfoBlock">
            <ion-button onClick={(event)=>handleMoreInfoClick(event, null)}><ion-icon name="close" size="large" class="thesisInfoClose"  title="Sluit meer info"></ion-icon></ion-button>
            <h1>{thesis.name}</h1>
            <p>{thesis.longDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon>{thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon>{thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon>{thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon>{thesis.numberOfPers}</p>
            <div className="starSelect">
                <ion-button onClick={(event)=>handleStarClick(event, thesis.id, 1)}><ion-icon name="star" size="large" class="star"></ion-icon></ion-button>
                <ion-button onClick={(event)=>handleStarClick(event, thesis.id, 2)}><ion-icon name="star" size="large" class="star"></ion-icon></ion-button>
                <ion-button onClick={(event)=>handleStarClick(event, thesis.id, 3)}><ion-icon name="star" size="large" class="star"></ion-icon></ion-button>
            </div>
            <div className="bookmark">
                {!thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark-outline" size="large"></ion-icon></ion-button>
                )}
                {thesis.bookmarked && (
                    <ion-button onClick={(event)=>handleBookmarkClick(event, thesis.id)}><ion-icon name="bookmark" size="large"></ion-icon></ion-button>
                )}
            </div>
        </div>
    )
}

export {ThesisBlock, ThesisInfo};
