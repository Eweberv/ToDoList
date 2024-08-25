import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://api.todolist.victorweber.fr/api/Auth/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            console.log('Login successful:', response.data);
            console.log('JWT:', response.data.token);


            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Box width={"500px"}>
                <h2>Login</h2>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: 20 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                >
                    Login
                </Button>
                <Box mt={2}>
                    <Link href="/reset-password" variant="body2">
                        Forgot Password ?
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
