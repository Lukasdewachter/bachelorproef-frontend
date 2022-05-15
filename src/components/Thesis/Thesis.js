import React,{useState, useEffect} from 'react'
import axios from 'axios'
//import { Link } from "react-router-dom";
import {ReadOnly, EditRow} from './ThesisAdmin'

import {ThesisBlock, ThesisInfo } from './ThesisStudent'

import '../MainStyleSheet.css'
import './ThesisStyleSheet.css'
import {authHeader, getRole, getUserId} from '../auth'
import {ProfComp} from './ThesisProfComp'

const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`,
  headers: {
    'Authorization': ''+authHeader(),
  }
});

const apiBookmark = axios.create({
  baseURL: `http://localhost:8080/bookmark/`,
  headers: {
    'Authorization': ''+authHeader(),
  }
});

const ThesisPage = () => {
  const [thesisList, setThesisList] = useState([])
  const [thesis, setThesis] = useState({
    name: '',
    shortDescription: '',
    longDescrpiton: '',
    fieldOfStudy: '',
    campus: '',
    promotor: '',
    numberOfPers: '',
    bookmarked: ''
  });
  const [moreInfo, setMoreInfo] = useState(null)
  const [addThesisPage, setAddThesisPage] = useState(false);
  const toggleAddPage = () =>{
    setAddThesisPage(!addThesisPage);
  }
  const handleMoreInfoClick = async (event, thesis) => {
    if(thesis === null){
      setThesis(null);
      setMoreInfo(false)
    } else {
      setThesis(thesis);
      setMoreInfo(true)
    }
  }

  const handleStarClick = async (event, id, numberOfStars) => {
    if(id === null){
      setThesis(null);
      setMoreInfo(false)
    } else {
      const data = await api.get(`/get/${id}`);
      setThesis(data.data);
      setMoreInfo(true)
    }
  }

  const handleBookmarkClick = (event, thesisId) => {
    var userId = getUserId()
    if(userId !== ""){
      apiBookmark.post(`/toggleBookmark`, {
        "thesisId": thesisId,
        "userId": userId
      });
    }
    getApprovedThesis()
  }

  const [editThesisId, setEditThesisId] = useState(null);

  const handleEditClick = (event,thesis) =>{
      event.preventDefault();
      setEditThesisId(thesis.id);
      const formValues = {
          id: thesis.id,
          name: thesis.name,
          shortDescription: thesis.description,
          address: thesis.address,
          fieldOfStudy: thesis.fieldOfStudy,
          campus: thesis.campus
      };
      setThesis(formValues);
  };

  const [addData, setAddData] = useState({
    name: '',
      shortDescription: '',
      longDescrpiton: '',
      fieldOfStudy: '',
      campus: '',
      promotor: '',
      numberOfPers: ''
  });

  const addThesis = () =>{
    api.post('/add', {
        name: addData.name,
        shortDescription: addData.shortDescription,
        longDescription: addData.longDescription,
        fieldOfStudy: addData.fieldOfStudy,
        campus: addData.campus,
        promotor: addData.promotor,
        numberOfPers: addData.numberOfPers
    });
    getThesis();
  };

  const handleAddChange = (event) =>{
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newData = {...addData};
    newData[fieldName] = fieldValue;
    setAddData(newData);
  };

  const handleEditChange = (event) =>{
      event.preventDefault();
      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;
      const newFormData = {...thesis};
      newFormData[fieldName] = fieldValue;
      setThesis(newFormData);
  };

  const handleEditFormSubmit= () =>{
      api.put(`/update/${thesis.id}`,{
          name: thesis.name,
          description: thesis.description,
          campus: thesis.campus,
          fieldOfStudy: thesis.fieldOfStudy,
      });
      setEditThesisId(null);
  };

  const handleCancelClick = () =>{
      setEditThesisId(null);
  };

  const handleDeleteClick = (id) =>{
      api.delete(`/delete?id=${id}`, {    
      });
  };

  const getThesis = async () =>{
      const data = await api.get('/all');
      setThesisList(data.data) 
  };

  const getApprovedThesis = async () =>{
    const data = await api.get('/approved');
    getBookmarked(data.data)
  };

  const getBookmarked = async (thesisList) =>{
    if(getRole() === "Student"){
      const data = await apiBookmark.put('/user', {
        userId: getUserId(),
      });

      thesisList.forEach(function(thesis){
        data.data.forEach(function(obj) {
          if(obj.id === thesis.id){
            thesis.bookmarked = true
          }})
          setThesis(thesis)
        })
    }
    setThesisList(thesisList)
  };

  useEffect(()=>{
    if (getRole() === "Admin"){
      getThesis()
    } else {
      getApprovedThesis()
    }
  },[]);
  if (getRole() === "Admin"){
      return (
        <div className="thesisPage">
        <h1>Thesis list   <button className="btn-add"><ion-icon name="add-circle-outline"></ion-icon></button></h1>
        <div className='thesisContainer'>
                {thesisList.map((thesis)=>{
                  return(
                    <>
                      {editThesisId === thesis.id ? (
                        <EditRow
                          editFormData={thesis}
                          handleEditChange={handleEditChange}
                          handleCancelClick={handleCancelClick}

                        />
                        ):(
                        <ReadOnly 
                          thesis={thesis} 
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                          handleMoreInfoClick={handleMoreInfoClick}
                        />
                      )}
                    </>
                  );
                })}
                </div>
          </div>
      );

  } else if(getRole() === "Company" || getRole() === "Professor") {
    return(
      <div className='thesisPage'>
          <h1>Thesis subjects   <button onClick={toggleAddPage} className="btn-add"><ion-icon name="add-circle-outline"></ion-icon></button></h1>
          <p>Hier kan je een overzicht vinden van alle thesisonderwerpen die open staan. Door op "Meer info" te drukken kan je een uitgebreide beschrijving van elk thesisonderwerp lezen.
            <br/><br/>
            Om een thesis toe te voegen duw je op de plus knop. 
          </p>
          {addThesisPage && (
          <div className='add-page'>
            <button className='btn-exit-addPage' onClick={toggleAddPage}><ion-icon name="close-circle-outline"></ion-icon></button>
            <h3>Add Thesis</h3>
            <form className="form-addPage">
            <input
                    type='text'
                    name='name'
                    required='required'
                    placeholder='name'
                    onChange={handleAddChange}
                />
                <input
                    type='text'
                    name='description'
                    required='required'
                    placeholder='description'
                    onChange={handleAddChange}
                />
                <input
                    type='text'
                    name='fieldOfStudy'
                    required='required'
                    placeholder='field of study'
                    onChange={handleAddChange}
                />
                <input
                    type='text'
                    name='campus'
                    required='required'
                    placeholder='campus'
                    onChange={handleAddChange}
                />
            </form>
          </div>)}
          <div className='thesisContainer'>
              {thesisList.map((thesis) => {
                return(
                  <ProfComp
                  thesis={thesis}
                  handleMoreInfoClick={handleMoreInfoClick}
                  />
                )
              })}
              {moreInfo && (<ThesisInfo thesis={thesis} 
                                      handleMoreInfoClick={handleMoreInfoClick} 
                                      handleStarClick={handleStarClick} 
                                      handleBookmarkClick={handleBookmarkClick}/>)}
          </div>
        </div>   
    );
  }
   else if(getRole() === "Student" || getRole() === ""){
    return(
        <div className='thesisPage'>
          <h1 className='thesisSectionTitle'>THESISONDERWERPEN</h1>
          <p>Hier kan je een overzicht vinden van alle thesisonderwerpen die open staan. Door op "Meer info" te drukken kan je een uitgebreide beschrijving van elk thesisonderwerp lezen.
            <br/><br/>
            Thesisonderwerpen die je interesseren kunnen opgeslagen worden door op het bladwijzericoon te drukken.
            <br/><br/>
            Om je definitieve keuze in te dienen wordt er gewerkt met een drie-sterrensysteem. In totaal moet je drie thesisonderwerpen doorgeven die je ziet zitten. Geef de thesisonderwerpen die je het meest interesseren drie sterren en degene die je wat minder aanspreken twee of een ster. 
          </p>
          <div className='thesisContainer'>
            {thesisList.map((thesis)=>{
                return(
                    <ThesisBlock 
                      thesis={thesis}
                      handleMoreInfoClick={handleMoreInfoClick}
                      handleBookmarkClick={handleBookmarkClick}
                    />
                );
              })} 
            {moreInfo && (<ThesisInfo thesis={thesis} 
                                      handleMoreInfoClick={handleMoreInfoClick} 
                                      handleStarClick={handleStarClick} 
                                      handleBookmarkClick={handleBookmarkClick}/>)}
          </div> 
        </div>   
    );

  } else {
    return(
      <div>
        <p>Error, Log opnieuw in</p>
      </div>
    )
  }    
}
export default ThesisPage;