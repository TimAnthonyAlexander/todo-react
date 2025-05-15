import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import TodoItem from './TodoItem';
import type { Todo } from '../model/Todo';

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string, dueDate?: Date) => void;
}

function SortableTodo({ todo, onToggle, onDelete, onEdit }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        marginBottom: 8,
        zIndex: isDragging ? 5 : 'auto',
    } as React.CSSProperties;

    return (
        <div ref={setNodeRef} style={style} {...attributes}>
            <TodoItem
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                isDragging={isDragging}
                dragHandleProps={listeners}
            />
        </div>
    );
}

export default SortableTodo;
