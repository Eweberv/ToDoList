import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null); // ID de la tâche en cours d'édition
    const [editingTitle, setEditingTitle] = useState(''); // Nouveau titre temporaire

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5220/api/TodoList', { headers: {Accept: "application/json"}});
                setTodos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching todos:', error);
                setTodos([]);
            }
        };

        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return;

        const todo = {
            title: newTodo,
            isCompleted: false,
        };

        try {
            const response = await axios.post('http://localhost:5220/api/TodoList', todo);
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleToggleComplete = async (id) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;

        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

        try {
            await axios.put(`http://localhost:5220/api/TodoList/${id}`, updatedTodo);
            setTodos(todos.map(todo =>
                todo.id === id ? updatedTodo : todo
            ));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5220/api/TodoList/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEditTodo = (id, title) => {
        setEditingTodoId(id);
        setEditingTitle(title);
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5220/api/TodoList/${id}`, { title: editingTitle });
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
