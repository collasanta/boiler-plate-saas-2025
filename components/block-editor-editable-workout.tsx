"use client";

import React, { useState, useEffect, useRef } from "react";
import { BlockEditor } from "@/components/BlockEditor";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { updateWorkoutContent } from "@/lib/workouts";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EditableWorkoutContent({
  initialContent,
  workoutId,
}: {
  initialContent: string;
  workoutId: string;
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editableContent, setEditableContent] = useState(initialContent);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const originalContent = useRef(initialContent);
  const router = useRouter();

  const { editor } = useBlockEditor({
    content: JSON.parse(editableContent),
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(JSON.parse(editableContent));
    }
  }, [editor, editableContent]);

  const handleSave = async () => {
    if (!editor) {
      toast.error("Editor não inicializado");
      return;
    }

    setIsSaving(true);
    const newContent = editor.getJSON();

    try {
      const result = await updateWorkoutContent(
        workoutId,
        JSON.stringify(newContent)
      );

      if (result.error) {
        throw new Error(result.error);
      }

      setEditableContent(JSON.stringify(newContent));
      originalContent.current = JSON.stringify(newContent);
      toast.success("Alterações salvas com sucesso");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      toast.error("Falha ao salvar alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const hasUnsavedChanges = () => {
    return JSON.stringify(editor?.getJSON()) !== originalContent.current;
  };

  const handleCancelClick = () => {
    if (hasUnsavedChanges()) {
      setIsConfirmDialogOpen(true);
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditableContent(originalContent.current);
    if (editor) {
      editor.commands.setContent(JSON.parse(originalContent.current));
    }
    setIsEditing(false);
    router.refresh();
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} disabled={isSaving} className="mr-2">
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
            <Button onClick={handleCancelClick} variant="outline">
              Cancelar
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
      <div className={isEditing ? "" : "pointer-events-none opacity-70"}>
        {editor && (
          <BlockEditor content={JSON.parse(editableContent)} editor={editor} />
        )}
      </div>

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja cancelar?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você tem alterações não salvas. Se cancelar agora, essas
              alterações serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar Editando</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              Descartar Alterações
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
