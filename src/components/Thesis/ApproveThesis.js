import axios from "axios";
import React,{ useState, useEffect } from "react";
import { authHeader } from "../auth";
import "./ThesisStyleSheet.css"

const api = axios.create({
    baseURL: `https://localhost:8080/thesis/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});
function ApproveThesis(){     
    const coordinator = localStorage.getItem("coordinator")
    const [thesis, setThesis] = useState([]);
    const getSubmittedThesis =async () =>{
        const data = await api.get('/all');

            setThesis(data.data)    
        
    }
    const [thesisContainerWidth, setThesisContainerWidth] = useState(null);
    const [currentThesis, setCurrentThesis] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        fieldOfStudy: '',
        campus: '',
        promotor: '',
        numberOfPers: ''
    })
    const [moreInfo, setMoreInfo] = useState(false)
    const handleMoreInfoClick = async (event, thesis) => {
        if(thesis === null){
          setCurrentThesis(null);
          setMoreInfo(false);
          setThesisContainerWidth('100%');
        } else {
          setCurrentThesis(thesis);
          setMoreInfo(true);
          setThesisContainerWidth('70%');
        }
      }
    useEffect(()=>{
        getSubmittedThesis()
    },[]);
    return (
       
        <div className="thesisPage">
         {coordinator==="true" && (
        <div>
            <h3>Here you can approve new theses</h3>
            <div className='thesisContainer' style={{ width: thesisContainerWidth }}>
            {thesis.map((thesis)=>{
                return(
                <div className="thesisBlock">
                    
                    <h2>{thesis.name}</h2>
                    <p>{thesis.shortDescription}</p>
                    <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
                    <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
                    <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
                    <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
                    <button onClick={(event)=>handleMoreInfoClick(event, thesis)} className="thesisMoreInfo">More info</button>
                    {moreInfo && (
                        <div>
                        <ApproveThesisInfo 
                            thesis={currentThesis} 
                            handleMoreInfoClick={handleMoreInfoClick} 
                                      />
                        </div>)}
        </div>
             )})}
             </div>
        </div>
        )}
        {coordinator !="true" && (
            <div>
                <h1>Not authorised</h1>
            </div>
        )}
        </div>
    );
}
const ApproveThesisInfo = ({thesis, handleMoreInfoClick}) => {
    console.log(thesis)
    return(
        <div className="thesisInfoBlock">
            <ion-button onClick={(event)=>handleMoreInfoClick(event, null)}><ion-icon name="close" size="large" class="thesisInfoClose"  title="Close more info"></ion-icon></ion-button>
            <h1>{thesis.name}</h1>
            <p>{thesis.longDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            <p><ion-icon name="people"></ion-icon> {thesis.numberOfPers}</p>
        </div>
    )
}  
export {ApproveThesis, ApproveThesisInfo};