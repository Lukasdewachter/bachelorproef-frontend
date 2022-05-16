import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {authHeader, getRole, getUserId} from '../auth'
import {ThesisBlock, ThesisInfo} from './ThesisBookmarks'
import {Preferences} from './Preferences'

import '../MainStyleSheet.css'
import './Bookmarks.css'

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

const apiPref = axios.create({
  baseURL: `https://localhost:8080/preferences/`,
  headers: {
    'Authorization': ''+authHeader(),
  }
});

const BookmarksPage = () => {
  const [thesisList, setThesisList] = useState([])
  const [thesis, setThesis] = useState({
    id: '',
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

  const [preference, setPreference] = useState({
    idStudent: '',
    firstChoice: '',
    secondChoice: '',
    thirdChoice: '',
    submitted: '',
    saved: false
  });


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
    getPreference()
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

  const getPreference = async () =>{
    const data = await apiPref.put('/user', {
        idStudent: getUserId(),
    });
    if(data.data.statusCode === 500){
        preference.submitted = false
        setPreference(preference)
    } else{
        setPreference(data.data)
        console.log(preference)
    }
  };

  const registerChange = (event) =>{
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    console.log(fieldName)
    console.log(fieldValue)
    const newPreference = {...preference};
    newPreference[fieldName] = fieldValue;
    setPreference(newPreference);
    console.log(preference)
  };

  const save = async () =>{
    console.log(preference)
    if(preference.firstChoice === preference.secondChoice ||
        preference.secondChoice === preference.thirdChoice ||
        preference.firstChoice === preference.thirdChoice){
          window.alert("You have to choose for every preference a different thesis")
    } else {
      await apiPref.post(`/update/${getUserId()}`, {
          idStudent: getUserId(), 
          firstChoice: preference.firstChoice,
          secondChoice: preference.secondChoice,
          thirdChoice: preference.thirdChoice,
          submitted: false
        });
      var newPreference = {...preference};
      newPreference["saved"] = "green"
      setPreference(newPreference);
    }
  }

  const submit = async () =>{
    if(preference.firstChoice === preference.secondChoice ||
        preference.secondChoice === preference.thirdChoice ||
        preference.firstChoice === preference.thirdChoice){
          window.alert("You have to choose for every preference a different thesis")
        } else {
            await apiPref.post(`/update/${getUserId()}`, {
                idStudent: getUserId(), 
                firstChoice: preference.firstChoice,
                secondChoice: preference.secondChoice,
                thirdChoice: preference.thirdChoice,
                submitted: true
              });
            getPreference()
        }
  }

  useEffect(()=>{
      getApprovedThesis()
  },[]);

   if(getRole() === "Student"){
    return(
        <div className='thesisPage'>
          <div className='bookmarksInfo' style={{ width: thesisContainerWidth }}>
            <div>
              <h1 className='thesisSectionTitle'>BLADWIJZERS</h1>
              <p>Here you can find an overview of all the thesis subjects that you gave a bookmark. When you press the button "More info", you'll get a screen with more information about the specific thesis subject.
              <br/><br/>
              On the right side you can select your three preferences of theses. You can save them to edit them later, or make your decision permanent by submitting your choice.
            </p>
            </div>
            <div>
              <Preferences thesisList={thesisList} 
                          preference={preference}
                          saved={preference.saved}
                          save={save}
                          submit={submit}
                          registerChange={registerChange}/>
            </div>
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