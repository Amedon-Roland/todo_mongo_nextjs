"use client";

import { useState } from "react";
import { toast } from "sonner"; // Import toast from sonner
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { updateTodo } from "@/app/actions/todo-actions";

interface Todo {
    id: string;
    title: string | null;
    isCompleted: boolean;
    createdAt: Date;
}

interface UpdateTodoDialogProps {
    todo: Todo;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpdateTodoDialog({ todo, open, onOpenChange }: UpdateTodoDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        
        // Simple client-side validation
        if (!title || title.trim() === '') {
            setError('Le titre est requis');
            setIsLoading(false);
            return;
        }
        
        const result = await updateTodo(todo.id, formData);
        
        setIsLoading(false);
        
        if (result.success) {
            toast.success(result.message || "Tâche mise à jour avec succès");
            onOpenChange(false);
        } else {
            setError(result.message || 'Une erreur s\'est produite');
            toast.error(result.message || "Erreur lors de la mise à jour de la tâche");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifier la tâche</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Input
                                name="title"
                                defaultValue={todo.title || ""}
                                placeholder="Titre de la tâche"
                                disabled={isLoading}
                                required
                            />
                            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Annuler
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Mise à jour..." : "Enregistrer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
