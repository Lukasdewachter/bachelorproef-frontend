import React from 'react'
//import axios from 'axios'
import{Component} from 'react'
import'./ThesisLijst.css'

/*const api = axios.create({
  baseURL: `http://localhost:8080/student/`
})*/
class thesisLijst extends Component{
  /*constructor(){
    super();
    this.getStudenten = this.getStudenten.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }*/
  state = {
    proeven: []
}
  render(){
    return (
      <div className="thesisLijst">
          <hr size="80" noshade="true" color="1d8db0">
            
          </hr>  
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>lukas</td>
              </tr>
            </tbody>
          </table>
          <hr size="80" noshade="true" color="1d8db0"/>
      </div>
    );
  }
}

export default thesisLijst;
