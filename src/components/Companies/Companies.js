import React,{useEffect, useState} from 'react'
import axios from 'axios'
import ReadOnly from './ReadOnlyRow'
import '../MainStyleSheet.css'
import EditRow from './EditRow'

const api = axios.create({
    baseURL: `http://localhost:8080/company/`
})
const Companies= () =>{
    const [company,setCompany] = useState([])
    const [addData, setAddData] = useState({
        companyName: '',
        contactName: '',
        tel:'',
        address: '',
        mail: ''
    });
    const [editFormData, setEditFormData] = useState({
        companyName: '',
        contactName: '',
        tel:'',
        address: '',
        mail: ''
    });
    const [editCompanyId, setEditCompanyId] = useState(null);
    const handleAddChange = (event) =>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newData = {...addData};
        newData[fieldName] = fieldValue;
        setAddData(newData);
    };
    const handleEditClick = (event,company) =>{
        event.preventDefault();
        setEditCompanyId(company.idCompany);
        const formValues = {
            idCompany: company.idCompany,
            companyName: company.companyName,
            contactName: company.contactName,
            tel: company.tel,
            address: company.address,
            mail: company.mail
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
        api.put(`/update/${editFormData.idCompany}`,{
            companyName: editFormData.companyName,
            contactName: editFormData.contactName,
            tel: editFormData.tel,
            address: editFormData.address,
            mail: editFormData.mail
        });
        setEditCompanyId(null);
    };
    const handleCancelClick = () =>{
        setEditCompanyId(null);
    };
    const handleDeleteClick = (idCompany) =>{
        api.delete(`/delete?idCompany=${idCompany}`);
    }
    const addCompany = () =>{
        api.post('/add', {
            companyName: addData.companyName,
            contactName: addData.contactName,
            tel: addData.tel,
            address: addData.address,
            mail: addData.mail
        });
    };
    const getCompany= async () =>{
        const data = await api.get('/all')
        setCompany(data.data) 
    };
    useEffect(()=>{
        getCompany()
    },[]);
    return (
        <div className="Company">
                <form className='form-table' onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Company id</th>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Telephone Number</th>
                                <th>Address</th>
                                <th>Mail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody key='company'>
                            {company.map((company)=>{
                                return(
                                    <>
                                        {editCompanyId === company.idCompany ? (
                                            <EditRow
                                                editFormData={editFormData}
                                                handleEditChange={handleEditChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                            ):(
                                            <ReadOnly 
                                                company={company} 
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
                <form onSubmit={addCompany} className='form-table'>
                    <label>New Company</label>
                    <input
                        type='text'
                        name='companyName'
                        required='required'
                        placeholder='company name'
                        onChange=  {handleAddChange}
                    />
                    <input
                        type='text'
                        name='contactName'
                        required='required'
                        placeholder='contact name'
                        onChange=  {handleAddChange}
                    />
                     <input
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                        onChange=  {handleAddChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
                        onChange=  {handleAddChange}
                    />
                    <input
                        type='email'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange=  {handleAddChange}
                    />
                    <input type="submit" value="add company" />
                </form>
            </div>

    );
};
export default Companies;
