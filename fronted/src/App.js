import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SalleActions from './components/Salle/SalleActions';
import PromotionActions from './components/Promotion/PromotionActions';
import MatiereActions from './components/Matiere/MatiereActions';
import EnseignantActions from './components/Enseignant/EnseignantActions';
import CreneauActions from './components/Creneaux/CreneauxActions';
import ReservationsActions from './components/Reservations/ReservationsActions';
import CalendrierActions from './components/Calendrier/CalendrierActions';


const App = () => {
    const [selectedMenu, setSelectedMenu] = useState('');
    const [selectedAction, setSelectedAction] = useState('');

    const actions = [
        { label: 'Ajouter', value: 'add' },
        { label: 'Lister', value: 'list' },
        { label: 'Supprimer', value: 'delete' },
    ];

    const renderContent = () => {
        if (selectedMenu === 'salles') {
            return <SalleActions action={selectedAction} />;
        } else if (selectedMenu === 'matieres') {
            return <MatiereActions action={selectedAction} />;
        } else if(selectedMenu === 'reservations'){
            return <ReservationsActions action={selectedAction}/>;
        } else if (selectedMenu === 'promotions') {
            return <PromotionActions action={selectedAction} />;
        }else if (selectedMenu === 'enseignant') {
            return <EnseignantActions action={selectedAction} />;
        }else if(selectedMenu === 'creneaux') {
            return <CreneauActions action={selectedAction} />;
        }else if (selectedMenu === 'calendrier') {
            return <CalendrierActions subMenu={selectedAction} />;
        }

        return <div>Bienvenue dans l'application de gestion des réservations.</div>;
    };

    return (
        <div>
            <Sidebar onMenuSelect={setSelectedMenu} />
            {selectedMenu && <Header actions={actions} onActionSelect={setSelectedAction} />}
            <div style={{ marginLeft: 240, marginTop: 64, padding: 20 }}>{renderContent()}</div>
        </div>
    );
};

export default App;