/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalForm from './components/AnimalForm';
import CorralList from './components/CorralList';
import CorralAnimalView from './components/CorralAnimalView';

const App = () => {
  return (
    <Router>
    <>
      <Routes>
        <Route path="/add-animal" element={<AnimalForm />} />
        <Route path="/corrals" element={<CorralList />} />
        <Route path="/" element={<AnimalForm />} />
      </Routes>
      <CorralAnimalView />
    </>
  </Router>
  );
};

export default App;
