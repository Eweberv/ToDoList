import {Box, Button } from '@mui/material';
import {SelectChangeEvent} from "@mui/material/Select";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route);
    }

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
    <div style={{ marginLeft: '20px' }}>logo-placeholder</div>
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={3.5} sx={{ marginRight: '50px'}}>
    <Button variant="contained" onClick={() => handleClick('/register')}>Register</Button>
    <Button variant="contained" onClick={() => handleClick('/login')}>Login</Button>
    </Box>
    </div>
);
};

export default Navbar;