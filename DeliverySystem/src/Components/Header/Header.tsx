import {AppBar, Box, Toolbar, Typography, Button, IconButton} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE} from './constants';
import { HOME_PAGE_URL } from '../../constants';
import {HeaderButtonGroup} from "./HeaderButtonGroup.tsx";

export const Header = ({ setSignInAuth, signInAuth }: { setSignInAuth: Function, signInAuth : boolean }) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static" sx={{ background : 'none' , p: 3}}>
            <Toolbar>
                <IconButton color='inherit'
                    onClick={() => navigate(HOME_PAGE_URL)}>
                    <HomeIcon />
                </ IconButton>
                <Typography variant="h6" >{HOME_PAGE}</Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', pl: 13 }}>
                    <Button color='inherit'>Track</Button>
                    <Button color='inherit'>Ship</Button>
                    <Button color='inherit'>Help</Button>
                </Box>
                <HeaderButtonGroup setSignInAuth={setSignInAuth} signInAuth={signInAuth} />
            </Toolbar>
        </AppBar>
    );
}
