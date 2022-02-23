import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThesisLijst from './components/ThesisLijst'
import Footer from './components/Footer';
import Home from './components/Home';
import Navigation from './components/Navigation'
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import './index.css';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
  <Navigation />
  <Routes>
    <Route path="/Home" element={<Home />} />
    <Route path="/thesis-list" element={<ThesisLijst />} />
    <Route path="/FAQ" element={<FAQ />} />
    <Route path="/contact" element={<Contact />}>
    </Route>
  </Routes>
  <Footer />
</Router>,
  document.getElementById('root')
);

//reportWebVitals(console.log);
