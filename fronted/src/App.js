import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SalleActions from './components/Salle/SalleActions';
import PromotionActions from './components/Promotion/PromotionActions';
import MatiereActions from './components/Matiere/MatiereActions';
import EnseignantActions from './components/Enseignant/EnseignantActions';


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
        } else if (selectedMenu === 'reservations') {
            return <div>Gestion des Réservations</div>;
        } else if (selectedMenu === 'promotions') {
            return <PromotionActions action={selectedAction} />;
        }else if (selectedMenu === 'enseignant') {
            return <EnseignantActions action={selectedAction} />;
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