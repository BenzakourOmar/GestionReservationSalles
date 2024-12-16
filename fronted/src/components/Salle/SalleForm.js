import React, { useState } from 'react';
import api from '../../api';

const SalleForm = () => {
    const [nom, setNom] = useState('');
    const [capacite, setCapacite] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/salles/new', { nom, capacite: parseInt(capacite) })
            .then(() => {
                alert('Salle ajoutée avec succès.');
                setNom('');
                setCapacite('');
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginLeft: 240, padding: 20 }}>
            <h3>Ajouter une Salle</h3>
            <div>
                <label>Nom :</label>
                <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
            <div>
                <label>Capacité :</label>
                <input
                    type="number"
                    value={capacite}
                    onChange={(e) => setCapacite(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default SalleForm;
