import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThesisList from './components/ThesisList/ThesisList';
import Student from './components/Student/Student';
import Companies from './components/Companies/Companies';
import Professors from "./components/Professor/Professors";
import Footer from './components/Footer';
import Home from './components/Home';
import Navigation from './components/Navigation'
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Login from './components/Login';
import ThesisAdd from './components/ThesisList/Thesis-add';
import './index.css';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
  <Navigation />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/thesis-list" element={<ThesisList />} />
    <Route path="/students" element={<Student />}/>
    <Route path="/companies" element={<Companies />}/>
    <Route path="/professors" element={<Professors />}/>
    <Route path="/FAQ" element={<FAQ />} />
    <Route path="/contact" element={<Contact />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/thesis-add' element={<ThesisAdd/>}/>
  </Routes>
  <Footer />
</Router>,
  document.getElementById('root')
);

//reportWebVitals(console.log);
