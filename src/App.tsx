import React, { useEffect, useState } from 'react';
import { StarWarsPerson } from './star_wars_person';
import './App.css';

const App: React.FC = () => {

  const [person, setPerson] = useState<StarWarsPerson>({name:''});  
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {    
    const getPerson = async () => {     
      const apiResponse = await fetch(`https://swapi.dev/api/people/`);   
      if (apiResponse.status === 500) {
        setErrorMessage("Oops... something went wrong, try again 🤕");
      } else if (apiResponse.status === 418) {
        setErrorMessage("418 I'm a tea pot, silly");
      } else {
        setErrorMessage('');
        const json = await apiResponse.json();
        setPerson(json.results[0]);        
      }
    };
    getPerson();
    
  }, []);


  return (
    <>    
    <header>
      <p className={"main-heading"}>STAR WARS API PROJECT</p>
    </header>
    {person.name && <div className={"star-wars-person"}>{person.name}</div>}
    {errorMessage && <div className={"error"}>{errorMessage}</div>}
    </>
  );
}

export default App;
