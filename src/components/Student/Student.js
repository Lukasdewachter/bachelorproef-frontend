import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'

const api = axios.create({
    baseURL: `http://localhost:8080/student/`
});
const Student= () =>{
    const [student,setStudent] = useState([])
    const [addData, setAddData] = useState({
        name: '',
        surname: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:''
    });
    const [editFormData, setEditFormData] = useState({
        name: '',
        surname: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:''
    });
    const [editStudentId, setEditStudentId] = useState(null);
    const handleAddChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newData = {...addData};
        newData[fieldName] = fieldValue;
        setAddData(newData);
    };
    const handleEditClick = (event,student) =>{
        event.preventDefault();
        setEditStudentId(student.idStudent);
        const formValues = {
            idStudent: student.idStudent,
            name: student.name,
            surname: student.surname,
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
        //event.preventDefault();
        api.put(`/update/${editFormData.idStudent}`,{
            name: editFormData.name,
            surname: editFormData.surname,
            tel: editFormData.tel,
            address: editFormData.address,
            fieldOfStudy: editFormData.fieldOfStudy,
            mail: editFormData.mail,
            campus: editFormData.campus
        });
        setEditStudentId(null);
    };
    const handleCancelClick = () =>{
        setEditStudentId(null);
    };
    const handleDeleteClick = (idStudent) =>{
        api.delete(`/delete?idStudent=${idStudent}`);
    }
    const addStudent = () =>{
        api.post('/add', {
            name: addData.name,
            surname: addData.surname,
            tel: addData.tel,
            address: addData.address,
            fieldOfStudy: addData.fieldOfStudy,
            mail: addData.mail,
            campus: addData.campus
        });
        this.getStudent();
    };
    const getStudent= async () =>{
        const data = await api.get('/all')
        setStudent(data.data) 
    };
    useEffect(()=>{
        getStudent()
    },[]);
    return (
        <div className="Students">
                <form className='form-table' onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Student id</th>
                                <th>Name</th>
                                <th>Surname</th>
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
                                        {editStudentId === student.idStudent ? (
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
                <form onSubmit={addStudent} className='form-table'>
                    <label>New Student</label>
                    <input
                        type='text'
                        name='name'
                        required='required'
                        placeholder='name'
                        onChange={handleAddChange}
                        />
                    <input
                        type='text'
                        name='surname'
                        required='required'
                        placeholder='surname'
                        onChange={handleAddChange}
                    />
                    <input
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='tel number'
                        onChange={handleAddChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
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
                        type='email'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange={handleAddChange}
                    />
                    <input
                        type='text'
                        name='campus'
                        required='required'
                        placeholder='campus'
                        onChange={handleAddChange}
                    />
                    <input type="submit" value="add student" />
                </form>
            </div>

    );
};
export default Student;