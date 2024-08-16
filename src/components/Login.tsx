import { useState } from 'react';
import { TextField, Button, Box, Link } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log({ email, password });
    };

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} style={{ }}>
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
                    onClick={handleRegister}
                    fullWidth
                >
                    Register
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
