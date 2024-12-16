import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SalleActions from './components/Salle/SalleActions';

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
            return <div>Gestion des Matières</div>;
        } else if (selectedMenu === 'reservations') {
            return <div>Gestion des Réservations</div>;
        } else if (selectedMenu === 'promotions') {
            return <div>Gestion des Promotions</div>;
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