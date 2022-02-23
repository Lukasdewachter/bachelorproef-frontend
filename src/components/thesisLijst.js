import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import'./ThesisLijst.css'

const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`
})
class ThesisLijst extends Component{
  constructor(){
    super();
    this.getThesis = this.getThesis.bind(this);
    this.addThesis = this.addThesis.bind(this);
    this.deleteThesis = this.deleteThesis.bind(this);
    this.getThesis()
  }
  state = {
    thesisList: []
}
    getThesis = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({thesisList: data})
    }

    addThesis = event => {
        event.preventDefault();
        const name = this.state.name;
        api.post(`/add?name=${name}`);
        this.getThesis()
    }

    deleteThesis = event => {
        event.preventDefault();
        const id = this.state.id;
        api.delete(`/delete?id=${id}`);
        this.getThesis()
    }

    handleAddChange = event =>{
        this.setState({ name: event.target.value});
    }

    handleDeleteChange = event =>{
        this.setState({ id: event.target.value});
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
                <th>Description</th>
                <th>Campus</th>
                <th>Field of Study</th>
              </tr>
            </thead>
            <tbody>
                {this.state.thesisList.map(thesis => (
                    <tr key={'thesis_'+thesis.idthesis+thesis.name+thesis.description+thesis.campus+thesis.fieldOfStudy}>
                        <td>{thesis.idthesis}</td>
                        <td>{thesis.name}</td>
                        <td>{thesis.description}</td>
                        <td>{thesis.campus}</td>
                        <td>{thesis.fieldOfStudy}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          <hr size="80" noshade="true" color="1d8db0"/>
      </div>
    );
  }
}

export default ThesisLijst;
