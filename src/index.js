import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThesisPage from './components/Thesis/Thesis';
import Student from './components/Student/Student';
import Companies from './components/Companies/Companies';
import Professors from "./components/Professor/Professors";
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
    <Route path="/" element={<Home />} />
    <Route path="/thesis" element={<ThesisPage />} />
    <Route path="/students" element={<Student />}/>
    <Route path="/companies" element={<Companies />}/>
    <Route path="/professors" element={<Professors />}/>
    <Route path="/FAQ" element={<FAQ />} />
    <Route path="/contact" element={<Contact />}/>
  </Routes>
  <Footer />
</Router>,
  document.getElementById('root')
);

//reportWebVitals(console.log);
