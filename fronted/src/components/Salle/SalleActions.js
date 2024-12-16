import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalleActions = ({ action }) => {
    const [salles, setSalles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [capacite, setCapacite] = useState('');
    const [message, setMessage] = useState('');
    const [editingSalle, setEditingSalle] = useState(null); // Salle sélectionnée pour modification

    // Fonction pour récupérer les salles
    const fetchSalles = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/salles')
            .then((response) => {
                setSalles(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des salles :', err);
                setError('Erreur lors de la récupération des salles.');
                setLoading(false);
            });
    };

    // Charger les salles lorsque l'action est "list" ou "edit"
    useEffect(() => {
        if (action === 'list' || action === 'edit') {
            fetchSalles();
        }
    }, [action]);

    // Fonction pour ajouter une salle
    const handleAddSalle = (e) => {
        e.preventDefault();
        if (!nom || !capacite) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/salles/new', {
                nom: nom,
                capacite: parseInt(capacite),
            })
            .then(() => {
                setError('');
                setNom('');
                setCapacite('');
                fetchSalles(); // Mettre à jour la liste après ajout
            })
            .catch((err) => {
                console.error('Erreur lors de l\'ajout de la salle :', err);
                setError('Erreur lors de l\'ajout de la salle.');
            });
    };

    // Fonction pour supprimer une salle
    const handleDeleteSalle = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/salles/${id}`)
            .then(() => {
                setError('');
                fetchSalles(); // Mettre à jour la liste après suppression
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression de la salle :', err);
                setError('Erreur lors de la suppression de la salle.');
            });
    };

    // Fonction pour sélectionner une salle pour modification
    const handleSelectSalleForEdit = (salle) => {
        setEditingSalle(salle);
        setNom(salle.nom);
        setCapacite(salle.capacite);
        setMessage('');
        setError('');
    };

    // Fonction pour modifier une salle
    const handleUpdateSalle = (e) => {
        e.preventDefault();
        if (!nom || !capacite) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        axios
            .put(`http://127.0.0.1:8000/api/salles/${editingSalle.id}`, {
                nom: nom,
                capacite: parseInt(capacite),
            })
            .then(() => {
                setError('');
                setEditingSalle(null);
                setNom('');
                setCapacite('');
                fetchSalles(); // Mettre à jour la liste après modification
            })
            .catch((err) => {
                console.error('Erreur lors de la modification de la salle :', err);
                setError('Erreur lors de la modification de la salle.');
            });
    };

    // Affichage selon l'action sélectionnée
    if (action === 'add') {
        return (
            <div>
                <h2>Ajouter une Salle</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAddSalle}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom de la salle"
                        />
                    </div>
                    <div>
                        <label>Capacité :</label>
                        <input
                            type="number"
                            value={capacite}
                            onChange={(e) => setCapacite(e.target.value)}
                            placeholder="Capacité"
                        />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        );
    }

    if (action === 'list') {
        if (loading) {
            return <div>Chargement des salles...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Liste des Salles</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <ul>
                    {salles.map((salle) => (
                        <li key={salle.id}>
                            <strong>{salle.nom}</strong> - Capacité : {salle.capacite}{' '}
                            <button onClick={() => handleDeleteSalle(salle.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (action === 'edit') {
        if (editingSalle) {
            return (
                <div>
                    <h2>Modifier une Salle</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleUpdateSalle}>
                        <div>
                            <label>Nom :</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Nom de la salle"
                            />
                        </div>
                        <div>
                            <label>Capacité :</label>
                            <input
                                type="number"
                                value={capacite}
                                onChange={(e) => setCapacite(e.target.value)}
                                placeholder="Capacité"
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button onClick={() => setEditingSalle(null)}>Annuler</button>
                    </form>
                </div>
            );
        }

        if (loading) {
            return <div>Chargement des salles...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Sélectionnez une Salle à Modifier</h2>
                <ul>
                    {salles.map((salle) => (
                        <li key={salle.id}>
                            <strong>{salle.nom}</strong> - Capacité : {salle.capacite}{' '}
                            <button onClick={() => handleSelectSalleForEdit(salle)}>Modifier</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <div>Sélectionnez une action.</div>;
};

export default SalleActions;
