import React,{useState, useEffect} from 'react'
import axios from 'axios'
import '../MainStyleSheet.css'
import {authHeader, getRole, getUserId} from '../auth'
import {ThesisBlock, ThesisInfo} from './ThesisBookmarks'


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

const BookmarksPage = () => {
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
  const [moreInfo, setMoreInfo] = useState(null);
  const [thesisContainerWidth, setThesisContainerWidth] = useState(null);


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
            setThesis(thesis)
          }})
        })
    }
    setThesisList(thesisList)
  };

  useEffect(()=>{
      getApprovedThesis()
  },[]);

   if(getRole() === "Student"){
    return(
        <div className='thesisPage'>
          <div style={{ width: thesisContainerWidth }}>
            <h1 className='thesisSectionTitle'>BLADWIJZERS</h1>
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
export default BookmarksPage;