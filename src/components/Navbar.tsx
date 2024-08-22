import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ToDoListLogo from '../assets/ToDoListLogo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    const handleClick = (route: string) => {
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            background: "#070720",
            height: '4rem',
            top: 0,
            width: '100%',
            zIndex: -1,
            borderBottom: "1px solid #0d0d28"
        }}>
            <img src={ToDoListLogo} alt={"ToDoList logo"} style={{ marginLeft: '10px', height: '6rem' }}></img>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={3.5} sx={{ marginRight: '50px' }}>
                {isAuthenticated ? (
                    <Button variant="contained" onClick={handleLogout}>Disconnect</Button>
                ) : (
                    <>
                        <Button variant="contained" onClick={() => handleClick('/register')}>Register</Button>
                        <Button variant="contained" onClick={() => handleClick('/login')}>Login</Button>
                    </>
                )}
            </Box>
        </div>
    );
};

export default Navbar;