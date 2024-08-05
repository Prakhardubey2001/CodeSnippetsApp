import {db} from '@/db'
import {redirect,notFound} from 'next/navigation';
export default  function SnippetCreatePage(){
    async function createSnippet(formData:FormData){
        // this is a server action  check the user input and validate it then create a new recotrd in datbase
        'use server'; // seeing this next consider it as a server action
        const title = formData.get('title') as string;
        const code= formData.get('code') as string;

        const snippet= await db.snippet.create({
            data:{
            title,
            code,
            },
            
        });

        console.log(snippet);
        // After create redirect to the home page
        redirect('/');
        // notFound();
    }
    return (
        <form action={createSnippet} >
            <h3 className="font-bold m-3">Create a Code Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                <label className="w-12" htmlFor="title">
                    Title
                </label>
                <input name="title" className="border rounded p-2 w-full " 
                id="title"/>
                </div>
                
            
            <div className="flex gap-4">
                <label className="w-12" htmlFor="code">
                    Code
                </label>
                <textarea name="code"  className="border rounded p-2 w-full " 
                id="code"/>
            </div>
            <button type="submit" className="rounded p-2 bg-blue-200">
                Create 
            </button>
            </div>
        </form>
    )

};