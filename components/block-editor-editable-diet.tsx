"use client";

import React, { useState, useEffect, useRef } from "react";
import { BlockEditor } from "@/components/BlockEditor";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { updateDietContent } from "@/lib/diets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function EditableDietContent({
  initialContent,
  dietId,
}: {
  initialContent: string;
  dietId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const editingQuery = searchParams.get("editing") === "true";
  const [isEditing, setIsEditing] = useState(editingQuery);
  const [isSaving, setIsSaving] = useState(false);
  const [editableContent, setEditableContent] = useState(initialContent);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const originalContent = useRef(initialContent);

  const { editor } = useBlockEditor({
    content: JSON.parse(editableContent),
    editable: isEditing,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(JSON.parse(editableContent));
      editor.setEditable(isEditing);
    }
  }, [editor, editableContent, isEditing]);

  const handleSave = async () => {
    if (!editor) {
      toast.error("Editor não inicializado");
      return;
    }

    if (editingQuery) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("editing");
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }

    setIsSaving(true);
    const newContent = editor.getJSON();

    try {
      const result = await updateDietContent(
        dietId,
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
          <Button variant={"outline"} onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        )}
      </div>
      <div className={`relative ${!isEditing ? "non-editable" : ""}`}>
        {editor && (
          <BlockEditor content={JSON.parse(editableContent)} editor={editor} />
        )}
        {!isEditing && (
          <div
            className="absolute inset-0 bg-gray-200 bg-opacity-50"
            style={{ pointerEvents: "all" }}
          />
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

      <style jsx global>{`
        .non-editable .ProseMirror-menubar,
        .non-editable .ProseMirror-gapcursor,
        .non-editable .tiptap .tiptap-menu-bar {
          display: none !important;
        }
        .non-editable .ProseMirror {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
