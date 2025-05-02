import { prisma } from "@/utils/prisma";
import { AddTodoForm } from "@/components/todos/add-todo-form";
import { TodoList } from "@/components/todos/todo-list";

export const dynamic = "force-dynamic"; // S'assure que la page est dynamique

export default async function HomePage() {
  // Récupérer tous les todos depuis la base de données
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container max-w-2xl mx-auto p-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestionnaire de Tâches</h1>
      
      <div className="grid gap-8">
        <section className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-semibold mb-4">Nouvelle tâche</h2>
          <AddTodoForm />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Mes tâches ({todos.length})</h2>
          <TodoList todos={todos} />
        </section>
      </div>
    </main>
  );
}
