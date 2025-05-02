"use client";

import { useState } from "react";
import { toast } from "sonner"; // Import toast from sonner
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodo } from "@/app/actions/todo-actions";

export function AddTodoForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        
        // Validation côté client simple
        if (!title || title.trim() === '') {
            setError('Le titre est requis');
            setIsLoading(false);
            return;
        }
        
        const result = await createTodo(formData);
        
        setIsLoading(false);
        
        if (result.success) {
            toast.success(result.message || "Tâche ajoutée avec succès");
            
            // Réinitialiser le formulaire
            (e.target as HTMLFormElement).reset();
        } else {
            setError(result.message || 'Une erreur s\'est produite');
            toast.error(result.message || "Erreur lors de l'ajout de la tâche");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <Input
                    name="title"
                    placeholder="Ajouter une nouvelle tâche..."
                    disabled={isLoading}
                    required
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Ajout en cours..." : "Ajouter une tâche"}
            </Button>
        </form>
    );
}
