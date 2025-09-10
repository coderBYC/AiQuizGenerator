'use client'
import React from 'react'
import { useState } from 'react';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { Loader2 , Upload} from "lucide-react"
import {toast} from 'react-hot-toast';
type Config = {
  quizNumbers: number,
  difficulty: string
}
const FileUploadSection = ({uploadConfig}:{uploadConfig:Config}) => {
    const [document, setDocument] = useState<Blob  | File | null | undefined>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const router = useRouter();
    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();
        if (!document){
            setError("Document Required")
            toast.error("Document Required")
            return
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('pdf', document as Blob)
        formData.append('config', JSON.stringify(uploadConfig));
        console.log(formData, uploadConfig, document)
        try{
            console.log('Submitting')
            const res = await fetch('/api/quiz/generate', {
              method:'POST',
              body: formData
            })
            console.log('Response received', res)

            if (res.status === 200){
                console.log('Quiz Returned Successfully!')
                toast.success('Quiz Created')
                const data = await res.json();
                const quizId = data.quizId;
                router.push(`/quiz/${quizId}`)
            }

            if (res.status === 500){
              toast.error('Failed To Build Quiz')
            }


        }catch(e:any){
            console.log('error while generating', e)
            toast.error('Failed to build quiz')
        }
        setIsLoading(false) 

    }
    



  return (
    <div className='w-full'>
        {isLoading ? <p className='flex flex-col justify-center items-center font-bold'><Loader2 className="animate-spin h-20 w-20 text-blue-500 m-auto " />Loading...</p> : <form onSubmit={handleSubmit} className='w-full'>
            <label htmlFor='document' className='bg-blue-500 h-40 rounded-md items-center flex flex-col gap-2 mx-6 relative border-4 border-dashed border-blue-800 shadow-sky-500 shadow-2xl'>
                <div
                className={`rounded-full mt-6 ${
                  document
                    ? "opacity-0"
                    : ""
                }`}
              >
                <Upload
                  className={`h-9 w-9 ${
                    document ? "opacity-0" : "text-white dark:text-gray-600"
                  }`}
                />
              </div>
                <div className='flex inset-0 absolute justify-center items-center mt-5 text-white font-semibold text-2xl'>
                  {document && document instanceof File ? document.name : "Drag A File"}
                </div>

                <input type='file' id='document' className='opacity-0 relative block w-full h-full' onChange={(e)=>setDocument(e?.target?.files?.[0])}/>
            </label>
            <Button size='lg' type='submit' className='block mt-10 border-4 border-blue-800 border-collapse text-2xl px-10 pt-2 pb-10 rounded-3xl shadow-sky-600 shadow-2xl text-white mx-auto bg-blue-700 hover:opacity-80'>Build Quiz </Button>
            
        </form>}

    </div>
  )
}

export default FileUploadSection