import { List, Typography, Box } from '@mui/material';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import SortableTodo from './SortableTodo';
import { useTodoContext } from '../hooks/useTodoContext';

function TodoList() {
    const {
        todos,
        filter,
        toggleTodo,
        deleteTodo,
        editTodo,
        reorderTodos,
    } = useTodoContext();

    const filteredTodos = todos.filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over || active.id === over.id) return;

        const from = filteredTodos.findIndex((t) => t.id === active.id);
        const to = filteredTodos.findIndex((t) => t.id === over.id);

        if (from !== -1 && to !== -1) reorderTodos(from, to);
    };

    if (filteredTodos.length === 0) {
        return (
            <Box
                sx={{
                    my: 5,
                    p: 3,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderLeft: '3px dashed',
                    borderColor: 'primary.light',
                    transition: 'all 0.3s ease',
                }}
            >
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ fontStyle: 'italic', fontSize: '1.05rem', opacity: 0.9 }}
                >
                    {filter === 'all'
                        ? 'No tasks yet. Add one above!'
                        : filter === 'active'
                            ? 'No active tasks!'
                            : 'No completed tasks yet.'}
                </Typography>
            </Box>
        );
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={filteredTodos.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <List sx={{ width: '100%', mt: 2, p: 0 }}>
                    {filteredTodos.map((todo) => (
                        <SortableTodo
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                        />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default TodoList;
