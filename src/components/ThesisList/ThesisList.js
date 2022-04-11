import React,{useEffect, useState} from 'react'
import axios from 'axios'
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

const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdWthc0BtYWlsLmNvbSIsImV4cCI6MTY0OTcxMDU2OCwiaWF0IjoxNjQ5NjkyNTY4fQ.x21W6AJKMXjHHKBfbWVg4IFmLk8lVG8TF9w8f9L2u968oFMI_H5Berh4K_fo0-kqHheUX-NNUoW-JFzAPErZuQ'

const getThesis= async () =>{
    const data = await api.get('/all', {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Authorization': 'Bearer '+ token
      }})
    setThesis(data.data) 
};
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
}
export default ThesisList;