"use client";

import { BlockEditor } from "@/components/BlockEditor";
import { useBlockEditor } from "@/hooks/useBlockEditor";

export default function ViewDietContent({
  initialContent,
}: {
  initialContent: string;
}) {
  const { editor } = useBlockEditor({
    content: JSON.parse(initialContent),
    editable: false,
  });

  return (
    <div>
      <div className={`relative non-editable`}>
        {editor && (
          <BlockEditor content={JSON.parse(initialContent)} editor={editor} />
        )}

        <style jsx global>{`
          .non-editable .ProseMirror-menubar,
          .non-editable .ProseMirror-gapcursor,
          .non-editable .tiptap .tiptap-menu-bar {
            display: none !important;
          }
          .non-editable .ProseMirror {
            pointer-events: none;
          }
          .ProseMirror {
            z-index: 0;
            margin-left: auto;
            margin-right: auto;
            max-width: 42rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            caret-color: #000;
            outline-width: 0px;
          }
        `}</style>
      </div>
    </div>
  );
}
