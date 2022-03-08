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
        api.post('/add',{
            name: this.state.name,
            surname: this.state.surname,
            tel: this.state.tel,
            address: this.state.address,
            fieldOfStudy: this.state.fieldOfStudy,
            mail: this.state.mail,
            campus: this.state.campus
          });
        this.getStudent()
    }
    deleteStudent = event => {
        const id = this.state.id;
        api.delete(`/delete/${id}`);
        this.getStudent()
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
    handleCampusChange = event =>{
        this.setState({
            campus: event.target.value,
        })
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
                        <th>Address</th>
                        <th>Field of Study</th>
                        <th>Mail</th>
                        <th>Campus</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.studenten.map(student => (
                        <tr key={'student_'+student.idStudent+student.name+student.surname+student.mail+student.tel+student.address+student.fieldOfStudy+student.campus}>
                            <td>{student.idStudent}</td>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.tel}</td>
                            <td>{student.address}</td>
                            <td>{student.fieldOfStudy}</td>
                            <td>{student.mail}</td>
                            <td>{student.campus}</td>
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
                        placeholder='tel number'
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
                    <input type="submit" value="add student"/>
                </form>
            </div>
            
        );
    }
}

export default Students;
