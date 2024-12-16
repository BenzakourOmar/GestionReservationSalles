import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const Header = ({ actions, onActionSelect }) => {
    return (
        <AppBar position="static" style={{ marginLeft: 240 }}>
            <Toolbar>
                {actions.map((action) => (
                    <Button
                        key={action.value}
                        color="inherit"
                        onClick={() => onActionSelect(action.value)}
                    >
                        {action.label}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
