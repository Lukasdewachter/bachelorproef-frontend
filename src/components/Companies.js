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
        this.getCompany()
    }
    state = {
        companies: [] //mag niet met hoofdletter
    }
    getCompany = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({companies: data})
    }

    addCompany = event => {
        event.preventDefault();
        const companyName = this.state.companyName;
        const contactName = this.state.contactName;
        const mail = this.state.mail;
        const tel = this.state.tel;
        const adress = this.state.adress;
        api.post(
            `/add?companyName=${companyName}&contactName=${contactName}&mail=${mail}&tel=${tel}&adress=${adress}`);
        this.getCompany()
    }

    deleteCompany = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getCompany()
    }

    handleAddChange = event =>{
        this.setState({
            companyName: event.target.value,
            contactName: event.target.value,
            mail: event.target.value,
            tel: event.target.value,
            adress: event.target.value});
    }

    handleDeleteChange = event =>{
        this.setState({ id: event.target.value});
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
                        <th>Adress</th>
                        <th>Telephone number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.companies.map(company => (
                        <tr key={'company_'+company.idCompany+company.companyName+company.contactName+company.mail+company.tel}>
                            <td>{company.idCompany}</td>
                            <td>{company.companyName}</td>
                            <td>{company.contactName}</td>
                            <td>{company.mail}</td>
                            <td>{company.adress}</td>
                            <td>{company.tel}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <form onSubmit={this.addCompany}>
                    <input
                        type='text'
                        name='companyName'
                        required='required'
                        placeholder='Company name'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='contactName'
                        required='required'
                        placeholder='Contact person'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='adress'
                        required='required'
                        placeholder='adress'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                        onChange=  {this.handleAddChange}
                    />
                </form>
                <input type="submit" value="add company"/>
            </div>

        );
    }
}

export default Companies;
