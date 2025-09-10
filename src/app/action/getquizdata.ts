import {auth} from "@/auth";
import { InferSelectModel, avg, sql, eq, count } from "drizzle-orm";
import { quizzes, quizSubmissions, users, questions} from "@/db/schema";
import { db } from "@/db";

export type Quiz = InferSelectModel<typeof quizzes>


export default async function getquizdata(props:Quiz) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        return;
    }

    //find the average score of a single quiz

    const quizAverage = await db.select({average: avg(sql`${quizSubmissions.score}`)}).from(quizSubmissions)
    .innerJoin(quizzes, eq(quizzes.id, props.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, userId))

    //find the total submissions of a single quiz
    const subnum = await db.select({total: count()}).from(quizSubmissions)
    .innerJoin(quizzes, eq(quizzes.id, props.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, userId))

    //find the total questions of a single quiz
    const qnum = await db.select({total: count()}).from(questions)
    .innerJoin(quizzes, eq(quizzes.id, props.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, userId))




    return (
        
            {
                id: props.id,
                name:props.name, 
                description: props.description,
                createdAt: props.createdAt,
                averageScore: quizAverage[0].average,
                questionNumber: qnum[0].total,
                submissionNumber: subnum[0].total
            }
        
    )
    
    
}