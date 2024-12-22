import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreneauActions = ({ action }) => {
    const [creneaux, setCreneaux] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [message, setMessage] = useState('');
    const [editingCreneau, setEditingCreneau] = useState(null);

    // Fonction pour récupérer les créneaux
    const fetchCreneaux = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/creneaux')
            .then((response) => {
                setCreneaux(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des créneaux :', err);
                setError('Erreur lors de la récupération des créneaux.');
                setLoading(false);
            });
    };

    // Charger les créneaux selon l'action
    useEffect(() => {
        if (action === 'list' || action === 'edit') {
            fetchCreneaux();
        }
    }, [action]);

    // Fonction pour ajouter un créneau
    const handleAddCreneau = (e) => {
        e.preventDefault();
        if (!heureDebut || !heureFin) {
            setError('Les champs Heure de début et Heure de fin sont obligatoires.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/creneaux/new', {
                heure_debut: heureDebut,
                heure_fin: heureFin,
            })
            .then(() => {
                setMessage('Créneau ajouté avec succès.');
                setError('');
                setHeureDebut('');
                setHeureFin('');
                fetchCreneaux(); // Mettre à jour la liste après ajout
            })
            .catch((err) => {
                console.error('Erreur lors de l\'ajout du créneau :', err);
                setError('Erreur lors de l\'ajout du créneau.');
            });
    };

    // Fonction pour modifier un créneau
    const handleUpdateCreneau = (e) => {
        e.preventDefault();
        if (!heureDebut || !heureFin) {
            setError('Les champs Heure de début et Heure de fin sont obligatoires.');
            return;
        }

        axios
            .put(`http://127.0.0.1:8000/api/creneaux/${editingCreneau.id}`, {
                heure_debut: heureDebut,
                heure_fin: heureFin,
            })
            .then(() => {
                setMessage('Créneau modifié avec succès.');
                setError('');
                setEditingCreneau(null);
                setHeureDebut('');
                setHeureFin('');
                fetchCreneaux(); // Mettre à jour la liste après modification
            })
            .catch((err) => {
                console.error('Erreur lors de la modification du créneau :', err);
                setError('Erreur lors de la modification du créneau.');
            });
    };

    // Fonction pour supprimer un créneau
    const handleDeleteCreneau = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/creneaux/${id}`)
            .then(() => {
                setMessage('Créneau supprimé avec succès.');
                setError('');
                fetchCreneaux(); // Mettre à jour la liste après suppression
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression du créneau :', err);
                setError('Erreur lors de la suppression du créneau.');
            });
    };

    // Fonction pour sélectionner un créneau à modifier
    const handleSelectCreneauForEdit = (creneau) => {
        setEditingCreneau(creneau);
        setHeureDebut(creneau.heure_debut);
        setHeureFin(creneau.heure_fin);
        setMessage('');
        setError('');
    };

    // Affichage selon l'action
    if (action === 'add') {
        return (
            <div>
                <h2>Ajouter un Créneau</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAddCreneau}>
                    <div>
                        <label>Heure de début :</label>
                        <input
                            type="time"
                            value={heureDebut}
                            onChange={(e) => setHeureDebut(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Heure de fin :</label>
                        <input
                            type="time"
                            value={heureFin}
                            onChange={(e) => setHeureFin(e.target.value)}
                        />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        );
    }

    if (action === 'list') {
        if (loading) {
            return <div>Chargement des créneaux...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Liste des Créneaux</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <ul>
                    {creneaux.map((creneau) => (
                        <li key={creneau.id}>
                            {creneau.heure_debut} - {creneau.heure_fin}{' '}
                            <button onClick={() => handleDeleteCreneau(creneau.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (action === 'edit') {
        if (editingCreneau) {
            return (
                <div>
                    <h2>Modifier un Créneau</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleUpdateCreneau}>
                        <div>
                            <label>Heure de début :</label>
                            <input
                                type="time"
                                value={heureDebut}
                                onChange={(e) => setHeureDebut(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Heure de fin :</label>
                            <input
                                type="time"
                                value={heureFin}
                                onChange={(e) => setHeureFin(e.target.value)}
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button type="button" onClick={() => setEditingCreneau(null)}>
                            Annuler
                        </button>
                    </form>
                </div>
            );
        }

        if (loading) {
            return <div>Chargement des créneaux...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Sélectionnez un Créneau à Modifier</h2>
                <ul>
                    {creneaux.map((creneau) => (
                        <li key={creneau.id}>
                            {creneau.heure_debut} - {creneau.heure_fin}{' '}
                            <button onClick={() => handleSelectCreneauForEdit(creneau)}>Modifier</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <div>Sélectionnez une action.</div>;
};

export default CreneauActions;
