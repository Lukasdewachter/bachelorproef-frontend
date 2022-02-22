import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import thesisLijst from './components/thesisLijst'

ReactDOM.render(
  <React.StrictMode>
    <thesisLijst></thesisLijst>
  
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
