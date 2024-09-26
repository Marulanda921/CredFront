/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CorralList = () => {
  const [corrals, setCorrals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/corrals')
      .then(response => setCorrals(response.data))
      .catch(error => console.error('Error fetching corrals:', error));
  }, []);

  return (
    <div>
      {corrals.map(corral => (
        <div key={corral.id}>
          <h3>Corral ID: {corral.id}</h3>
          <p>Capacity: {corral.capacity}</p>
          <p>Animals:</p>
          <ul>
            {corral.animals && corral.animals.map(animal => (
              <li key={animal.id}>
                {animal.name} (Age: {animal.age})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CorralList;
