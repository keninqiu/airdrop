"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect } from "react";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            TextStyle,
            Color,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-3",
            },
        },
    });

    // Update editor content when value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-md">
            <div className="border-b border-gray-300 bg-gray-50 p-2 flex flex-wrap gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("bold") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("italic") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("strike") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    <s>S</s>
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    H3
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    1. List
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                    type="button"
                    onClick={() => {
                        const url = window.prompt("Enter URL:");
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                    className={`px-3 py-1 rounded text-sm ${editor.isActive("link") ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200"
                        }`}
                >
                    Link
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
