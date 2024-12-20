import React from 'react';
import { List, ListItem, ListItemText, Drawer, Toolbar } from '@mui/material';

const Sidebar = ({ onMenuSelect }) => {
    const menuItems = [
        { label: 'Gestion des Salles', value: 'salles' },
        { label: 'Gestion des Matières', value: 'matieres' },
        { label: 'Gestion des Enseignants', value: 'enseignant' },
        { label: 'Gestion des Promotions', value: 'promotions' },
        { label: 'Gestion des Créneaux', value: 'creneaux' },
        { label: 'Gestion des Réservations', value: 'reservations' },
        { label: 'Calendrier', value: 'calendrier' },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.value}
                        onClick={() => onMenuSelect(item.value)}
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
