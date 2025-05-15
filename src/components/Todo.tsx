import { Box, Typography, Container, Link, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TodoProvider } from '../provider/TodoProvider';

function Todo() {
    return (
        <Box
            sx={{
                width: '100%',
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    py: { xs: 2, md: 4 },
                    boxSizing: 'border-box',
                    position: 'relative',
                    minHeight: '100vh',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TodoProvider>
                        <Container maxWidth="md">
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 1, sm: 2 },
                                    boxSizing: 'border-box',
                                    my: 4,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    bgcolor: 'white',
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    align="center"
                                    color="primary.dark"
                                    sx={{
                                        mb: 5,
                                        position: 'relative',
                                        display: 'inline-block',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: -12,
                                            left: '10%',
                                            width: '80%',
                                            height: 4,
                                            bgcolor: 'secondary.main',
                                            borderRadius: 8
                                        }
                                    }}
                                >
                                    My Tasks
                                </Typography>

                                <TodoInput />
                                <TodoFilter />
                                <TodoList />
                            </Paper>
                        </Container>
                    </TodoProvider>
                </LocalizationProvider>

                <Link
                    href="https://github.com/TimAnthonyAlexander/todo-react"
                    target="_blank"
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        color: 'primary.dark',
                        textDecoration: 'none',
                        transition: 'transform 0.3s ease, color 0.3s ease',
                        padding: 1.5,
                        borderRadius: 8,
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            color: 'secondary.main',
                            transform: 'translateY(-3px)',
                        }
                    }}
                >
                    <GitHubIcon />
                    <Typography variant="body2" fontWeight="600">
                        View on GitHub
                    </Typography>
                </Link>
            </Container>
        </Box>
    );
}

export default Todo; 
