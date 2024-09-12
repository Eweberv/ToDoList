import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const Login = () => {
    console.log(import.meta.env.VITE_TODOLIST_API_ENDPOINT);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSuccess = async (response : any) => {
        const token = response.credential;
        try {
            const res = await fetch(`${import.meta.env.VITE_TODOLIST_API_ENDPOINT}/api/Auth/signin-google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            if (res.ok) {
                const data = await res.json();
                const jwtToken = data.token;

                localStorage.setItem('token', jwtToken);
                console.log('User authenticated with Google:', data);
                navigate('/');
            } else {
                console.error('Authentication failed:', res.statusText);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_TODOLIST_API_ENDPOINT}/api/Auth/login`, {
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
            <GoogleOAuthProvider clientId="956921216246-vjhbcbfbrg8bgpavk8rgs4rnsuelpkv3.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log('Login Failed')}
                />
            </GoogleOAuthProvider>
        </Box>
    );
};

export default Login;
