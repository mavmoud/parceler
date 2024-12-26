import {Typography, Box} from '@mui/material';
import {useBodyBackground} from "../../../Hooks/useBodyBackground.ts";
import {BACKGROUND_BOTTOM} from "../../../constants.ts";
import {HOME_PAGE} from "../../Header/constants.ts";

export default function Mobile() {
    useBodyBackground({
        backgroundImage: '',
        backgroundPosition: BACKGROUND_BOTTOM,
        backgroundSize: "cover",
    });

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
                gap: '25px'
            }}
            >
                <Box sx={{
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    // mx: 'auto',
                    gap: '10px'
                }}
                >
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            // justifyContent: "center",
                            gap: "14px",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/Parceler.svg"
                            alt="Home Icon"
                            style={{ width: "40px", height: "40px" }}
                        />
                        <Typography
                            sx={{
                                fontFamily: '"Montserrat", serif',
                                fontSize: "18px",
                                fontWeight: "bold",
                                letterSpacing: "3.5px",
                                pt: "8px",
                                color: 'white'
                            }}
                        >
                            {HOME_PAGE}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", serif',
                            fontSize: "18px",
                            color: "white",
                            pt: "10px",
                        }}
                    >
                        Is only optimized for wider desktop screens.
                    </Typography>
                </Box>
            </Box>
        </>
    );
};