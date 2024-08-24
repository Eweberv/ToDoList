import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://54.73.88.243/api/Auth/register', {
                firstName,
                lastName,
                email,
                password
            });
            console.log('Registration successful:', response.data);

            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Box width={"500px"}>
                <h2>Register</h2>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ marginBottom: 10 }}
                />
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
            </Box>
        </Box>
    );
};

export default Register;
