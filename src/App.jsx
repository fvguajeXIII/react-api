import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ActorCard({ actor }) {
  return (
    <div className="actor-card" style={{border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px', maxWidth: '350px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
      <img src={actor.image} alt={actor.name} style={{width: '100%', borderRadius: '8px'}} />
      <h2>{actor.name}</h2>
      <p><strong>Anno di nascita:</strong> {actor.birth_year}</p>
      <p><strong>Nazionalità:</strong> {actor.nationality}</p>
      <p><strong>Biografia:</strong> {actor.biography}</p>
      {actor.awards && actor.awards.length > 0 && (
        <div>
          <strong>Riconoscimenti:</strong>
          <ul>
            {actor.awards.map((award, idx) => (
              <li key={idx}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch('https://lanciweb.github.io/demo/api/actors/')
      .then(response => response.json())
      .then(data => {
        setActors(data);
        console.log('Lista attori:', data);
      })
      .catch(error => {
        console.error('Errore nel recupero degli attori:', error);
      });
  }, []);

  return (
    <div>
      <h1>Elenco Attori</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {actors.map(actor => (
          <ActorCard key={actor.name} actor={actor} />
        ))}
      </div>
    </div>
  );
}

export default App;
