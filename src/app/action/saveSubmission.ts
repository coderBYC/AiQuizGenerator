"use server"
import { db } from "@/db"
import { InferInsertModel } from "drizzle-orm"
import { quizSubmissions } from "@/db/schema"

type Submission = InferInsertModel<typeof quizSubmissions>




export default async function saveSubmission(score:number, quizId:number){
    const newSubmission = await db.insert(quizSubmissions)
        .values({
            score,
            quizId
        })
        .returning({
            insertedId:quizSubmissions.id
        })

        const subId = newSubmission[0].insertedId
        return subId
}