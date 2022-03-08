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
        this.handleAddChange = this.handleAddChange.bind(this);
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
    handleAddChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    deleteProfessor(idProfessor){
        api.delete(`/delete?idProfessor=${idProfessor}`);
        this.getProfessor();
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
                        <th>Edit/Delete</th>
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
                            <td><button onClick={()=>this.deleteProfessor(professor.idProfessor)}>x</button></td>
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
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='telephone number'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
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
                        type='email'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='campus'
                        required='required'
                        placeholder='campus'
                        onChange=  {this.handleAddChange}
                    />
                    <input
                        type='number'
                        name='coordinator'
                        required='required'
                        placeholder='coordinator'
                        onChange=  {this.handleAddChange}
                    />
                    <input type="submit" value="add professor"/>
                </form>

            </div>
        );
    }
}

export default Professors;
