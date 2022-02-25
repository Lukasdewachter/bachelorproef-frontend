import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import'./Studenten.css'

const api = axios.create({
    baseURL: `http://localhost:8080/student/`
})
class Studenten extends Component{
    constructor(){
        super();
        this.getStudent = this.getStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.getStudent()
    }
    state = {
        Studenten: []
    }
    getStudent = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({studenten: data})
    }

    addStudent = event => {
        event.preventDefault();
        const name = this.state.name;
        api.post(`/add?name=${name}`);
        this.getStudent()
    }

    deleteStudent = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getStudent()
    }

    handleAddChange = event =>{
        this.setState({ name: event.target.value});
    }

    handleDeleteChange = event =>{
        this.setState({ id: event.target.value});
    }
    render(){
        return (
            <div className="Studenten">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Mail</th>
                        <th>Telephone Number</th>
                        <th>Adress</th>
                        <th>Field of Study</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.studenten.map(student => (
                        <tr key={'student_'+student.idstudent+student.name+student.surname+student.mail+student.tel+student.adress+student.fieldOfStudy}>
                            <td>{student.idstudent}</td>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.mail}</td>
                            <td>{student.tel}</td>
                            <td>{student.adress}</td>
                            <td>{student.fieldOfStudy}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Studenten;
