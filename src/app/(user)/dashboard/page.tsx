
import React from 'react'
import { db } from '@/db'
import { auth } from '@/auth'
import { eq, count } from 'drizzle-orm'
import { quizzes } from '@/db/schema'
import QuizzesBoard from './quizzesBoard'


const Dashboard = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId){
    return(
      <p>User Not Found</p>
    )
  }

  const userQuizzes = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId)
  })
  console.log(userQuizzes)

  return (
    <>
        <div className='mt-20'>
          
          <QuizzesBoard quizzes={userQuizzes}/>
        </div>
        
    </>
    
  )
}

export default Dashboard