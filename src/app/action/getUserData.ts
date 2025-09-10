import { db } from "@/db";
import { auth } from "@/auth";
import {count, eq, avg, sql} from "drizzle-orm"
import { quizSubmissions, quizzes, users, questions} from "@/db/schema";

export default async function getUserData(){
    const session = await auth();
    const userId = session?.user?.id
    if (!userId){
        return
    }

    //get user quizzes total number
    const quiznum = await db.select({total:count()}).from(quizzes).where(eq(quizzes.userId, userId))

    //get total questions
    const qnum = await db.select({total:count()}).from(questions)
    .innerJoin(quizzes, eq(questions.quizId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id,userId))

    //get user total # of submissions
    const submissionCount = await db.select({total:count()}).from(quizSubmissions)
    .innerJoin(quizzes, eq(quizSubmissions.quizId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, userId))
    
    //get user average score of submissions
    const avgScore = await db.select({average:avg(sql`${quizSubmissions.score}`)}).from(quizSubmissions)
    .innerJoin(quizzes, eq(quizSubmissions.quizId,quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, userId))

   
   


    return(
        
            [{name: 'Total Quizzes', value: quiznum[0].total},
            {name: 'Total Questions', value: qnum[0].total},
            {name: 'Total Submissions', value: submissionCount[0].total},
            {name: 'Average Score', value: avgScore[0].average}]
        
    )





}


