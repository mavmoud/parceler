import {Button, Typography} from "@mui/material";
import {handleClickPage} from "./headerUtils.ts";
import {CREATE_ACCOUNT_URL, SIGN_IN_URL} from "../../constants.ts";
import {CREATE_ACCOUNT, LOG_IN} from "./constants.ts";
import {useNavigate} from "react-router-dom";

export const HeaderButtonGroup = ({ setSignInAuth, signInAuth }: { setSignInAuth: Function, signInAuth : boolean }) => {
    const navigate = useNavigate();
    const buttonTheme = (signInAuth : boolean) => {
        return signInAuth
            ? { color : 'black', backgroundColor : 'white', p : 0.5, gap: 1}
            : { color : 'white', backgroundColor: 'none', p : 0.5, gap: 1}
    }
    return (
        <>
            <Button sx={() => buttonTheme(signInAuth)}
                    onClick={() => { handleClickPage(navigate, SIGN_IN_URL, setSignInAuth, true) }}
            >
                <Typography p={0.5}>{LOG_IN}</Typography>
            </Button>
            <Button sx={() => buttonTheme(!signInAuth)}
                    onClick={() => { handleClickPage(navigate, CREATE_ACCOUNT_URL, setSignInAuth, false) }}
            >
                {CREATE_ACCOUNT}
            </Button>
        </>
    );
}
