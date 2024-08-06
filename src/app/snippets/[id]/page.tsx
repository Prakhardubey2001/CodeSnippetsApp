import Link from 'next/link';
import {db} from '@/db';
import {notFound} from 'next/navigation'
import * as actions from'@/actions'
interface SnippetShowPageProps{
    params:{
        id:string,

    }
}
export default async function SnippetShowPage(props:SnippetShowPageProps)
{
    // await new Promise ((r)=>setTimeout(r,10000)).then(()=>{
    //     console.log("Promised awakening");
    // })
    const snippet= await db.snippet.findFirst({
        where:{id:parseInt(props.params.id)},
    });
    if(!snippet)
    {
        return notFound();
    }
    console.log(snippet);
    console.log(props);
    const deleteSnippetAction= actions.deleteSnippet.bind(null,snippet.id);
    return (<div>
        <div className='flex m-4 justify-between items-center'>
            <h1 className='text-xl font-bold'>{snippet.title}</h1>
            <div className='flex gap-4'>
                <Link href={`/snippets/${snippet.id}/edit`} className='p-2 px-4 border rounded bg-yellow-300'>Edit</Link>
                <form action={deleteSnippetAction}>
                <button className='p-2 border rounded w-auto bg-red-500'>Delete</button>
                </form>
                
            </div>
        </div>
        <pre className='border rounded p-3 bg-gray-300 border-gray-400'>
            <code >
                {snippet.code}
            </code>
        </pre>
        
    </div>)
}
export async function generateStaticParams(){
    const snippets=await db.snippet.findMany();
    return snippets.map((snippet)=>{
        return {id:snippet.id.toString()};
    })
}