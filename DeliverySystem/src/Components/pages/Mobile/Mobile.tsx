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

    const handleClick = (url: string) => {
        window.open(url);
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100dvh',
                width: '100vw',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '25px',
            }}
                 onClick={() =>
                     handleClick("https://youtu.be/Pya3-ZYBBm0?si=TztrA170-hq2uz6v")
                 }
            >
                <Box sx={{
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    mx: 'auto',
                    gap: '10px'
                }}
                >
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src="/Parceler.svg"
                            alt="Home Icon"
                            style={{ width: "30px", height: "30px" }}
                        />
                        <Typography
                            sx={{
                                fontFamily: '"Montserrat", serif',
                                fontSize: "14px",
                                fontWeight: "bold",
                                letterSpacing: "3.5px",
                                pt: "6px",
                                color: 'white'
                            }}
                        >
                            {HOME_PAGE}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontFamily: '"Montserrat", serif',
                            fontSize: "14px",
                            color: "white",
                            pt: "8px",
                        }}
                    >
                        Is only optimized for wider desktop screens.
                    </Typography>
                </Box>
            </Box>
        </>
    );
};
