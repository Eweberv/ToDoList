// import Navbar from "../Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import {ThemeProvider} from "@mui/material/styles";
import lightTheme from "../../theme.tsx";
import { CssBaseline } from '@mui/material';
import Navbar from "../Navbar.tsx";
import darkTheme from "../../theme.tsx";

const Layout = () => {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div style={{minHeight: "100vh"}}>
                    <Navbar />
                    <Outlet />
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Layout;