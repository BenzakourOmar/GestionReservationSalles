import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatiereActions = ({ action }) => {
    const [matieres, setMatieres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');
    const [editingMatiere, setEditingMatiere] = useState(null);

    // Fonction pour récupérer les matières
    const fetchMatieres = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/matieres')
            .then((response) => {
                setMatieres(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des matières :', err);
                setError('Erreur lors de la récupération des matières.');
                setLoading(false);
            });
    };

    // Charger les matières selon l'action
    useEffect(() => {
        if (action === 'list' || action === 'edit') {
            fetchMatieres();
        }
    }, [action]);

    // Fonction pour ajouter une matière
    const handleAddMatiere = (e) => {
        e.preventDefault();
        if (!nom) {
            setError('Le champ nom est obligatoire.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/matieres/new', { nom })
            .then(() => {
                setMessage('Matière ajoutée avec succès.');
                setError('');
                setNom('');
                fetchMatieres();
            })
            .catch((err) => {
                console.error('Erreur lors de l\'ajout de la matière :', err);
                setError('Erreur lors de l\'ajout de la matière.');
            });
    };

    // Fonction pour modifier une matière
    const handleUpdateMatiere = (e) => {
        e.preventDefault();
        if (!nom) {
            setError('Le champ nom est obligatoire.');
            return;
        }

        axios
            .put(`http://127.0.0.1:8000/api/matieres/${editingMatiere.id}`, { nom })
            .then(() => {
                setMessage('Matière modifiée avec succès.');
                setError('');
                setEditingMatiere(null);
                setNom('');
                fetchMatieres();
            })
            .catch((err) => {
                console.error('Erreur lors de la modification de la matière :', err);
                setError('Erreur lors de la modification de la matière.');
            });
    };

    // Fonction pour supprimer une matière
    const handleDeleteMatiere = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/matieres/${id}`)
            .then(() => {
                setMessage('Matière supprimée avec succès.');
                setError('');
                fetchMatieres();
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression de la matière :', err);
                setError('Erreur lors de la suppression de la matière.');
            });
    };

    // Fonction pour sélectionner une matière à modifier
    const handleSelectMatiereForEdit = (matiere) => {
        setEditingMatiere(matiere);
        setNom(matiere.nom);
        setMessage('');
        setError('');
    };

    // Affichage selon l'action
    if (action === 'add') {
        return (
            <div>
                <h2>Ajouter une Matière</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAddMatiere}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom de la matière"
                        />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        );
    }

    if (action === 'list') {
        if (loading) {
            return <div>Chargement des matières...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Liste des Matières</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <ul>
                    {matieres.map((matiere) => (
                        <li key={matiere.id}>
                            <strong>{matiere.nom}</strong>{' '}
                            <button onClick={() => handleDeleteMatiere(matiere.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (action === 'edit') {
        if (editingMatiere) {
            return (
                <div>
                    <h2>Modifier une Matière</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleUpdateMatiere}>
                        <div>
                            <label>Nom :</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Nom de la matière"
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button type="button" onClick={() => setEditingMatiere(null)}>
                            Annuler
                        </button>
                    </form>
                </div>
            );
        }

        if (loading) {
            return <div>Chargement des matières...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Sélectionnez une Matière à Modifier</h2>
                <ul>
                    {matieres.map((matiere) => (
                        <li key={matiere.id}>
                            <strong>{matiere.nom}</strong>{' '}
                            <button onClick={() => handleSelectMatiereForEdit(matiere)}>Modifier</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <div>Sélectionnez une action.</div>;
};

export default MatiereActions;
