import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'
import {authHeader} from '../auth'

const api = axios.create({
    baseURL: `https://localhost:8080/professor/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});
const Professor= () =>{
    const [professor,setProfessor] = useState([])
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:'',
        coordinator:''
    });
    const [editId, setEditId] = useState(null);
    const handleEditClick = (event,professor) =>{
        event.preventDefault();
        setEditId(professor.id);
        //setEditStudentId(student.id);
        const formValues = {
            id: professor.id,
            firstName: professor.firstName,
            lastName: professor.lastName,
            tel: professor.tel,
            address: professor.address,
            fieldOfStudy: professor.fieldOfStudy,
            mail: professor.mail,
            campus: professor.campus,
            coordinator: professor.coordinator
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
        api.put(`/update/${editFormData.id}`,{
            firstName: editFormData.firstName,
            lastName: editFormData.lastName,
            tel: editFormData.tel,
            address: editFormData.address,
            fieldOfStudy: editFormData.fieldOfStudy,
            mail: editFormData.mail,
            campus: editFormData.campus,
            coordinator: editFormData.coordinator
        });
        setEditId(null);
    };
    const handleCancelClick = () =>{
        setEditId(null);
    };
    const handleDeleteClick = (id) =>{
        api.delete(`/delete?id=${id}`);
    }
    const [loggedIn, setLoggedIn] = useState(false);
    const getProfessor= async () =>{
        api.get('/all')
        .then(function(response){
            setLoggedIn(true)
            setProfessor(response.data)
        })
        .catch(function () {
            setLoggedIn(false);
        });
    };
    const isCoordinator = (coordinator)=>{
        if(coordinator===1){
            return "coordinator"
        }else{return "geen coordinator"}
    }
    useEffect(()=>{
        getProfessor()
    },[]);
    return (
        <div className="Professor">
            <div>
                {!loggedIn && (
                    <div>
                        <p>You don't have permission for this action</p>
                    </div>
                )}
                <div className='div-list'>
                <form className='form-table' onSubmit={handleEditFormSubmit}>                
                            {professor.map((professor)=>{
                                return(
                                    <React.Fragment >
                                        {editId === professor.id ? (
                                            <EditRow
                                                key={editId}
                                                professor={professor}
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                key={editId+1}
                                                professor={professor} 
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                                isCoordinator={isCoordinator}
                                                />
                                        )}
                                    </React.Fragment>
                                );
                            })} 
                </form>
                </div>
                </div>
            </div>

    );
};
export default Professor;