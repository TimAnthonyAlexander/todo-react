import { ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import type { TodoFilter as FilterType } from '../model/Todo';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTodoContext } from '../hooks/useTodoContext';

function TodoFilter() {
    const { filter, setFilter } = useTodoContext();

    const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: FilterType | null) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 3,
                pb: 0.5,
                boxSizing: 'border-box',
                borderRadius: 2,
                bgcolor: 'background.default',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                aria-label="Filter todos"
                size="small"
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    boxSizing: 'border-box',
                    "& .MuiToggleButtonGroup-grouped": {
                        border: 0,
                        mx: 0.5,
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        "&.Mui-selected": {
                            bgcolor: 'primary.main',
                            color: 'white',
                            "&:hover": {
                                bgcolor: 'primary.dark',
                            }
                        },
                        "&:not(.Mui-selected)": {
                            "&:hover": {
                                bgcolor: 'primary.light',
                                color: 'white',
                            }
                        }
                    }
                }}
            >
                <ToggleButton
                    value="all"
                    aria-label="all todos"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        gap: 1
                    }}
                >
                    <FormatListBulletedIcon fontSize="small" />
                    All
                </ToggleButton>
                <ToggleButton
                    value="active"
                    aria-label="active todos"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        gap: 1
                    }}
                >
                    <RadioButtonUncheckedIcon fontSize="small" />
                    Active
                </ToggleButton>
                <ToggleButton
                    value="completed"
                    aria-label="completed todos"
                    sx={{
                        flex: 1,
                        display: 'flex',
                        gap: 1
                    }}
                >
                    <CheckCircleOutlineIcon fontSize="small" />
                    Completed
                </ToggleButton>
            </ToggleButtonGroup>
        </Paper>
    );
}

export default TodoFilter; 
