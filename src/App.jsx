import { useState, useEffect } from 'react'
import './App.css'

function ActorCard({ actor }) {
  return (
    <div className="actor-card" style={{
      background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
      border: '1px solid #a5b4fc',
      borderRadius: '16px',
      padding: '24px',
      margin: '16px',
      maxWidth: '340px',
      boxShadow: '0 4px 16px rgba(100,100,200,0.12)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <img src={actor.image} alt={actor.name} style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px', border: '3px solid #6366f1'}} />
      <h2 style={{color: '#3730a3', marginBottom: '8px'}}>{actor.name}</h2>
      <p style={{margin: '4px 0'}}><strong>Anno di nascita:</strong> {actor.birth_year}</p>
      <p style={{margin: '4px 0'}}><strong>Nazionalità:</strong> {actor.nationality}</p>
      <p style={{margin: '8px 0', fontSize: '0.95em', color: '#334155'}}><strong>Biografia:</strong> {actor.biography}</p>
      {actor.awards && actor.awards.length > 0 && (
        <div style={{marginTop: '8px', width: '100%'}}>
          <strong style={{color: '#6366f1'}}>Riconoscimenti:</strong>
          <ul style={{paddingLeft: '18px', margin: '6px 0'}}>
            {actor.awards.map((award, idx) => (
              <li key={idx} style={{fontSize: '0.95em', color: '#64748b'}}>{award}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function App() {
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredActors = actors.filter(actor =>
    actor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Elenco Attori</h1>
      <input
        type="text"
        placeholder="Cerca per nome..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: '8px 12px',
          margin: '16px auto',
          display: 'block',
          borderRadius: '8px',
          border: '1px solid #a5b4fc',
          fontSize: '1em',
          width: '220px',
        }}
      />
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {filteredActors.map(actor => (
          <ActorCard key={actor.name} actor={actor} />
        ))}
      </div>
    </div>
  );
}

export default App;
