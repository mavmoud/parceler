import {Typography, Box, Button} from '@mui/material';
import {useBodyBackground} from "../../../Hooks/useBodyBackground.ts";
import {BACKGROUND_BOTTOM} from "../../../constants.ts";
import {HOME_PAGE} from "../../Header/constants.ts";

export default function Mobile() {
    useBodyBackground({
        backgroundImage: '',
        backgroundPosition: BACKGROUND_BOTTOM,
        backgroundSize: "cover",
    });

    const handleClick = (url: string) => {
        window.open(url);
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100vh',
                minHeight: '100vh',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '40px'
            }}
            >
                <Box sx={{
                    width: 'fit-content',
                    display: 'flex',
                    mx: 'auto',
                    gap: '10px'
                }}
                >
                    <img
                        src="/Parceler.svg"
                        alt="Home Icon"
                        style={{width: "40px", height: "40px"}}
                    />
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", serif',
                            fontSize: "18px",
                            color: "white",
                            pt: "12px",
                        }}
                    >
                    <span style={{
                        fontFamily: '"Montserrat", serif',
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "3.5px",
                        color: "white",
                    }}> {HOME_PAGE} </span>
                        is only optimized for wider desktop screens.
                    </Typography>
                </Box>
                <Button
                    disableRipple
                    onClick={() =>
                        handleClick("https://youtu.be/Pya3-ZYBBm0?si=I-jxZT321bn0bxOL")
                    }
                    variant="contained"
                    sx={{
                        width: '200px',
                        marginTop: "10px",
                        borderRadius: "30px",
                        backgroundColor: "white",
                        color: "#071528",
                        fontFamily: '"Montserrat", serif',
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "medium",
                        height: "50px",
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#CCCCCC",
                        },
                    }}
                >
                    Watch Demo
                </Button>
            </Box>
        </>
    );
};