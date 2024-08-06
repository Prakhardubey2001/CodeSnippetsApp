'use client';

import { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { editSnippet } from "@/actions";


interface SnippetEditFormProps{
    snippet:Snippet
}

export default function SnippetEditForm({snippet}:SnippetEditFormProps){
    const [code,setCode]=useState(snippet.code);
    const handlEditorChange= (value:string="")=>{
        setCode(value);
    }
    const editSnippetAction= editSnippet.bind(null,snippet.id,code);

    
return(
    <div>
        <h1 className="text-center text-xl">Edit Snippet</h1>
<div className="m-2 mt-15">
        <Editor height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{minimap:{enabled:false}}}
        onChange={handlEditorChange}
    />
    <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded m-2 bg-green-600 ">
            Save
        </button>
    </form>

    </div>
    </div>);

}