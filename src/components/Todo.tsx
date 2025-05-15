import { Box, Typography, Container } from '@mui/material';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TodoProvider } from '../provider/TodoProvider';

function Todo() {
    return (
        <Container
            maxWidth="lg"
            sx={{ py: 4 }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TodoProvider>
                    <Container maxWidth="md">
                        <Box
                            sx={{
                                p: { xs: 2, sm: 4 },
                                boxSizing: 'border-box',
                                my: 4,
                            }}
                        >
                            <Typography
                                variant="h4"
                                component="h1"
                                gutterBottom
                                align="center"
                                fontWeight="500"
                                color="primary.dark"
                                sx={{
                                    mb: 4,
                                    position: 'relative',
                                    display: 'inline-block',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -8,
                                        left: '10%',
                                        width: '80%',
                                        height: 3,
                                        bgcolor: 'secondary.main',
                                        borderRadius: 1
                                    }
                                }}
                            >
                                My Tasks
                            </Typography>

                            <TodoInput />
                            <TodoFilter />
                            <TodoList />
                        </Box>
                    </Container>
                </TodoProvider>
            </LocalizationProvider>
        </Container>
    );
}

export default Todo; 
