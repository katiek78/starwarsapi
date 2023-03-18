import React, { useEffect, useState } from 'react';
import { StarWarsPerson } from './star_wars_person';
import './App.css';

const App: React.FC = () => {

  const [person, setPerson] = useState<StarWarsPerson>({name:''});

  useEffect(() => {    
    const getPerson = async () => {
      const apiResponse = await fetch(`https://swapi.dev/api/people/`);      
      const json = await apiResponse.json();
      setPerson(json.results[0]);        
    };
    getPerson();
    
  }, []);


  return (
    <div>{person.name}</div>
  );
}

export default App;
