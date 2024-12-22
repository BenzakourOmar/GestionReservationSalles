import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    MenuItem,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const ReservationsActions = ({ action }) => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [editingReservation, setEditingReservation] = useState(null);

    // États pour les champs du formulaire
    const [date, setDate] = useState('');
    const [salle, setSalle] = useState('');
    const [creneau, setCreneau] = useState('');
    const [promotion, setPromotion] = useState('');
    const [enseignant, setEnseignant] = useState('');

    // Données pour les listes déroulantes
    const [salles, setSalles] = useState([]);
    const [creneaux, setCreneaux] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [enseignants, setEnseignants] = useState([]);

    // Fonction pour récupérer les données
    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/api/salles').then((res) => setSalles(res.data));
        axios.get('http://127.0.0.1:8000/api/creneaux').then((res) => setCreneaux(res.data));
        axios.get('http://127.0.0.1:8000/api/promotions').then((res) => setPromotions(res.data));
        axios.get('http://127.0.0.1:8000/api/enseignants').then((res) => setEnseignants(res.data));
    };

    const fetchReservations = () => {
        setLoading(true);
        axios
            .get('http://127.0.0.1:8000/api/reservations')
            .then((response) => {
                setReservations(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Erreur lors de la récupération des réservations.');
                setLoading(false);
            });
    };

    // Charger les données au chargement
    useEffect(() => {
        if (action === 'list' || action === 'add' || action === 'edit') {
            fetchData();
            fetchReservations();
        }
    }, [action]);

    const handleAddOrUpdate = (e) => {
        e.preventDefault();

        const reservationData = { date, salle, creneau, promotion, enseignant };

        if (editingReservation) {
            axios
                .put(`http://127.0.0.1:8000/api/reservations/${editingReservation.id}`, reservationData)
                .then(() => {
                    setMessage('Réservation mise à jour avec succès.');
                    setEditingReservation(null);
                    fetchReservations();
                })
                .catch(() => setError('Erreur lors de la mise à jour de la réservation.'));
        } else {
            axios
                .post('http://127.0.0.1:8000/api/reservations/new', reservationData)
                .then(() => {
                    setMessage('Réservation ajoutée avec succès.');
                    fetchReservations();
                })
                .catch(() => setError('Erreur lors de l\'ajout de la réservation.'));
        }

        setDate('');
        setSalle('');
        setCreneau('');
        setPromotion('');
        setEnseignant('');
    };

    const handleDeleteReservation = (id) => {
        axios
            .delete(`http://127.0.0.1:8000/api/reservations/${id}`)
            .then(() => {
                setMessage('Réservation supprimée avec succès.');
                fetchReservations();
            })
            .catch(() => setError('Erreur lors de la suppression de la réservation.'));
    };

    const handleEdit = (reservation) => {
        setEditingReservation(reservation);
        setDate(reservation.date);
        setSalle(reservation.salle);
        setCreneau(reservation.creneau.debut);
        setPromotion(reservation.promotion);
        setEnseignant(reservation.enseignant);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box sx={{ p: 4 }}>
            {message && <Alert severity="success">{message}</Alert>}
            {action === 'list' && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Salle</TableCell>
                                <TableCell>Promotion</TableCell>
                                <TableCell>Créneau</TableCell>
                                <TableCell>Enseignant</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.date}</TableCell>
                                    <TableCell>{reservation.salle}</TableCell>
                                    <TableCell>{reservation.promotion}</TableCell>
                                    <TableCell>
                                        {reservation.creneau.debut} - {reservation.creneau.fin}
                                    </TableCell>
                                    <TableCell>{reservation.enseignant}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeleteReservation(reservation.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {action === 'edit' && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Salle</TableCell>
                                <TableCell>Promotion</TableCell>
                                <TableCell>Créneau</TableCell>
                                <TableCell>Enseignant</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                    <TableCell>{reservation.date}</TableCell>
                                    <TableCell>{reservation.salle}</TableCell>
                                    <TableCell>{reservation.promotion}</TableCell>
                                    <TableCell>
                                        {reservation.creneau.debut} - {reservation.creneau.fin}
                                    </TableCell>
                                    <TableCell>{reservation.enseignant}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleEdit(reservation)}
                                        >
                                            Modifier
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {(action === 'add' || editingReservation) && (
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h6">
                            {editingReservation ? 'Modifier une Réservation' : 'Ajouter une Réservation'}
                        </Typography>
                        <form onSubmit={handleAddOrUpdate}>
                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Date"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Salle"
                                        select
                                        value={salle}
                                        onChange={(e) => setSalle(e.target.value)}
                                    >
                                        {salles.map((s) => (
                                            <MenuItem key={s.id} value={s.id}>
                                                {s.nom}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Créneau"
                                        select
                                        value={creneau}
                                        onChange={(e) => setCreneau(e.target.value)}
                                    >
                                        {creneaux.map((c) => (
                                            <MenuItem key={c.id} value={c.id}>
                                                {c.heure_debut} - {c.heure_fin}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Promotion"
                                        select
                                        value={promotion}
                                        onChange={(e) => setPromotion(e.target.value)}
                                    >
                                        {promotions.map((p) => (
                                            <MenuItem key={p.id} value={p.id}>
                                                {p.nom}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enseignant"
                                        select
                                        value={enseignant}
                                        onChange={(e) => setEnseignant(e.target.value)}
                                    >
                                        {enseignants.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                                {e.nom} {e.prenom}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit">
                                        {editingReservation ? 'Mettre à jour' : 'Ajouter'}
                                    </Button>
                                    {editingReservation && (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ ml: 2 }}
                                            onClick={() => setEditingReservation(null)}
                                        >
                                            Annuler
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ReservationsActions;
