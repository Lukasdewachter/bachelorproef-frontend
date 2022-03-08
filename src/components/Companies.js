import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import './MainStyleSheet.css'

const api = axios.create({
    baseURL: `http://localhost:8080/company/`
})
class Companies extends Component{
    constructor(){
        super();
        this.getCompany = this.getCompany.bind(this);
        this.addCompany = this.addCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.getCompany();
    }
    state = {
        companies: [] //mag niet met hoofdletter
    }
    getCompany = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({companies: data})
    }

    addCompany = event => {
        api.post('/add',{
            companyName: this.state.companyName,
            contactName: this.state.contactName,
            mail: this.state.mail,
            tel: this.state.tel,
            address: this.state.address,
        });
        this.getCompany();
    }

    deleteCompany(idCompany) {
        api.delete(`/delete?idCompany=${idCompany}`);
        this.getCompany();
    }

    handleCompanyNameChange = event =>{
        this.setState({
            companyName: event.target.value,
        })
    }
    handleContactNameChange = event =>{
        this.setState({
            contactName: event.target.value,
        })
    }
    handleMailChange = event =>{
        this.setState({
            mail: event.target.value,
        })
    }
    handleTelChange = event =>{
        this.setState({
            tel: event.target.value,
        })
    }
    handleAddressChange = event =>{
        this.setState({
            address: event.target.value,
        })
    }
    render(){
        return (
            <div className="Companies">
                <table>
                    <thead>
                    <tr>
                        <th>Company id</th>
                        <th>Company name</th>
                        <th>Contact person</th>
                        <th>Mail</th>
                        <th>Address</th>
                        <th>Telephone number</th>
                        <th>Edit/Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.companies.map(company => (
                        <tr key={'company_'+company.idCompany+company.companyName+company.contactName+company.mail+company.address+company.tel}>
                            <td>{company.idCompany}</td>
                            <td>{company.companyName}</td>
                            <td>{company.contactName}</td>
                            <td>{company.mail}</td>
                            <td>{company.address}</td>
                            <td>{company.tel}</td>
                            <td><button onClick={()=>this.deleteCompany(company.idCompany)}>x</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <form onSubmit={this.addCompany}>
                    <label>New Company</label>
                    <input
                        type='text'
                        name='companyname'
                        required='required'
                        placeholder='company name'
                        onChange=  {this.handleCompanyNameChange}
                    />
                    <input
                        type='text'
                        name='contactname'
                        required='required'
                        placeholder='contact name'
                        onChange=  {this.handleContactNameChange}
                    />
                    <input
                        type='email'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange=  {this.handleMailChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
                        onChange=  {this.handleAddressChange}
                    />
                    <input
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                        onChange=  {this.handleTelChange}
                    />
                    <input type="submit" value="add company"/>
                </form>
            </div>

        );
    }
}

export default Companies;
