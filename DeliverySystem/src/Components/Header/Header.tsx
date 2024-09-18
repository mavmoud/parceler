import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { COLOR_MAIN } from '../../constants';
import { HOME_PAGE, APP_NAME, LOG_IN, CREATE_ACCOUNT } from './constants';
import { HOME_PAGE_URL, SIGN_IN_URL, CREATE_ACCOUNT_URL } from '../../constants';
import { handleClickPage } from './headerUtils';


export const Header = ({ setSignInAuth }: { setSignInAuth: Function }) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static" sx={{ backgroundColor: COLOR_MAIN }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton color='inherit'
                    onClick={() => navigate(HOME_PAGE_URL)}>
                    <HomeIcon />
                </ IconButton>
                <Typography variant="h6" >{HOME_PAGE}</Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', pl: 13 }}>
                    <Typography variant="h5">{APP_NAME}</Typography>
                </Box>
                <Button sx={{ color: "inherit", mr: 1 }}
                    onClick={() => { handleClickPage(navigate, SIGN_IN_URL, setSignInAuth, true) }}
                >
                    {LOG_IN}
                    <LoginIcon />
                </Button>
                <Button color="inherit"
                    onClick={() => { handleClickPage(navigate, CREATE_ACCOUNT_URL, setSignInAuth, false) }}
                >
                    {CREATE_ACCOUNT}
                    <AccountCircleIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
}