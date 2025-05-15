import { createContext } from 'react';
import type { Todo, TodoFilter } from './Todo';

interface TodoContextType {
    todos: Todo[];
    filter: TodoFilter;
    addTodo: (text: string, dueDate?: Date) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, text: string, dueDate?: Date) => void;
    setFilter: (filter: TodoFilter) => void;
    reorderTodos: (startIndex: number, endIndex: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

