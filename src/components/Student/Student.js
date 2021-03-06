import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'
import {authHeader} from '../auth'

const api = axios.create({
    baseURL: `https://localhost:8080/student/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});
const Student= () =>{
    const [student,setStudent] = useState([])
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:''
    });
    const [editId, setEditId] = useState(null);
    const handleEditClick = (event,student) =>{
        event.preventDefault();
        setEditId(student.id);
        //setEditStudentId(student.id);
        const formValues = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            tel: student.tel,
            address: student.address,
            fieldOfStudy: student.fieldOfStudy,
            mail: student.mail,
            campus: student.campus
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
            campus: editFormData.campus
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
    const getStudent= async () =>{
        api.get('/all')
        .then(function(response){
            setLoggedIn(true)
            setStudent(response.data)
        })
        .catch(function () {
            setLoggedIn(false);
        });
    };
    useEffect(()=>{
        getStudent()
    },[]);
    return (
        <div className="Students">
            <div>
                {!loggedIn && (
                    <div>
                        <p>You don't have permission for this action</p>
                    </div>
                )}
                <div className='div-list'>
                <form className='form-table' onSubmit={handleEditFormSubmit}>                
                            {student.map((student)=>{
                                return(
                                    <>
                                        {editId === student.id ? (
                                            <EditRow
                                                key={editId}
                                                student={student}
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                key={editId+1}
                                                student={student} 
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                                />
                                        )}
                                    </>
                                );
                            })} 
                </form>
                </div>
                </div>
            </div>

    );
};
export default Student;