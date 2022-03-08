import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import'./MainStyleSheet.css'

const api = axios.create({
    baseURL: `http://localhost:8080/professor/`
})
class Professors extends Component{
    constructor(){
        super();
        this.getProfessor = this.getProfessor.bind(this);
        this.addProfessor = this.addProfessor.bind(this);
        this.deleteProfessor = this.deleteProfessor.bind(this);
        this.getProfessor();
    }
    state = {
        professors: [] //mag niet met hoofdletter
    }
    getProfessor = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({professors: data})
    }

    addProfessor = event => {
        api.post('/add',{
            name: this.state.name,
            surname: this.state.surname,
            tel: this.state.tel,
            address: this.state.address,
            fieldOfStudy: this.state.fieldOfStudy,
            mail: this.state.mail,
            campus: this.state.campus,
            coordinator: this.state.coordinator
        });
        this.getProfessor();
    }
    handleNameChange = event =>{
        this.setState({
            name: event.target.value,
        })
    }
    handleSurNameChange = event =>{
        this.setState({
            surname: event.target.value,
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
    handleFieldOfStudyChange = event =>{
        this.setState({
            fieldOfStudy: event.target.value,
        })
    }
    handleMailChange = event =>{
        this.setState({
            mail: event.target.value,
        })
    }
    handleCoordinatorChange = event =>{
        this.setState({
            coordinator: event.target.value,
        })
    }
    handleCampusChange = event =>{
        this.setState({
            campus: event.target.value,
        })
    }
    deleteProfessor = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getProfessor();
    }
    handleDeleteChange = event =>{
        this.setState({ id: event.target.value});
    }
    render(){
        return (
            <div className="Professors">
                <table>
                    <thead>
                    <tr>
                        <th>Professor id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Mail</th>
                        <th>Telephone Number</th>
                        <th>Address</th>
                        <th>Field of Study</th>
                        <th>Campus</th>
                        <th>Coordinator</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.professors.map(professor => (
                        <tr key={'professor_'+professor.idProfessor+professor.name+professor.surname+professor.mail+professor.tel+professor.address+professor.fieldOfStudy+professor.campus+professor.coordinator}>
                            <td>{professor.idProfessor}</td>
                            <td>{professor.name}</td>
                            <td>{professor.surname}</td>
                            <td>{professor.mail}</td>
                            <td>{professor.tel}</td>
                            <td>{professor.address}</td>
                            <td>{professor.fieldOfStudy}</td>
                            <td>{professor.campus}</td>
                            <td>{professor.coordinator}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <form onSubmit={this.addProfessor}>
                    <input
                        type='text'
                        name='name'
                        required='required'
                        placeholder='name'
                        onChange=  {this.handleNameChange}
                    />
                    <input
                        type='text'
                        name='surname'
                        required='required'
                        placeholder='surname'
                        onChange=  {this.handleSurNameChange}
                    />
                    <input
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                        onChange=  {this.handleTelChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
                        onChange=  {this.handleAddressChange}
                    />
                    <input
                        type='text'
                        name='fieldOfStudy'
                        required='required'
                        placeholder='field of study'
                        onChange=  {this.handleFieldOfStudyChange}
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
                        name='campus'
                        required='required'
                        placeholder='campus'
                        onChange=  {this.handleCampusChange}
                    />
                    <input
                        type='number'
                        name='coordinator'
                        required='required'
                        placeholder='coordinator'
                        onChange=  {this.handleCoordinatorChange}
                    />
                    <input type="submit" value="add professor"/>
                </form>

            </div>
        );
    }
}

export default Professors;
