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
    const [addData, setAddData] = useState({
        name: '',
        surname: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:'',
        coordinator:''
    });
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
    const handleAddChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newData = {...addData};
        newData[fieldName] = fieldValue;
        setAddData(newData);
    };
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
    const addProfessor = () =>{
        api.post('/add', {
            name: addData.name,
            surname: addData.surname,
            tel: addData.tel,
            address: addData.address,
            fieldOfStudy: addData.fieldOfStudy,
            mail: addData.mail,
            campus: addData.campus,
            coordinator: addData.coordinator
        });
    };
    const getProfessor= async () =>{
        const data = await api.get('/all')
        setProfessor(data.data) 
    };
    useEffect(()=>{
        getProfessor()
    },[]);
    return (
        <div className="Professor">
                <form className='editForm' onSubmit={handleEditFormSubmit}>
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
                <form onSubmit={addProfessor} className='addForm'>
                    <label>New Professor</label>
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
                    <input
                        type='number'
                        name='coordinator'
                        required='required'
                        placeholder='coordinator'
                        onChange={handleAddChange}
                    />
                    <input type="submit" value="add professor" />
                </form>
            </div>

    );
};

export default Professors;
