/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const AnimalForm = () => {
  const [animalForm, setAnimalForm] = useState({
    name: '',
    age: '',
    dangerous: false,
    corralId: '',
    incompatibleAnimalIds: []
  });

  const [corralForm, setCorralForm] = useState({
    name: '',
    capacity: ''
  });

  const [corrals, setCorrals] = useState([]);
  const [activeForm, setActiveForm] = useState(null); 
  const [scrollY, setScrollY] = useState(0); 

  useEffect(() => {
    axios.get('http://localhost:9000/api/corrals')
      .then(response => setCorrals(response.data))
      .catch(error => console.error('Error fetching corrals:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAnimalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnimalForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCorralChange = (e) => {
    const { name, value } = e.target;
    setCorralForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleAnimalSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/animals', animalForm)
      .then(response => {
        console.log('Animal created:', response.data);
      })
      .catch(error => console.error('Error creating animal:', error));
  };

  const handleCorralSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/corrals', corralForm)
      .then(response => {
        console.log('Corral created:', response.data);
        axios.get('http://localhost:9000/api/corrals')
          .then(response => setCorrals(response.data))
          .catch(error => console.error('Error fetching corrals:', error));
      })
      .catch(error => console.error('Error creating corral:', error));
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center blur-[2px]"
        style={{
          backgroundImage: `url('/src/assets/Parallax.jpg')`, 
          backgroundPositionY: `${scrollY * 0.5}px`,
          zIndex: -1,
        }}
      ></div>

      {activeForm === null && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveForm('corral')}
              className="px-6 py-3 font-semibold text-indigo-600 bg-white rounded-md shadow-md hover:bg-indigo-950  hover:text-white hover:transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Crear Corral
            </button>
            <button
              onClick={() => setActiveForm('animal')}
              className="px-6 py-3 font-semibold  text-indigo-600 bg-white rounded-md shadow-md hover:bg-indigo-950 hover:text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Agregar Animal
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        <AnimatePresence>
          {activeForm && (
            <motion.div
              key={activeForm}
              className="w-full h-full flex items-center justify-center bg-gray-100 p-6 absolute top-0 left-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 10 }}
            >
              <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                {activeForm === 'corral' && (
                  <form onSubmit={handleCorralSubmit}>
                    <h2 className="text-xl font-bold mb-4">Add Corral</h2>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={corralForm.name}
                      onChange={handleCorralChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity:</label>
                    <input
                      type="number"
                      name="capacity"
                      value={corralForm.capacity}
                      onChange={handleCorralChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    />

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add Corral
                    </button>
                  </form>
                )}

                {activeForm === 'animal' && (
                  <form onSubmit={handleAnimalSubmit}>
                    <h2 className="text-xl font-bold mb-4">Add Animal</h2>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={animalForm.name}
                      onChange={handleAnimalChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={animalForm.age}
                      onChange={handleAnimalChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    />

                    <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        name="dangerous"
                        checked={animalForm.dangerous}
                        onChange={handleAnimalChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Dangerous</span>
                    </label>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Corral:</label>
                    <select
                      name="corralId"
                      value={animalForm.corralId}
                      onChange={handleAnimalChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    >
                      <option value="">Select a corral</option>
                      {corrals.map(corral => (
                        <option key={corral.id} value={corral.id}>
                          {corral.name} (ID: {corral.id})
                        </option>
                      ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mb-2">Incompatible Animal IDs (comma separated):</label>
                    <input
                      type="text"
                      name="incompatibleAnimalIds"
                      value={animalForm.incompatibleAnimalIds.join(', ')}
                      onChange={(e) => setAnimalForm({
                        ...animalForm,
                        incompatibleAnimalIds: e.target.value.split(',').map(id => id.trim()).filter(id => id)
                      })}
                      placeholder="Enter animal IDs, separated by commas"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-4"
                    />

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add Animal
                    </button>
                  </form>
                )}

                <button
                  onClick={() => setActiveForm(null)}
                  className="mt-4 w-full px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Volver
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimalForm;

