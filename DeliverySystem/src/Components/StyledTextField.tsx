import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)(() => ({

    '& .MuiFormLabel-root': {
        paddingLeft: '25px',
    },
    '& .MuiInputBase-input': {
        paddingLeft: '25px',
    },
    '& .MuiInputLabel-root': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: "#848D9D",
        transition: 'opacity 0.2s',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: "#848D9D",
        opacity: 0,
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '30px',
        '& fieldset': {
            borderColor: '#D4D7DD',
            top: 0,
            legend: {
                display: 'none',
            },
        },
        '&.Mui-focused fieldset': {
            borderColor: "#071528",
        },
    },
    '& .MuiInputLabel-shrink': {
        color: "#848D9D",
        opacity: 0,
    },
}))