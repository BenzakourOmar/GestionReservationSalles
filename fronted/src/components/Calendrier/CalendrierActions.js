
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'; // Le composant principal
import dayGridPlugin from '@fullcalendar/daygrid'; // Vue grille quotidienne
import timeGridPlugin from '@fullcalendar/timegrid'; // Vue horaire


const CalendrierActions = ({ subMenu }) => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState('');
    const [salles, setSalles] = useState([]);
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        if (subMenu === 'salle') {
            axios.get('http://127.0.0.1:8000/api/salles').then((res) => setSalles(res.data));
        } else if (subMenu === 'promotion') {
            axios.get('http://127.0.0.1:8000/api/promotions').then((res) => setPromotions(res.data));
        }
    }, [subMenu]);

    const fetchReservations = () => {
        setLoading(true);
        const url =
            subMenu === 'salle'
                ? `http://127.0.0.1:8000/api/reservations/salle/${selectedId}`
                : `http://127.0.0.1:8000/api/reservations/promotion/${selectedId}`;

        axios
            .get(url)
            .then((response) => {
                setReservations(
                    response.data.map((res) => ({
                        title: `${res.promotion || res.salle} (${res.creneau.debut}-${res.creneau.fin})`,
                        start: `${res.date}T${res.creneau.debut}`,
                        end: `${res.date}T${res.creneau.fin}`,
                    }))
                );
                setLoading(false);
                setError(null);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération des réservations :', err);
                setError('Erreur lors de la récupération des réservations.');
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>{subMenu === 'salle' ? 'Calendrier par Salle' : 'Calendrier par Promotion'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {subMenu === 'salle' && (
                <div>
                    <label>Sélectionnez une salle :</label>
                    <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
                        <option value="">-- Choisissez une salle --</option>
                        {salles.map((salle) => (
                            <option key={salle.id} value={salle.id}>
                                {salle.nom}
                            </option>
                        ))}
                    </select>
                    <button onClick={fetchReservations}>Voir les Réservations</button>
                </div>
            )}
            {subMenu === 'promotion' && (
                <div>
                    <label>Sélectionnez une promotion :</label>
                    <select onChange={(e) => setSelectedId(e.target.value)} value={selectedId}>
                        <option value="">-- Choisissez une promotion --</option>
                        {promotions.map((promotion) => (
                            <option key={promotion.id} value={promotion.id}>
                                {promotion.nom}
                            </option>
                        ))}
                    </select>
                    <button onClick={fetchReservations}>Voir les Réservations</button>
                </div>
            )}
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={reservations} />
        </div>
    );
};

export default CalendrierActions;
