import React, { useState } from 'react';
import SalleForm from './SalleForm';
import SalleList from './SalleList';

const SalleActions = ({ action }) => {
    if (action === 'add') {
        return <SalleForm />;
    } else if (action === 'list') {
        return <SalleList />;
    } else {
        return <div>Sélectionnez une action à effectuer.</div>;
    }
};

export default SalleActions;
