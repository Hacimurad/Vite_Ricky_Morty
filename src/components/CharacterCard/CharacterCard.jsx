import React from 'react';
import './CharacterCard.css';

function CharacterCard({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt={character.name} />
      <div className="card-body">
        <h2 className="card-title">{character.name}</h2>
        <ul className="card-list">
          <li><strong>Status:</strong> {character.status}</li>
          <li><strong>Species:</strong> {character.species}</li>
          <li><strong>Gender:</strong> {character.gender}</li>
          <li><strong>Origin:</strong> {character.origin.name}</li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(CharacterCard);
