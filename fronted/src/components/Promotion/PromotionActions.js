import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PromotionActions = ({ action }) => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState('');
    const [editingPromotion, setEditingPromotion] = useState(null); // Promotion sélectionnée pour modification

    // Fonction pour récupérer les promotions
    const fetchPromotions = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/promotions')
            .then((response) => {
                setPromotions(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des promotions :', err);
                setError('Erreur lors de la récupération des promotions.');
                setLoading(false);
            });
    };

    // Charger les promotions selon l'action
    useEffect(() => {
        if (action === 'list' || action === 'edit') {
            fetchPromotions();
        }
    }, [action]);

    // Fonction pour ajouter une promotion
    const handleAddPromotion = (e) => {
        e.preventDefault();
        if (!nom) {
            setError('Le champ nom est obligatoire.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/promotions/new', { nom })
            .then(() => {
                setMessage('Promotion ajoutée avec succès.');
                setError('');
                setNom('');
                fetchPromotions(); // Mettre à jour la liste après ajout
            })
            .catch((err) => {
                console.error('Erreur lors de l\'ajout de la promotion :', err);
                setError('Erreur lors de l\'ajout de la promotion.');
            });
    };

    // Fonction pour modifier une promotion
    const handleUpdatePromotion = (e) => {
        e.preventDefault();
        if (!nom) {
            setError('Le champ nom est obligatoire.');
            return;
        }

        axios
            .put(`http://127.0.0.1:8000/api/promotions/${editingPromotion.id}`, { nom })
            .then(() => {
                setMessage('Promotion modifiée avec succès.');
                setError('');
                setEditingPromotion(null);
                setNom('');
                fetchPromotions(); // Mettre à jour la liste après modification
            })
            .catch((err) => {
                console.error('Erreur lors de la modification de la promotion :', err);
                setError('Erreur lors de la modification de la promotion.');
            });
    };

    // Fonction pour supprimer une promotion
    const handleDeletePromotion = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/promotions/${id}`)
            .then(() => {
                setMessage('Promotion supprimée avec succès.');
                setError('');
                fetchPromotions(); // Mettre à jour la liste après suppression
            })
            .catch((err) => {
                console.error('Erreur lors de la suppression de la promotion :', err);
                setError('Erreur lors de la suppression de la promotion.');
            });
    };

    // Fonction pour sélectionner une promotion à modifier
    const handleSelectPromotionForEdit = (promotion) => {
        setEditingPromotion(promotion);
        setNom(promotion.nom);
        setMessage('');
        setError('');
    };

    // Affichage selon l'action
    if (action === 'add') {
        return (
            <div>
                <h2>Ajouter une Promotion</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleAddPromotion}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Nom de la promotion"
                        />
                    </div>
                    <button type="submit">Ajouter</button>
                </form>
            </div>
        );
    }

    if (action === 'list') {
        if (loading) {
            return <div>Chargement des promotions...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Liste des Promotions</h2>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <ul>
                    {promotions.map((promotion) => (
                        <li key={promotion.id}>
                            <strong>{promotion.nom}</strong>{' '}
                            <button onClick={() => handleDeletePromotion(promotion.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (action === 'edit') {
        if (editingPromotion) {
            return (
                <div>
                    <h2>Modifier une Promotion</h2>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleUpdatePromotion}>
                        <div>
                            <label>Nom :</label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                placeholder="Nom de la promotion"
                            />
                        </div>
                        <button type="submit">Mettre à jour</button>
                        <button type="button" onClick={() => setEditingPromotion(null)}>
                            Annuler
                        </button>
                    </form>
                </div>
            );
        }

        if (loading) {
            return <div>Chargement des promotions...</div>;
        }

        if (error) {
            return <div style={{ color: 'red' }}>{error}</div>;
        }

        return (
            <div>
                <h2>Sélectionnez une Promotion à Modifier</h2>
                <ul>
                    {promotions.map((promotion) => (
                        <li key={promotion.id}>
                            <strong>{promotion.nom}</strong>{' '}
                            <button onClick={() => handleSelectPromotionForEdit(promotion)}>Modifier</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <div>Sélectionnez une action.</div>;
};

export default PromotionActions;
