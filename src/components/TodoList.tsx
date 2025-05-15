import { List, Typography, Box } from '@mui/material';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import type { DropResult, DroppableProvided, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useTodoContext } from '../hooks/useTodoContext';

function TodoList() {
    const { todos, filter, toggleTodo, deleteTodo, editTodo, reorderTodos } = useTodoContext();

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        if (result.destination.droppableId !== result.source.droppableId) return;

        const { source, destination } = result;

        if (source.index !== destination.index) {
            reorderTodos(source.index, destination.index);
        }
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
                    transition: 'all 0.3s ease'
                }}
            >
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{
                        fontStyle: 'italic',
                        fontSize: '1.05rem',
                        opacity: 0.9
                    }}
                >
                    {filter === 'all'
                        ? 'No tasks yet. Add one above!'
                        : filter === 'active'
                            ? 'No active tasks!'
                            : 'No completed tasks yet.'
                    }
                </Typography>
            </Box>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="todos"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
            >
                {(provided: DroppableProvided) => (
                    <List
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            width: '100%',
                            mt: 2,
                            p: 0
                        }}
                    >
                        {filteredTodos.map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            width: '100%',
                                        }}
                                    >
                                        <TodoItem
                                            todo={todo}
                                            onToggle={toggleTodo}
                                            onDelete={deleteTodo}
                                            onEdit={editTodo}
                                            isDragging={snapshot.isDragging}
                                            dragHandleProps={provided.dragHandleProps}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TodoList; 
