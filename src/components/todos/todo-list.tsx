import { TodoItem } from "./todo-item";

interface Todo {
  id: string;
  title: string | null;
  isCompleted: boolean;
  createdAt: Date;
}

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center p-6 text-muted-foreground border rounded-lg">
        Aucune tâche pour le moment. Ajoutez-en une !
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}