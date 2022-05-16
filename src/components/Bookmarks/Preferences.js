import React from 'react'

import '../MainStyleSheet.css'
import './Bookmarks.css'

const Preferences = ({thesisList, preference, save, submit, registerChange}) => {
    return(
          <div className='preferencesContainer'>
              <div className='preferences'>
                <div>
                  <label>Preference number 1: </label>
                  <select name="firstChoice" onChange={registerChange} defaultValue={"default"}>
                    <option value={"default"} disabled>
                      Choose a thesis
                    </option>
                    {thesisList.map((thesis)=>{
                        if(thesis.id === preference.firstChoice){
                            return(
                                <option value={thesis.id} selected="selected">{thesis.name}</option>
                            )
                        } else {
                            return(
                                <option value={thesis.id}>{thesis.name}</option>
                            )
                        }
                    })}
                  </select>
                </div>

                <div>
                  <label>Preference number 2: </label>
                  <select name="secondChoice" onChange={registerChange} defaultValue={"default"}>
                    <option value={"default"} disabled>
                      Choose a thesis
                    </option>
                    {thesisList.map((thesis)=>{
                        if(thesis.id === preference.secondChoice){
                            return(
                                <option value={thesis.id} selected="selected">{thesis.name}</option>
                            )
                        } else {
                            return(
                                <option value={thesis.id}>{thesis.name}</option>
                            )
                        }
                    })}
                  </select>
                  </div>

                  <div>
                  <label>Preference number 3: </label>
                  <select name="thirdChoice" onChange={registerChange} defaultValue={"default"}>
                    <option value={"default"} disabled>
                      Choose a thesis
                    </option>
                    {thesisList.map((thesis)=>{
                        if(thesis.id === preference.thirdChoice){
                            return(
                                <option value={thesis.id} selected="selected">{thesis.name}</option>
                            )
                        } else {
                            return(
                                <option value={thesis.id}>{thesis.name}</option>
                            )
                        }
                    })}
                  </select>
                  </div>

                  {!preference.submitted  && (
                        <div>
                            <button className="btn-pref" onClick={save}>Save</button>
                            <button className="btn-pref" onClick={submit}>Submit</button>
                        </div>
                      )
                  }
              </div>
            {thesisList.map((thesis)=>{
                return(null)
            })}
          </div> 
    );
  }
export {Preferences};