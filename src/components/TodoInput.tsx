import { useState } from 'react';
import {
    TextField,
    Button,
    Stack,
    Box,
    Paper,
    InputAdornment,
    Tooltip
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EventIcon from '@mui/icons-material/Event';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTodoContext } from '../hooks/useTodoContext';

function TodoInput() {
    const { addTodo } = useTodoContext();
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (text.trim()) {
            addTodo(text.trim(), dueDate || undefined);
            setText('');
            setDueDate(null);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 3 },
                mb: 4,
                borderRadius: 2,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'primary.light',
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

                    <Tooltip title="Add task">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!text.trim()}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    bgcolor: 'primary.dark',
                                },
                                '&:active': {
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            Add
                        </Button>
                    </Tooltip>
                </Stack>
            </Box>
        </Paper>
    );
}

export default TodoInput; 
