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
        this.getProfessor()
    }
    state = {
        professors: [] //mag niet met hoofdletter
    }
    getProfessor = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({professors: data})
    }

    addProfessor = event => {
        event.preventDefault();
        const name = this.state.name;
        const surname = this.state.surname;
        const mail = this.state.mail;
        const tel = this.state.tel;
        const adress = this.state.adress;
        const fieldOfStudy = this.state.fieldOfStudy;
        const coordinator = this.state.coordinator;

        api.post(
            `/add?name=${name}&surname=${surname}&mail=${mail}&tel=${tel}&adress=${adress}&fieldOfStudy=${fieldOfStudy}&coordinator=${coordinator}`);
        this.getProfessor()
    }

    deleteProfessor = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getProfessor()
    }

    handleAddChange = event =>{
        this.setState({
            name: event.target.value,
            surname: event.target.value,
            mail: event.target.value,
            tel: event.target.value,
            adress: event.target.value,
            fieldOfStudy: event.target.value,
            coordinator: event.target.value
        });
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
                        <th>Adress</th>
                        <th>Field of Study</th>
                        <th>Coordinator</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.professors.map(professor => (
                        <tr key={'professor_'+professor.idProfessor+professor.name+professor.surname+professor.mail+professor.tel+professor.adress+professor.fieldOfStudy+professor.coordinator}>
                            <td>{professor.idProfessor}</td>
                            <td>{professor.name}</td>
                            <td>{professor.surname}</td>
                            <td>{professor.mail}</td>
                            <td>{professor.tel}</td>
                            <td>{professor.adress}</td>
                            <td>{professor.fieldOfStudy}</td>
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
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='surname'
                        required='required'
                        placeholder='surname'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
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
                        name='fieldOfStudy'
                        required='required'
                        placeholder='field of study'
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
                        name='coordinator'
                        required='required'
                        placeholder='coordinator'
                        onChange=  {this.handleAddChange}
                    />
                </form>
                <input type="submit" value="add professor"/>
            </div>

        );
    }
}

export default Professors;
