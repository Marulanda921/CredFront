/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CorralAnimalView = () => {
  const [corrals, setCorrals] = useState([]);
  const [selectedCorral, setSelectedCorral] = useState('');
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/corrals')
      .then(response => setCorrals(response.data))
      .catch(error => console.error('Error fetching corrals:', error));
  }, []);

  const handleCorralChange = (e) => {
    const corralId = e.target.value;
    setSelectedCorral(corralId);

    if (corralId) {
      axios.get(`http://localhost:9000/api/animals/corrals/${corralId}`)
        .then(response => setAnimals(response.data))
        .catch(error => console.error('Error fetching animals:', error));
    } else {
      setAnimals([]);
    }
  };

  return (
    <div className="mx-auto bg-indigo-50 pt-40 py-16 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Visualizar Animales por Corral
        </h1>

        <div className="mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-3">Seleccionar Corral:</label>
          <select
            value={selectedCorral}
            onChange={handleCorralChange}
            className="block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg transition ease-in-out duration-150"
          >
            <option value="">Selecciona un corral</option>
            {corrals.map(corral => (
              <option key={corral.id} value={corral.id}>
                {corral.name} (ID: {corral.id})
              </option>
            ))}
          </select>
        </div>

        {animals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-indigo-200 shadow-md rounded-md">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-medium uppercase tracking-wider text-sm">Nombre</th>
                  <th className="px-6 py-4 text-left font-medium uppercase tracking-wider text-sm">Edad</th>
                  <th className="px-6 py-4 text-left font-medium uppercase tracking-wider text-sm">Peligroso</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {animals.map(animal => (
                  <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-700">{animal.name}</td>
                    <td className="px-6 py-4 text-gray-700">{animal.age}</td>
                    <td className="px-6 py-4 text-gray-700">{animal.dangerous ? 'Sí' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">No hay animales en este corral.</p>
        )}
      </div>
    </div>
  );
};

export default CorralAnimalView;
