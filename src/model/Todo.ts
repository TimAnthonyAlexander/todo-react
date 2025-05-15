export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dueDate?: Date;
}

export type TodoFilter = 'all' | 'active' | 'completed'; 