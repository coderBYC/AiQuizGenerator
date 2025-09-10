import React from 'react'
import QuizQuestion from '@/components/ui/QuizQuestion'
import {db} from '@/db'
import {eq} from 'drizzle-orm'
import { quizzes } from '@/db/schema'


const page =async ({params}:{
    params: {quizId:string}
}) => {


  const quizId = params.quizId  
  const quiz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, parseInt(quizId)),
    with:{
        questions:{
            with:{
                options: true
            }
        }
    }
  })

  if (!quizId || !quiz || quiz?.questions.length===0){
    return(
        <div>Quiz Not Found</div>
    )
  }
  return (
    <QuizQuestion quizData={quiz}/>
  )
}

export default page 