import React, { useContext, useEffect, useState } from 'react';
import {Box, IconButton, useTheme} from '@mui/material';
import { ColorModeContext } from '../../theme'; // Assurez-vous d'importer correctement votre contexte
import GreenHomeLogoDark from "../../public/GreenHomeLogoDark.png"
import GreenHomeLogoWhite from "../../public/GreenHomeLogoWhite.png"
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    // État local pour le chemin du logo en fonction de colors
    const [logo, setLogo] = useState(theme.palette.mode === 'dark' ? GreenHomeLogoWhite : GreenHomeLogoDark);

    // Effet pour mettre à jour le logo lorsque colors change
    useEffect(() => {
        const newLogo = theme.palette.mode === 'dark' ? GreenHomeLogoWhite : GreenHomeLogoDark;
        setLogo(newLogo);
    }, [theme.palette.mode]);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" borderRadius="3px">
                <img src={logo} width={'400px'} />
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <div class="icons">
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton>
                    <PersonOutlinedIcon onClick={()=> {navigate('/profile')}} />                    </IconButton>
                </div>
            </Box>
        </Box>
    );
};

export default Topbar;
