import { useState, useRef } from 'react';
import {
    ListItem,
    Checkbox,
    Typography,
    IconButton,
    TextField,
    Stack,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import WarningIcon from '@mui/icons-material/Warning';
import type { Todo } from '../model/Todo';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string, dueDate?: Date) => void;
    isDragging?: boolean;
    dragHandleProps?: any;
}

function TodoItem(props: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.todo.text);
    const [editDueDate, setEditDueDate] = useState<Date | null>(
        props.todo.dueDate || null
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const handleSave = () => {
        if (editText.trim()) {
            props.onEdit(props.todo.id, editText.trim(), editDueDate || undefined);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
            setEditText(props.todo.text);
            setEditDueDate(props.todo.dueDate || null);
        }
    };

    const isOverdue =
        props.todo.dueDate &&
        !props.todo.completed &&
        new Date() > new Date(props.todo.dueDate);

    return (
        <Paper
            elevation={0}
            sx={{
                opacity: props.todo.completed ? 0.85 : 1,
                backgroundColor: props.todo.completed ? 'background.paper' : 'white',
                transition: 'all 0.25s ease',
                width: '100%',
                overflow: 'hidden',
                borderLeft: '4px solid',
                borderColor: isOverdue
                    ? 'error.main'
                    : props.todo.completed
                        ? 'success.main'
                        : 'primary.main',
                transform: props.isDragging ? 'scale(1.02)' : 'none',
                position: 'relative',
                zIndex: props.isDragging ? 1 : 'auto',
            }}
        >
            <ListItem sx={{ py: 1.5 }}>
                <IconButton
                    size="small"
                    {...props.dragHandleProps}
                    disableRipple
                    sx={{
                        cursor: 'grab',
                        mr: 1,
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                        '&:active': { cursor: 'grabbing' },
                    }}
                >
                    <DragIndicatorIcon />
                </IconButton>

                {/* checkbox */}
                <Checkbox
                    checked={props.todo.completed}
                    onChange={() => props.onToggle(props.todo.id)}
                    sx={{
                        mr: 1,
                        color: 'primary.main',
                        '&.Mui-checked': { color: 'success.main' },
                        transition: 'all 0.2s ease',
                    }}
                    disabled={isEditing}
                />

                {isEditing ? (
                    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            inputRef={inputRef}
                            size="small"
                            autoFocus
                        />
                        <DatePicker
                            value={editDueDate}
                            onChange={(d: Date | null) => setEditDueDate(d)}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        <IconButton
                            onClick={handleSave}
                            color="primary"
                            sx={{
                                bgcolor: 'primary.light',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.main' },
                            }}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Stack>
                ) : (
                    <>
                        <Stack sx={{ flexGrow: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                    sx={{
                                        textDecoration: props.todo.completed
                                            ? 'line-through'
                                            : 'none',
                                        color: props.todo.completed
                                            ? 'text.disabled'
                                            : 'text.primary',
                                        transition: 'all 0.2s ease',
                                        wordBreak: 'break-word',
                                        fontWeight: isOverdue && !props.todo.completed ? 500 : 400,
                                    }}
                                >
                                    {props.todo.text}
                                </Typography>
                                {isOverdue && (
                                    <WarningIcon color="error" fontSize="small" />
                                )}
                            </Stack>

                            {props.todo.dueDate && (
                                <Typography
                                    variant="caption"
                                    color={isOverdue ? 'error' : 'text.secondary'}
                                    sx={{ fontWeight: isOverdue ? 500 : 400 }}
                                >
                                    Due: {new Date(props.todo.dueDate).toLocaleDateString()}
                                </Typography>
                            )}
                        </Stack>

                        <Stack direction="row">
                            <IconButton
                                onClick={handleEdit}
                                sx={{
                                    color: 'secondary.main',
                                    transition: 'all 0.2s',
                                    '&:hover': { color: 'secondary.dark' },
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                onClick={() => props.onDelete(props.todo.id)}
                                sx={{
                                    color: 'error.main',
                                    transition: 'all 0.2s',
                                    '&:hover': { color: 'error.dark' },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </>
                )}
            </ListItem>
        </Paper>
    );
}

export default TodoItem;
