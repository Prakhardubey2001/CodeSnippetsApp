'use server'
import {redirect} from 'next/navigation';
import {db} from '@/db'
import { error } from 'console';
import { revalidatePath } from 'next/cache';

export async function editSnippet(id:number,code :string){
    // console.log(`edit snippet ${id}`)
    await db.snippet.update({where:{id},
        data:{code}
    });
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number){
    await db.snippet.delete({where:{id}});
    revalidatePath('/');
    redirect('/');
}

// export async function createSnippet(formState:{message:string},formData:FormData){
//     // this is a server action  check the user input and validate it then create a new recotrd in datbase
//     // 'use server'; // seeing this next consider it as a server action
//     try{
//     const title = formData.get('title') ;
//     const code= formData.get('code') ;
    
//     if(typeof title !== 'string' || title.length<3)
//     {
//         return {message: 'Title must be at least 3 characters long'};
//     }
//     if(typeof code !== 'string' || code.length<10)
//     {
//         return {message: 'Code must be at least 10 characters long'};
//     }

//     const snippet= await db.snippet.create({
//         data:{
//         title,
//         code,
//         },
        
//     });
    
//     //  await db.snippet.create({
//     //     data:{
//     //     title,
//     //     code,
//     //     },
        
//     // });
//     if(!snippet)
//     {
//         throw new Error ("An unknown error occurred while trying to create a new snippet!");
//     }
//      console.log(snippet);
//     // return {message: 'Snippet created successfully!'};
           
//         //    
// }
// catch(err:unknown)
// {
//     if(err instanceof Error)
//     {
//         return{mesage:err.message};
//     }
//     else{
//         return {message: 'An error occured while creating a new snippet! Please try again later.'};
//     }
// }

// // After create redirect to the home page

// redirect('/');   
// // notFound();



export async function createSnippet(state: { message: string }, formData: FormData) {
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        if (typeof title !== 'string' || title.length < 3) {
            return { message: 'Title must be at least 3 characters long' };
        }
        if (typeof code !== 'string' || code.length < 10) {
            return { message: 'Code must be at least 10 characters long' };
        }

        const snippet = await db.snippet.create({
            data: {
                title,
                code,
            },
        });

        if (!snippet) {
            throw new Error("An unknown error occurred while trying to create a new snippet!");
        }

        console.log(snippet);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { message: err.message };
        } else {
            return { message: 'An error occurred while creating a new snippet! Please try again later.' };
        }
    }
    revalidatePath('/');
    redirect('/');

}