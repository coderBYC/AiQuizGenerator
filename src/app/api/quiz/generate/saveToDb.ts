import {db} from '@/db'
import {quizzes, questions as dbquestions, questionOptions} from "@/db/schema"
import { InferInsertModel } from 'drizzle-orm';
import { auth } from '@/auth';


type Quiz = InferInsertModel<typeof quizzes>
type Question = InferInsertModel<typeof dbquestions>

interface QuizData extends Quiz {
    questions: Array<Question & {options?: string[]}>
}

export default async function saveQuizToDb(quizData:QuizData ){
    const {name, description, questions} = quizData;
    console.log('Saving quiz to DB:', name, description, questions);
    const session = await auth();
    const userId = session?.user?.id;
    const newQuiz = await db.insert(quizzes)
    .values({
        name, 
        description,
        userId
    })
    .returning({
        inserted_id:quizzes.id 
    })

    const quizId = newQuiz[0].inserted_id
    console.log(quizId)

    await db.transaction(async(tx)=>{   
    for (const question of questions){
        console.log(question.question, question.correctAnswer)
        try {
            const newQuestion = await tx.insert(dbquestions)
            .values({
                quizId,
                question:question.question,
                correctAnswer:question.correctAnswer
            })
            .returning({
                questionId:dbquestions.id
            })

            const questionId = newQuestion[0].questionId
            console.log('Inserting options for questionId:', questionId, question.options);
            if (question.options && question.options.length >0){
                await tx.insert(questionOptions).values(
                    question.options.map((option) => ({
                        optionText: option,
                        questionId,
                    }))
                )
            }
        } catch (e) {
            console.error('Error inserting question:', e, question);
        }
    }
})
    return {quizId}


}
   

