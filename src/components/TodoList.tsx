import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Box, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface Todo {
    id: number;
    title: string;
    isCompleted: boolean;
}

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState<string>('');
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No user connected');
            return;
        }

        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5220/api/TodoList/myToDos', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        Accept: "application/json"
                    }
                });
                setTodos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching todos:', error);
                setTodos([]);
            }
        };

        fetchTodos();
    }, [navigate]);

    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return;

        const token = localStorage.getItem('token');

        const todo = {
            title: newTodo,
        };

        try {
            const response = await axios.post('http://localhost:5220/api/TodoList', todo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleToggleComplete = async (id: number) => {
        const token = localStorage.getItem('token');
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;

        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

        try {
            await axios.put(`http://localhost:5220/api/TodoList/${id}`, updatedTodo, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTodos(todos.map(todo =>
                todo.id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5220/api/TodoList/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditTodo = (id: number, title: string) => {
        setEditingTodoId(id);
        setEditingTitle(title);
    };

    const handleSaveEdit = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:5220/api/TodoList/${id}`, { title: editingTitle }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, title: editingTitle } : todo
            ));
            setEditingTodoId(null);
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <h2>ToDo List</h2>

            {isAuthenticated ?
                <Box>
                    <TextField
                        label="New Task"
                        variant="outlined"
                        fullWidth
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddTodo}
                        style={{ marginTop: 10, marginBottom: 20 }}
                        fullWidth
                    >
                        Add Task
                    </Button>
                </Box>
                :
                <Typography variant="h4" sx={{margin: "10px"}}>
                    Login to create a ToDo List
                </Typography>
            }
            <List style={{ width: '100%' }}>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                        secondaryAction={
                            <>
                                {editingTodoId === todo.id ? (
                                    <IconButton aria-label="save" onClick={() => handleSaveEdit(todo.id)}>
                                        <SaveIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton aria-label="edit" onClick={() => handleEditTodo(todo.id, todo.title)}>
                                        <EditIcon />
                                    </IconButton>
                                )}
                                <IconButton aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <Checkbox
                            checked={todo.isCompleted}
                            onChange={() => handleToggleComplete(todo.id)}
                        />
                        {editingTodoId === todo.id ? (
                            <TextField
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <ListItemText
                                primary={todo.title}
                                style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
                            />
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;
