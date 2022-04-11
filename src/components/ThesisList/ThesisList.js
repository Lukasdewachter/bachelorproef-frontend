import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'

const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`
})
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
    setEditThesisId(thesis.idThesis);
    const formValues = {
        idThesis: thesis.idThesis,
        name: thesis.name,
        description: thesis.description,
        address: thesis.address,
        fieldOfStudy: thesis.fieldOfStudy,
        campus: thesis.campus
    };
    setEditFormData(formValues);
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
    api.put(`/update/${editFormData.idThesis}`,{
        name: editFormData.name,
        description: editFormData.description,
        campus: editFormData.campus,
        fieldOfStudy: editFormData.fieldOfStudy
    });
    setEditThesisId(null);
};
const handleCancelClick = () =>{
    setEditThesisId(null);
};
const handleDeleteClick = (idThesis) =>{
    api.delete(`/delete?idThesis=${idThesis}`);
}
const getThesis= async () =>{
    const data = await api.get('/all')
    setThesis(data.data) 
};
const nextPath= (path) =>{
  this.props.history.push(path);
}
useEffect(()=>{
    getThesis()
},[]);      
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
                    {editThesisId === thesis.idThesis ? (
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
          <div>
          <Link to="/thesis-add"><button className='btn-login' onClick={() => nextPath('/thesis-add')}>Add Thesis</button></Link>
          </div>
          </form>
    </div>
    );
}
export default ThesisList;