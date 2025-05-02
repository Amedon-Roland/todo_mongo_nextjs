'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/utils/prisma';

// Créer un nouveau todo
export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;
  
  try {
    // Validation simple
    if (!title || title.trim() === '') {
      return { success: false, message: 'Le titre est requis' };
    }
    
    // Créer le todo
    await prisma.todo.create({
      data: {
        title: title.trim(),
      },
    });
    
    // Revalider le chemin pour rafraîchir les données
    revalidatePath('/');
    return { success: true, message: 'Todo créé avec succès' };
  } catch (error) {
    console.error('Erreur de création:', error);
    return { success: false, message: 'Échec de création du todo' };
  }
}

// Marquer un todo comme complété ou non
export async function toggleTodo(id: string, isCompleted: boolean) {
  try {
    await prisma.todo.update({
      where: { id },
      data: { completed: isCompleted },
    });
    
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    return { success: false, message: "Impossible de mettre à jour le todo" };
  }
}

// Modifier un todo
export async function updateTodo(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  
  try {
    // Validation simple
    if (!title || title.trim() === '') {
      return { success: false, message: 'Le titre est requis' };
    }
    
    await prisma.todo.update({
      where: { id },
      data: { title: title.trim() },
    });
    
    revalidatePath('/');
    return { success: true, message: 'Todo mis à jour avec succès' };
  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    return { success: false, message: 'Échec de mise à jour du todo' };
  }
}

// Supprimer un todo
export async function deleteTodo(id: string) {
  try {
    await prisma.todo.delete({
      where: { id },
    });
    
    revalidatePath('/');
    return { success: true, message: 'Todo supprimé avec succès' };
  } catch (error) {
    console.error('Erreur de suppression:', error);
    return { success: false, message: 'Échec de suppression du todo' };
  }
}