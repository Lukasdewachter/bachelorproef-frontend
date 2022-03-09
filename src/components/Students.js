import React, {Component,useState} from 'react'
import axios from 'axios'
import './MainStyleSheet.css'
import EditRow from './tables/e-student'
import ReadOnly from './tables/ro-student'

const api = axios.create({
    baseURL: `http://localhost:8080/student/`
})

class Students extends Component {
    constructor() {
        super();
        this.getStudent = this.getStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.getStudent();
    }
    
    state = {
        studenten: [] //mag niet met hoofdletter
    }
    getStudent = async () => {
        let data = await api.get('/all').then(({ data }) => data);
        this.setState({ studenten: data })
    }
    addStudent = () => {
        api.post('/add', {
            name: this.state.name,
            surname: this.state.surname,
            tel: this.state.tel,
            address: this.state.address,
            fieldOfStudy: this.state.fieldOfStudy,
            mail: this.state.mail,
            campus: this.state.campus
        });
        this.getStudent();
    }
    handleAddChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    deleteStudent(idStudent){
        api.delete(`/delete?idStudent=${idStudent}`);
        this.getStudent();
    }
    render() {
        return (
            <div className="Students">
                <form>
                    <table>
                     <thead>
                            <tr>
                                <th>Student id</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Telephone Number</th>
                                <th>Address</th>
                                <th>Field of Study</th>
                                <th>Mail</th>
                                <th>Campus</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody key='student_'>
                            {this.state.studenten.map(student => (
                                <>
                                        <EditRow/>
                                        
                                        <ReadOnly student={student}/>
                                        
                                </>           
                         ))}
                        </tbody>
                    </table>
                </form>
                <form onSubmit={this.addStudent}>
                    <label>New Student</label>
                    <input
                        type='text'
                        name='name'
                        required='required'
                        placeholder='name'
                        onChange={this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='surname'
                        required='required'
                        placeholder='surname'
                    onChange={this.handleAddChange}
                    />
                    <input
                        type='number'
                        name='tel'
                        required='required'
                        placeholder='tel number'
                        onChange={this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='address'
                        required='required'
                        placeholder='address'
                        onChange={this.handleAddChange}
                    />
                    <input
                        type='text'
                        name='fieldOfStudy'
                        required='required'
                        placeholder='field of study'
                        onChange={this.handleAddChange}
                    />
                    <input
                        type='email'
                        name='mail'
                        required='required'
                        placeholder='mail'
                        onChange={this.handleAddChange}
                    />
                    <input
                        type='text'
                            name='campus'
                            required='required'
                                placeholder='campus'
                        onChange={this.handleAddChange}
                    />
                    <input type="submit" value="add student" />
                </form>
            </div>

        );
    }
}

export default Students;
