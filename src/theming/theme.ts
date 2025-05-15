import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        divider: '#666666',
        mode: 'light',
        primary: {
            light: '#AEBDF4',
            main: '#3277e5',
            dark: '#1e4bb3',
            contrastText: '#ffffff',
        },
        text: {
            primary: '#122211',
            secondary: '#00000a',
            disabled: '#bbbbbb',
        },
        secondary: {
            light: '#F9A3B0',
            main: '#EC5272',
            dark: '#AE0843',
        },
        background: {
            default: '#ffffff',
            paper: '#f7f7f7',
        },
        error: {
            main: '#ba000d',
            dark: '#7f0008',
            light: '#e3515c',
        },
        success: {
            main: '#4caf50',
            dark: '#065e12',
            light: '#e0ffe0',
        },
    },
    typography: {
        allVariants: {
            color: '#000000',
            fontFamily: 'San Francisco, Arial, sans-serif',
            fontWeight: 300,
        },
    },
});


