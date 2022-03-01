import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import './MainStyleSheet.css'

const api = axios.create({
    baseURL: `http://localhost:8080/student/`
})
class Students extends Component{
    constructor(){
        super();
        this.getStudent = this.getStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.getStudent()
    }
    state = {
        studenten: [] //mag niet met hoofdletter
    }
    getStudent = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({studenten: data})
    }

    addStudent = event => {
        event.preventDefault();
        const name = this.state.name;
        const surname = this.state.surname;
        const tel = this.state.tel;
        const adress = this.state.adress;
        const fieldOfStudy = this.state.fieldOfStudy;
        const mail = this.state.mail;
        api.post(
            `/add?name=${name}&surname=${surname}&tel=${tel}&adress=${adress}&fieldOfStudy=${fieldOfStudy}&mail=${mail}`);
        this.getStudent()
    }
    deleteStudent = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getStudent()
    }

    handleAddChange = event =>{
        this.setState({
            name: event.target.value,
            surname: event.target.value,
            tel: event.target.value,
            adress: event.target.value,
            fieldOfStudy: event.target.value,
            mail: event.target.value
        });
    }

    handleDeleteChange = event =>{
        this.setState({ id: event.target.value});
    }
    render(){
        return (
            <div className="Students">
                <table>
                    <thead>
                    <tr>
                        <th>Student id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Telephone Number</th>
                        <th>Adress</th>
                        <th>Field of Study</th>
                        <th>Mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.studenten.map(student => (
                        <tr key={'student_'+student.idStudent+student.name+student.surname+student.mail+student.tel+student.adress+student.fieldOfStudy}>
                            <td>{student.idStudent}</td>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.tel}</td>
                            <td>{student.adress}</td>
                            <td>{student.fieldOfStudy}</td>
                            <td>{student.mail}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <form onSubmit={this.addStudent}>
                    <label>New Student</label>
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
                        placeholder='tel number'
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
                    <input type="submit" value="add student"/>
                </form>
            </div>
            
        );
    }
}

export default Students;
