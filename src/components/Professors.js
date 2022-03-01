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
            `/add
            ?name=${name}
            ?surname=${surname}
            ?mail=${mail}
            ?tel=${tel}
            ?adress=${adress}
            ?fieldOfStudy=${fieldOfStudy}
            ?coordinator=${coordinator}
            `);
        this.getProfessor()
    }

    deleteProfessor = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getProfessor()
    }

    handleAddChange = event =>{
        this.setState({ name: event.target.value});
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
                <form>
                    <input
                        type='text'
                        name='name'
                        required='required'
                        placeholder='name'
                    />
                    <input
                        type='text'
                        name='surname'
                        required='required'
                        placeholder='surname'
                    />
                    <input
                        type='text'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                    />
                    <input
                        type='text'
                        name='adress'
                        required='required'
                        placeholder='adress'
                    />
                    <input
                        type='text'
                        name='fieldOfStudy'
                        required='required'
                        placeholder='field of study'
                    />
                    <input
                        type='text'
                        name='mail'
                        required='required'
                        placeholder='mail'
                    />
                    <input
                        type='text'
                        name='coordinator'
                        required='required'
                        placeholder='coordinator'
                    />
                </form>
                <button onClick={this.addProfessor}>add professor</button>
            </div>

        );
    }
}

export default Professors;
