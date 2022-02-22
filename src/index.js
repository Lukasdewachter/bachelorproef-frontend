import React from 'react';
import ReactDOM from 'react-dom';
import ThesisLijst from './components/ThesisLijst'
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThesisLijst />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
