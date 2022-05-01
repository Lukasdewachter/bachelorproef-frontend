import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'

const api = axios.create({
    baseURL: `http://localhost:8080/professor/`
})
const Professors= () =>{
    const [professor,setProfessor] = useState([])
    
    const [editFormData, setEditFormData] = useState({
        name: '',
        surname: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:'',
        coordinator:''
    });
    const [editProfessorId, setEditProfessorId] = useState(null);
    const handleEditClick = (event,professor) =>{
        event.preventDefault();
        setEditProfessorId(professor.idProfessor);
        const formValues = {
            idProfessor: professor.idProfessor,
            name: professor.name,
            surname: professor.surname,
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
        api.put(`/update/${editFormData.idProfessor}`,{
            name: editFormData.name,
            surname: editFormData.surname,
            tel: editFormData.tel,
            address: editFormData.address,
            fieldOfStudy: editFormData.fieldOfStudy,
            mail: editFormData.mail,
            campus: editFormData.campus,
            coordinator: editFormData.coordinator
        });
        setEditProfessorId(null);
    };
    const handleCancelClick = () =>{
        setEditProfessorId(null);
    };
    const handleDeleteClick = (idProfessor) =>{
        api.delete(`/delete?idProfessor=${idProfessor}`);
    }
    const getProfessor= async () =>{
        const data = await api.get('/all')
        setProfessor(data.data) 
    };
    useEffect(()=>{
        getProfessor()
    },[]);
    return (
        <div className="Professor">
            <form className='form-table' onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                                <th>Professor id</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Telephone Number</th>
                                <th>Address</th>
                                <th>Field of Study</th>
                                <th>Mail</th>
                                <th>Campus</th>
                                <th>Coordinator</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody key='professor'>
                            {professor.map((professor)=>{
                                return(
                                    <>
                                        {editProfessorId === professor.idProfessor ? (
                                            <EditRow
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                professor={professor} 
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

    );
};

export default Professors;
