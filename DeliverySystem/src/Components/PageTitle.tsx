import React from 'react';
import { Typography, Box } from '@mui/material';

interface PageTitleProps {
    title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return (
        <Box sx={{
            width: 'fit-content',
            display: 'flex',
            justifyContent: 'center',
            mx: 'auto'

        }}>
            <Typography
                sx={{
                    fontSize: '36px',
                    fontWeight: '600',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: '"Montserrat", sans-serif',
                    mb: '50px'
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};