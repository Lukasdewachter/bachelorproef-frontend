import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThesisPage from './components/Thesis/Thesis';
import Bookmarks from './components/Bookmarks/Bookmarks';
import Student from './components/Student/Student';
import Companies from './components/Companies/Companies';
import Professors from "./components/Professor/Professors";
import Footer from './components/Footer';
import Navigation from './components/Navigation'
import {ApproveThesis} from './components/Thesis/ApproveThesis';
import AssignThesis from './components/Thesis/AssignThesis'
import './index.css';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
  <Navigation />
  <Routes>
    <Route path="/" element={<ThesisPage />} />
    <Route path="/bookmarks" element={<Bookmarks />} />
    <Route path="/students" element={<Student />}/>
    <Route path="/companies" element={<Companies />}/>
    <Route path="/professors" element={<Professors />}/>
    <Route path="/Approve-Thesis" element={<ApproveThesis/>}/>
    <Route path="/Assign-Thesis" element={<AssignThesis/>}/>
  </Routes>
  <Footer />
</Router>,
  document.getElementById('root')
);

//reportWebVitals(console.log);
