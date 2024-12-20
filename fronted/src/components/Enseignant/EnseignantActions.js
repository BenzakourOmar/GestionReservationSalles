import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnseignantActions = ({ action }) => {
    const [enseignants, setEnseignants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [editingEnseignant, setEditingEnseignant] = useState(null);

    const fetchEnseignants = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/enseignants')
            .then((response) => {
                setEnseignants(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des enseignants :', err);
                setError('Erreur lors de la récupération des enseignants.');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (action === 'list' || action === 'edit') {
            fetchEnseignants();
        }
    }, [action]);

    const handleAddEnseignant = (e) => {
        e.preventDefault();
        if (!nom || !prenom || !email) {
            setError('Les champs Nom, Prénom et Email sont obligatoires.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/enseignants/new', { nom, prenom, email })
            .then(() => {
                setMessage('Enseignant ajouté avec succès.');
                setError('');
                setNom('');
                setPrenom('');
                setEmail('');
                fetchEnseignants();
            })
            .catch((err) => {
                console.error('Erreur lors de l\'ajout de l\'enseignant :', err);
                setError('Erreur lors de l\'ajout de l\'enseignant.');
            });
    };

    const handleUpdateEnseignant = (e) => {
        e.preventDefault();
        if (!nom || !prenom || !email) {
            setError('Les champs Nom, Prénom et Email sont obligatoires.');
            return;
        }

        axios
            .put(`http://127.0.0.1:8000/api/enseignants/${editingEnseignant.id}`, { nom, prenom, email })
            .then(() => {
                setMessage('Enseignant modifié avec succès.');
                setError('');
                setEditingEnseignant(null);
                setNom('');
                setPrenom('');
                setEmail('');
                fetchEnseignants();
            })
            .catch((err) => {
                console.error('Erreur lors de la modification de l\'enseignant :', err);
                setError('Erreur lors de la modification de l\'enseignant.');
            });
    };

    const handleDeleteEnseignant = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/enseignants/${id}`)
            .then(() => {
                setMessage('Enseignant supprimé avec succès.');
                setError('');
                fetchEnseignants();
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression de l\'enseignant :', err);
                setError('Erreur lors de la suppression de l\'enseignant.');
            });
    };

    const handleSelectEnseignantForEdit = (enseignant) => {
        setEditingEnseignant(enseignant);
        setNom(enseignant.nom);
        setPrenom(enseignant.prenom);
        setEmail(enseignant.email);
        setMessage('');
        setError('');
    };

    if (action === 'add') {
        return (
            <div>
                <h2>Ajouter un Enseignant</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAddEnseignant}>
                    <div>
                        <label>Nom :</label>
                        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div>
                        <label>Prénom :</label>
                        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </div>
                    <div>
                        <label>Email :</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        );
    }

    if (action === 'list') {
        if (loading) return <div>Chargement des enseignants...</div>;
        if (error) return <div style={{ color: 'red' }}>{error}</div>;

        return (
            <div>
                <h2>Liste des Enseignants</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <ul>
                    {enseignants.map((enseignant) => (
                        <li key={enseignant.id}>
                            <strong>{enseignant.nom} {enseignant.prenom}</strong> - {enseignant.email}
                            <button onClick={() => handleDeleteEnseignant(enseignant.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (action === 'edit') {
        if (editingEnseignant) {
            return (
                <div>
                    <h2>Modifier un Enseignant</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleUpdateEnseignant}>
                        <div>
                            <label>Nom :</label>
                            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div>
                            <label>Prénom :</label>
                            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                        <div>
                            <label>Email :</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button type="button" onClick={() => setEditingEnseignant(null)}>Annuler</button>
                    </form>
                </div>
            );
        }

        if (loading) return <div>Chargement des enseignants...</div>;
        if (error) return <div style={{ color: 'red' }}>{error}</div>;

        return (
            <div>
                <h2>Sélectionnez un Enseignant à Modifier</h2>
                <ul>
                    {enseignants.map((enseignant) => (
                        <li key={enseignant.id}>
                            <strong>{enseignant.nom} {enseignant.prenom}</strong>
                            <button onClick={() => handleSelectEnseignantForEdit(enseignant)}>Modifier</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <div>Sélectionnez une action.</div>;
};

export default EnseignantActions;