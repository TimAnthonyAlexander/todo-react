import { useEffect, useState, type ReactNode } from "react";
import type { Todo, TodoFilter } from "../model/Todo";
import { TodoContext } from "../model/TodoContext";

interface TodoProviderProps {
    children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            try {
                const parsedTodos = JSON.parse(savedTodos);
                return parsedTodos.map((todo: any) => ({
                    ...todo,
                    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
                }));
            } catch (error) {
                console.error('Failed to parse todos from localStorage', error);
                return [];
            }
        }
        return [];
    });

    const [filter, setFilter] = useState<TodoFilter>('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string, dueDate?: Date) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now(),
            dueDate
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id: string, text: string, dueDate?: Date) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text, dueDate } : todo
            )
        );
    };

    const reorderTodos = (startIndex: number, endIndex: number) => {
        const result = Array.from(todos);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setTodos(result);
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                filter,
                addTodo,
                toggleTodo,
                deleteTodo,
                editTodo,
                setFilter,
                reorderTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

