import {createTheme} from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        text: {
            primary: '#ffffff', //texts in mui components
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#060720',
                    color: '#ffffff', //texts outside mui components
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    backgroundColor: '#3273fa',
                    '&:hover': {
                        backgroundColor: '#3273da',
                    },
                },
            },
        },
    },
});

export default darkTheme;