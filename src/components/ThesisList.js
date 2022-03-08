import React from 'react'
import axios from 'axios'
import{Component} from 'react'
import './MainStyleSheet.css'

const api = axios.create({
  baseURL: `http://localhost:8080/thesis/`
})
class ThesisList extends Component{
  constructor(){
    super();
    this.getThesis = this.getThesis.bind(this);
    this.addThesis = this.addThesis.bind(this);
    this.deleteThesis = this.deleteThesis.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
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
        api.post('/add',{
          name: this.state.name,
          description: this.state.description,
          fieldOfStudy: this.state.fieldOfStudy,
          campus: this.state.campus
        });
        this.getThesis();
    }
    handleAddChange = (event) =>{
      this.setState({
          [event.target.name] : event.target.value
      });
  }
  deleteThesis(idThesis){
    api.delete(`/delete?idThesis=${idThesis}`);
    this.getThesis();
  }       
  render(){
    return (
      <div className="thesisList">
        <header>
          <table>
            <thead>
              <tr>
                <th>Thesis id</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Campus</th>
                <th>Field of Study</th>
                <th>Edit/Delete</th>
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
                        <td><button onClick={()=>this.deleteThesis(thesis.idThesis)}>x</button></td>
                    </tr>   
                ))}
            </tbody>
          </table>
          <form onSubmit={this.addThesis}>
            <label>New Thesis</label>
              <input
                  type='text'
                  name='name'
                  required='required'
                  placeholder='name'
                  onChange=  {this.handleAddChange}
              />
              <input
                  type='text'
                  name='description'
                  required='required'
                  placeholder='description'
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
                  type='text'
                  name='fieldOfStudy'
                  required='required'
                  placeholder='field of study'
                  onChange=  {this.handleAddChange}
              />
              <input type="submit" value="add thesis" />
          </form>
          </header>
    </div>
    );
  }
}
export default ThesisList;