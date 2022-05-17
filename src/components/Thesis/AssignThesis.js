import React,{ useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../auth";
import "./ThesisStyleSheet.css"

const api = axios.create({
    baseURL: `https://localhost:8080/thesis/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});
const studentApi = axios.create({
    baseURL:`https://localhost:8080/student/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
})
const prefApi = axios.create({
    baseURL: `https://localhost:8080/preferences/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});

function AssignThesisPage(){     
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

    const handleAssignClick = async (event, thesis) => {
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
            <h3>Here you can assign a theses to students</h3>
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
                    <button onClick={(event)=>handleAssignClick(event, thesis)} className="thesisMoreInfo">Assign</button>
                    {moreInfo && (
                        <div>
                        <AssignThesis 
                            thesis={currentThesis} 
                            handleAssignClick={handleAssignClick} 
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
const AssignThesis = ({thesis, handleAssignClick}) => {
    const [studentsPref, setStudentsPref] = useState([]);
    const getStudentsPref =async(thesis) => {
        const data = await prefApi.get(`/all`);
        setStudentsPref(data.data);
    }
    const [assigned, setAssigned] = useState({
        idStudent:''
    }
    )
    const handleAssignChange=(event)=>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...assigned};
        newFormData[fieldName] = fieldValue;
        setAssigned(newFormData);
    }
    const assignStudent=(thesis)=>{
        studentApi.put(`/update/${assigned.idStudent}`,{
            thesisId:thesis.id
        })
    }
    useEffect(()=>{
        getStudentsPref();
    },[]);
    return(
        <div className="thesisInfoBlock">
            <ion-button onClick={(event)=>handleAssignClick(event, null)}><ion-icon name="close" size="large" class="thesisInfoClose"  title="Sluit meer info"></ion-icon></ion-button>
            <h1>{thesis.name}</h1>
            <p>{thesis.longDescription}</p>
            <p><ion-icon name="location-outline"></ion-icon> {thesis.campus}</p>
            <p><ion-icon name="book"></ion-icon> {thesis.fieldOfStudy}</p>
            <p><ion-icon name="school"></ion-icon> {thesis.promotor}</p>
            {studentsPref.map((student)=>{
                return(
                <div>
                <select name="idStudent" onChange={handleAssignChange}>
                    <option value="" selected disabled hidden>Choose First option</option>
                    {student.firstChoice === thesis.id && (
                       <option value={student.idStudent}>First choice student {student.idStudent}</option> 
                    )}
                    {student.secondChoice === thesis.id && (
                       <option value={student.idStudent}>Second choice student {student.idStudent}</option> 
                    )}
                    {student.thirdChoice === thesis.id && (
                       <option value={student.idStudent}>Third choice student {student.name}</option> 
                    )}
               </select>
               <button onClick={assignStudent(thesis)} className="confirm-btn">Confirm</button>
               </div>
            )})}
            
        </div>
    )
}  

const GetStudents = ({thesis}) => {
    for(var i=0; i<=thesis.numberOfPers; i++){
        return(
            <p>{i}. <ion-icon name="people"></ion-icon></p>
        )
    }
    
} 
export {AssignThesisPage, AssignThesis, GetStudents};