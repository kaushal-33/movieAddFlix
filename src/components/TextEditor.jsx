import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

const TextEditor = ({ value, onChange }) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                underline: false,
                link: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                HTMLAttributes: {
                    class: 'text-blue-600 underline',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value || `
            <h2>Welcome to Movieaddflix</h2>
            <p>Enter your movie description here...</p>
        `,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // trigger parent's handleChange equivalent
            onChange({ target: { name: "description", value: html } });
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || `
                <h2>Welcome to Movieaddflix</h2>
            <p>Enter your movie description here...</p>` );
        }
    }, [value]);

    if (!editor) return null;

    const buttonStyle = (active) =>
        `px-3 py-1.5 text-sm font-medium rounded-md border transition-all duration-200 ${active
            ? "bg-orange-600 text-white border-gray-800"
            : "text-gray-500 border-orange-600 hover:bg-orange-600 hover:text-white"
        }`;

    // Prompt user for URL when inserting a link
    const setLink = () => {
        const url = window.prompt("Enter URL:");
        if (url) {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
        }
    };

    // Remove link formatting
    const unsetLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    return (
        <div className="border border-orange-500 p-4 mx-auto mt-8 pt- rounded-lg space-y-4">
            {/* Toolbar */}
            <div className="sticky top-4 z-10 p-3 rounded-lg shadow-md flex justify-center flex-wrap gap-2">
                {/* Text formatting */}
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonStyle(editor.isActive("bold"))}>Bold</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonStyle(editor.isActive("italic"))}>Italic</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonStyle(editor.isActive("underline"))}>Underline</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonStyle(editor.isActive("strike"))}>Strike</button>
                <button onClick={() => editor.chain().focus().toggleCode().run()} className={buttonStyle(editor.isActive("code"))}>Code</button>

                {/* Headings */}
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonStyle(editor.isActive("heading", { level: 1 }))}>H1</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonStyle(editor.isActive("heading", { level: 2 }))}>H2</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonStyle(editor.isActive("heading", { level: 3 }))}>H3</button>

                {/* Lists */}
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonStyle(editor.isActive("bulletList"))}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonStyle(editor.isActive("orderedList"))}>1. List</button>

                {/* Blockquote */}
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonStyle(editor.isActive("blockquote"))}>Quote</button>

                {/* Align */}
                <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={buttonStyle(editor.isActive({ textAlign: "left" }))}>Left</button>
                <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={buttonStyle(editor.isActive({ textAlign: "center" }))}>Center</button>
                <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={buttonStyle(editor.isActive({ textAlign: "right" }))}>Right</button>

                {/* Links */}
                <button onClick={setLink} className={buttonStyle(editor.isActive("link"))}>Link</button>
                <button onClick={unsetLink} className={buttonStyle(false)}>Unlink</button>

                {/* Undo/Redo */}
                <button onClick={() => editor.chain().focus().undo().run()} className={buttonStyle(false)}>Undo</button>
                <button onClick={() => editor.chain().focus().redo().run()} className={buttonStyle(false)}>Redo</button>
            </div>

            {/* Editor */}
            <div className="rounded-lg p-6 border border-orange-500 shadow-md min-h-[200px] prose max-w-none">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TextEditor;
