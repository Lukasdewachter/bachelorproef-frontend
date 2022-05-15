import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'
import {authHeader} from '../auth'

const api = axios.create({
    baseURL: `https://localhost:8080/company/`,
    headers: {
        'Authorization': ''+authHeader(),
      }
});
const Company= () =>{
    const [company,setCompany] = useState([])
    const [editFormData, setEditFormData] = useState({
        firstName: '',
        lastName: '',
        tel: '',
        address: '',
        fieldOfStudy: '',
        mail: '',
        campus:'',
        companyName:''
    });
    const [editId, setEditId] = useState(null);
    const handleEditClick = (event,company) =>{
        event.preventDefault();
        setEditId(company.id);
        //setEditStudentId(student.id);
        const formValues = {
            id: company.id,
            firstName: company.firstName,
            lastName: company.lastName,
            tel: company.tel,
            address: company.address,
            fieldOfStudy: company.fieldOfStudy,
            mail: company.mail,
            campus: company.campus,
            companyName: company.companyName
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
            companyName: editFormData.companyName
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
    const getCompany= async () =>{
        api.get('/all')
        .then(function(response){
            setLoggedIn(true)
            setCompany(response.data)
        })
        .catch(function () {
            setLoggedIn(false);
        });
    };
    useEffect(()=>{
        getCompany()
    },[]);
    return (
        <div className="Com^pany">
            <div>
                {!loggedIn && (
                    <div>
                        <p>You don't have permission for this action</p>
                    </div>
                )}
                <div className='div-list'>
                <form className='form-table' onSubmit={handleEditFormSubmit}>                
                            {company.map((company)=>{
                                return(
                                    <React.Fragment >
                                        {editId === company.id ? (
                                            <EditRow
                                                key={editId}
                                                company={company}
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                key={editId+1}
                                                company={company} 
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
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
export default Company;