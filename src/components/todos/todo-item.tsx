"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { toggleTodo, deleteTodo } from "@/app/actions/todo-actions";
import { UpdateTodoDialog } from "@/components/todos/update-todo-dialog";

interface Todo {
    id: string;
    title: string | null;
    isCompleted: boolean;
    createdAt: Date;
}

interface TodoItemProps {
    todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function handleToggle(checked: boolean) {
        const result = await toggleTodo(todo.id, checked);

        if (!result.success) {
            toast.error(result.message || "Impossible de mettre à jour le todo");
        }
    }

    async function handleDelete() {
        setIsDeleting(true);

        const result = await deleteTodo(todo.id);

        if (result.success) {
            toast.success(result.message || "Todo supprimé avec succès");
        } else {
            toast.error(result.message || "Erreur lors de la suppression du todo");
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Card className="mb-3">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Checkbox 
                            checked={todo.isCompleted} 
                            onCheckedChange={handleToggle}
                            id={`todo-${todo.id}`}
                        />
                        <label 
                            htmlFor={`todo-${todo.id}`} 
                            className={`cursor-pointer ${
                                todo.isCompleted ? "line-through text-muted-foreground" : ""
                            }`}
                        >
                            {todo.title || "Sans titre"}
                        </label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={handleDelete} 
                            disabled={isDeleting}
                            className="text-red-500 hover:text-red-600"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
            <UpdateTodoDialog 
                todo={todo} 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
            />
        </>
    );
}
