import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'
import authHeader from '../auth'

const api = axios.create({
    baseURL: `http://localhost:8080/student/`,
    headers: {
        'Authorization': 'Bearer '+authHeader(),
      }
});
const Student= () =>{
    const [student,setStudent] = useState([])
    /*const [addData, setAddData] = useState({
        firstName: '',
        lastName: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:''
    });*/
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
    /*const handleAddChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newData = {...addData};
        newData[fieldName] = fieldValue;
        setAddData(newData);
    };*/
    const handleEditClick = (event,student) =>{
        event.preventDefault();
        setEditId(student.id);
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
    const handleDeleteClick = (idStudent) =>{
        api.delete(`/delete?idStudent=${idStudent}`);
    }
   /* const addStudent = () =>{
        api.post('/add', {
            firstName: addData.firstName,
            lastName: addData.lastName,
            tel: addData.tel,
            address: addData.address,
            fieldOfStudy: addData.fieldOfStudy,
            mail: addData.mail,
            campus: addData.campus
        });
        getStudent();
    };*/
    const getStudent= async () =>{
        const data = await api.get('/all')
        setStudent(data.data) 
    };
    useEffect(()=>{
        getStudent()
    },[]);
    return (
        <div className="Students">
            <div>
                <form className='form-table' onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Student id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Telephone Number</th>
                                <th>Address</th>
                                <th>Field of Study</th>
                                <th>Mail</th>
                                <th>Campus</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody key='student_'>
                            {student.map((student)=>{
                                return(
                                    <>
                                        {editId === student.id ? (
                                            <EditRow
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                student={student} 
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
                </div>
            </div>

    );
};
export default Student;