import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { useAuth } from '../services/authContext';

const ToolbarLayout = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const { user, logout } = useAuth();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        console.log(location);
        let url = `${window.location.origin}/auth/signout`;
        fetch(url);
    };

    return (
        <AppBar position="static">
            <ToolbarLayout>
                <Button
                    color="inherit"
                    aria-label="open drawer"
                    component={Link}
                    to="/"
                >
                    <HomeIcon />
                </Button>
                <Typography variant="h6">
                    User Panel
                </Typography>
                <div style={{ visibility: user ? 'visible' : 'hidden' }}>
                    <IconButton
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            to="user-panel"
                        >User Panel</MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            component={Link}
                            to="/">Logout</MenuItem>
                    </Menu>
                </div>

            </ToolbarLayout>
        </AppBar>
    );
}