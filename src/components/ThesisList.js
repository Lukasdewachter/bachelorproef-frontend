import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import'./ThesisList.css'

const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`
})
class ThesisList extends Component{
  constructor(){
    super();
    this.getThesis = this.getThesis.bind(this);
    this.addThesis = this.addThesis.bind(this);
    this.deleteThesis = this.deleteThesis.bind(this);
    this.getThesis()
  }
  state = {
    thesisList: [] //mag niet met hoofdletter
}
    getThesis = async () => {
        let data  = await api.get('/all').then(({data}) => data);
        this.setState({thesisList: data})
    }

    addThesis = event => {
        event.preventDefault();
        const name = this.state.name;
        const description = this.state.description;
        const fieldOfStudy = this.state.fieldOfStudy;
        const campus = this.state.campus;
        api.post(
            `/add
            ?name=${name}
            ?description=${description}
            ?fieldOfStudy=${fieldOfStudy}
            ?campus=${campus}
            `);
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
      <div className="thesisList">
          <table>
            <thead>
              <tr>
                <th>Thesis id</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Campus</th>
                <th>Field of Study</th>
              </tr>
            </thead>
            <tbody>
                {this.state.thesisList.map(thesis => (
                    <tr key={'thesis_'+thesis.idThesis+thesis.name+thesis.description+thesis.campus+thesis.fieldOfStudy}>
                        <td>{thesis.idThesis}</td>
                        <td>{thesis.name}</td>
                        <td>{thesis.description}</td>
                        <td>{thesis.campus}</td>
                        <td>{thesis.fieldOfStudy}</td>
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
                  name='description'
                  required='required'
                  placeholder='description'
              />
              <input
                  type='text'
                  name='campus'
                  required='required'
                  placeholder='campus'
              />
              <input
                  type='text'
                  name='fieldOfStudy'
                  required='required'
                  placeholder='field of study'
              />
          </form>
          <button onClick={this.addThesis}>add thesis</button>
      </div>
    );
  }
}

export default ThesisList;