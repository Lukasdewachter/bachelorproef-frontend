import React,{useState, useEffect} from 'react'
import axios from 'axios'
//import { Link } from "react-router-dom";
import {ReadOnly, EditRow} from './ThesisAdmin'

import {ThesisBlock, ThesisInfo } from './ThesisStudent'

import '../MainStyleSheet.css'
import './ThesisStyleSheet.css'
import {authHeader, getRole, getUserId} from '../auth'
import {ProfComp, ProfCompThesisInfo} from './ThesisProfComp'

const api = axios.create({
  baseURL: `https://localhost:8080/thesis/`,
  headers: {
    'Authorization': ''+authHeader(),
  }
});

const apiBookmark = axios.create({
  baseURL: `https://localhost:8080/bookmark/`,
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
  const [thesisContainerWidth, setThesisContainerWidth] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null)
  const [addThesisPage, setAddThesisPage] = useState(false);
  const toggleAddPage = () =>{
    setAddThesisPage(!addThesisPage);
  }
  const handleMoreInfoClick = async (event, thesis) => {
    if(thesis === null){
      setThesis(null);
      setMoreInfo(false);
      setThesisContainerWidth('100%');
    } else {
      setThesis(thesis);
      setMoreInfo(true);
      setThesisContainerWidth('70%');
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
      longDescription: '',
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
              <form className="form-addPage" onSubmit={addThesis}>
                <input
                  type='text'
                  name='name'
                  required='required'
                  placeholder='title'
                  onChange={handleAddChange}
                />
                <br></br>
                <input
                  type='text'
                  name='shortDescription'
                  required='required'
                  placeholder='short description'
                  onChange={handleAddChange}
                  size="69"
                />
                <select className="select-FOS" name="fieldOfStudy" onChange={handleAddChange} >
                            <option value="" selected disabled hidden>Choose Field of Study</option>
                            <option value="Sociale Wetenschappen">Sociale Wetenschappen</option>
                            <option value="Burgerlijk Ingenieur">Burgerlijk Ingenieur</option>
                            <option value="Bio-ingenieur">Bio-ingenieur</option>
                            <option value="Industrieel Ingenieur">Industrieel Ingenieur</option>
                            <option value="Wetenschappen">Wetenschappen</option>
                            <option value="Architectuur">Architectuur</option>
                            <option value="Geneeskunde">Geneeskunde</option>
                            <option value="Farmacie">Farmacie</option>
                            <option value="Letteren">Letteren</option>
                            <option value="Economie">Economie</option>
                            <option value="Wijsbegeerte">Wijsbegeerte</option>
                          </select>
                        
                        <select className="select-C" name="campus" onChange={handleAddChange}>
                          <option value="" selected disabled hidden>Choose campus</option>
                          <option value="Aalst">Aalst</option>
                          <option value="Antwerpen">Antwerpen</option>
                          <option value="Brugge">Brugge</option>
                          <option value="Brussel">Brussel</option>
                          <option value="Diepenbeek">Diepenbeek</option>
                          <option value="Geel">Geel</option>
                          <option value="Gent">Gent</option>
                          <option value="Kortrijk">Kortrijk</option>
                          <option value="Leuven">Leuven</option>
                          <option value="Sint-Katelijne-Waver">Sint-Katelijne-Waver</option>
                        </select>
                        <select className="select-pers" name="numberOfPers" onChange={handleAddChange}>
                  <option value="" selected disabled hidden>Number of persons</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <input
                  type='text'
                  name='promotor'
                  required='required'
                  placeholder='promotor'
                  onChange={handleAddChange}
                  size="20"
                />
                <textarea name="longDescription" rows="4" onChange={handleAddChange}>
                  long description
                </textarea>
                <input className="btn-add-2" type="submit" value="add thesis" />
              </form>
            </div>)}
            <div className='thesisContainer' style={{ width: thesisContainerWidth }}>
            {thesisList.map((thesis) => {
              return(
                <ProfComp
                thesis={thesis}
                handleMoreInfoClick={handleMoreInfoClick}
                />
              )
            })}
        </div>
        <div>
          {moreInfo && (<ProfCompThesisInfo thesis={thesis} 
                                  handleMoreInfoClick={handleMoreInfoClick} 
                                  handleStarClick={handleStarClick}/>)}
        </div>
        </div>
    );
  }
   else if(getRole() === "Student" || getRole() === ""){
    return(
        <div className='thesisPage'>
          <div style={{ width: thesisContainerWidth }}>
            <h1 className='thesisSectionTitle'>THESISONDERWERPEN</h1>
            <p>Hier kan je een overzicht vinden van alle thesisonderwerpen die open staan. Door op "Meer info" te drukken kan je een uitgebreide beschrijving van elk thesisonderwerp lezen.
              <br/><br/>
              Thesisonderwerpen die je interesseren kunnen opgeslagen worden door op het bladwijzericoon te drukken.
              <br/><br/>
              Om je definitieve keuze in te dienen wordt er gewerkt met een drie-sterrensysteem. In totaal moet je drie thesisonderwerpen doorgeven die je ziet zitten. Geef de thesisonderwerpen die je het meest interesseren drie sterren en degene die je wat minder aanspreken twee of een ster. 
            </p>
          </div>
          <div className='thesisContainer' style={{ width: thesisContainerWidth }}>
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