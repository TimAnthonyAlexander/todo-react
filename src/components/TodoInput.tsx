import { useState } from 'react';
import {
    TextField,
    Button,
    Stack,
    Box,
    Paper,
    InputAdornment,
    useTheme
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EventIcon from '@mui/icons-material/Event';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTodoContext } from '../hooks/useTodoContext';
import { motion } from 'framer-motion';

function TodoInput() {
    const { addTodo } = useTodoContext();
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const theme = useTheme();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (text.trim()) {
            addTodo(text.trim(), dueDate || undefined);
            setText('');
            setDueDate(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    mb: 4,
                    borderRadius: 3,
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                    }
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Add a new task"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    transition: 'all 0.2s ease',
                                    fontSize: '1rem',
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'primary.main',
                                        borderWidth: 2,
                                    }
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddTaskIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <DatePicker
                            label="Due date"
                            value={dueDate}
                            onChange={(newDate: Date | null) => setDueDate(newDate)}
                            slotProps={{
                                textField: {
                                    size: 'small',
                                    sx: {
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            transition: 'all 0.2s ease',
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'primary.main',
                                                borderWidth: 2,
                                            }
                                        }
                                    },
                                    InputProps: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon color="secondary" />
                                            </InputAdornment>
                                        ),
                                    }
                                }
                            }}
                        />

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!text.trim()}
                                sx={{
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1,
                                    fontWeight: 600,
                                    boxSizing: 'border-box',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    }
                                }}
                            >
                                Add
                            </Button>
                        </motion.div>
                    </Stack>
                </Box>
            </Paper>
        </motion.div>
    );
}

export default TodoInput; 
