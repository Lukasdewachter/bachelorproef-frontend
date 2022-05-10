import React,{useEffect, useState} from 'react'
import axios from 'axios'
//import { Link } from "react-router-dom";
import {ReadOnly, EditRow} from './ThesisAdmin'

import ThesisBlock from './ThesisStudent'

import '../MainStyleSheet.css'
import './ThesisStyleSheet.css'
import {authHeader, getRole} from '../auth'


const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`,
  headers: {
    'Authorization': ''+authHeader(),
  }
});

const ThesisList = () => {
  const [thesis,setThesis] = useState([])
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    fieldOfStudy: '',
    campus: ''
});
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
    setEditFormData(formValues);
};
const [addData, setAddData] = useState({
  name: '',
  description: '',
  fieldOfStudy: '',
  campus: ''
});
const addThesis = () =>{
  api.post('/add', {
      name: addData.name,
      description: addData.description,
      fieldOfStudy: addData.fieldOfStudy,
      campus: addData.campus
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
    const newFormData = {...editFormData};
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
};
const handleEditFormSubmit= () =>{
    api.put(`/update/${editFormData.id}`,{
        name: editFormData.name,
        description: editFormData.description,
        campus: editFormData.campus,
        fieldOfStudy: editFormData.fieldOfStudy,
    });
    setEditThesisId(null);
};
const handleCancelClick = () =>{
    setEditThesisId(null);
};
const handleDeleteClick = (id) =>{
    api.delete(`/delete?id=${id}`, {
      
    });
}

const getThesis= async () =>{
    const data = await api.get('/all');
    setThesis(data.data) 
};

useEffect(()=>{
  getThesis()
},[]);

if (getRole() === "Admin"){
    return (
      <div className="table-div">
        <form className='form-table' onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Thesis id</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Field of Study</th>
                <th>Campus</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {thesis.map((thesis)=>{
                return(
                  <>
                    {editThesisId === thesis.id ? (
                      <EditRow
                        editFormData={editFormData}
                        handleEditChange={handleEditChange}
                        handleCancelClick={handleCancelClick}
                      />
                      ):(
                      <ReadOnly 
                        thesis={thesis} 
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
          </form>
          <div className="add">
             <form className="add-table" onSubmit={addThesis}>
            <label>New Thesis</label>
              <input
                  type='text'
                  name='name'
                  required='required'
                  placeholder='name'
                  onChange=  {handleAddChange}
              />
              <input
                  type='text'
                  name='description'
                  required='required'
                  placeholder='description'
                  onChange=  {handleAddChange}
              />
              <input
                  type='text'
                  name='campus'
                  required='required'
                  placeholder='campus'
                  onChange=  {handleAddChange}
              />
              <input
                  type='text'
                  name='fieldOfStudy'
                  required='required'
                  placeholder='field of study'
                  onChange=  {handleAddChange}
              />
              <input type="submit" value="add thesis" />
          </form>
        </div>
        </div>
    );
} else if(getRole() === "Company") {
  return(
    <div>
      <h1>Company</h1>
    </div>
  )
} else if(getRole() === "Student" || getRole() === ""){
  return(
      <div className='thesisPage'>
        <h1 className='thesisSectionTitle'>Student</h1>
        <p>Uitleg ivm met hoe thesis te kiezen</p>
        <div className='thesisContainer'>
          {thesis.map((thesis)=>{
                return(
                  <>
                    <ThesisBlock 
                      thesis={thesis} 
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                </>
              );
            })}  
        </div> 
      </div>   
  )    
} else {
  return(
    <div>
      <h1>LOL</h1>
    </div>
  )
}    
    


}
export default ThesisList;