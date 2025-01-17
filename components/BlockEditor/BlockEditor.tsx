"use client";

import { Editor, EditorContent } from "@tiptap/react";
import React, { useRef } from "react";
import { LinkMenu } from "@/components/menus";
import { useBlockEditor } from "@/hooks/useBlockEditor";
import "@/styles/index.css";
import ImageBlockMenu from "@/tiptap/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/tiptap/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/tiptap/extensions/Table/menus";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { Spinner } from "../ui/Spinner";

export const BlockEditor = ({ content, editor: initialEditor }: { content?: JSON; editor?: Editor | null }) => {
  const menuContainerRef = useRef(null);
  const blockEditor = useBlockEditor({ content });

  const editor = initialEditor || blockEditor.editor;

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden rounded-md border min-h-[600px]">
        {editor ? (
          <>
            <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
            <ContentItemMenu editor={editor} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </>
        ) : (
          <div className="flex justify-center h-full align-middle">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockEditor;
