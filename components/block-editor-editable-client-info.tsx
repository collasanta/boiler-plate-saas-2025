import React, { useState, useEffect, useRef } from "react";
import { BlockEditor } from "@/components/BlockEditor";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { updateClientInfo } from "@/lib/client";
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
import { PencilIcon, PlusIcon, CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EditableClientInfo({ initialInfo, clientId }: { initialInfo: string; clientId: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editableInfo, setEditableInfo] = useState(initialInfo);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const originalInfo = useRef(initialInfo);

  const { editor } = useBlockEditor({
    content: JSON.parse(editableInfo || "{}"),
    editable: isEditing,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(JSON.parse(editableInfo || "{}"));
      editor.setEditable(isEditing);
    }
  }, [editor, editableInfo, isEditing]);

  const handleSave = async () => {
    if (!editor) {
      toast.error("Editor não inicializado");
      return;
    }

    setIsSaving(true);
    const newInfo = editor.getJSON();

    try {
      const result = await updateClientInfo(clientId, JSON.stringify(newInfo));

      if (result.error) {
        throw new Error(result.error);
      }

      setEditableInfo(JSON.stringify(newInfo));
      originalInfo.current = JSON.stringify(newInfo);
      toast.success("Informações do cliente atualizadas com sucesso");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar informações do cliente:", error);
      toast.error("Falha ao atualizar informações do cliente");
    } finally {
      setIsSaving(false);
    }
  };

  const hasUnsavedChanges = () => {
    return JSON.stringify(editor?.getJSON()) !== originalInfo.current;
  };

  const handleCancelClick = () => {
    if (hasUnsavedChanges()) {
      setIsConfirmDialogOpen(true);
    } else {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditableInfo(originalInfo.current);
    if (editor) {
      editor.commands.setContent(JSON.parse(originalInfo.current || "{}"));
    }
    setIsEditing(false);
  };

  const hasContent = editableInfo && editableInfo !== "{}" && editableInfo !== "null";

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            {hasContent ? (
              <>
                <PencilIcon className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Context
              </>
            )}
          </Button>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
              <CheckIcon className="w-4 h-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancelClick}>
              <XIcon className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </>
        )}
      </div>
      <div
        className={cn("transition-all duration-300 ease-in-out overflow-hidden", isEditing ? "max-h-[1000px]" : "max-h-[100px]")}
      >
        <div className={cn("relative", !isEditing && "overflow-y-auto", !isEditing && !hasContent && "hidden")}>
          {editor && <BlockEditor content={JSON.parse(editableInfo || "{}")} editor={editor} />}
          {!isEditing && hasContent && <div className="absolute inset-0 bg-gray-100 bg-opacity-10 pointer-events-none" />}
        </div>
        {!hasContent && !isEditing && <div className="text-gray-400 italic p-4">Nenhuma informação adicional</div>}
      </div>
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja cancelar?</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem alterações não salvas. Se cancelar agora, essas alterações serão perdidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar Editando</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700 focus:ring-red-500">
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
