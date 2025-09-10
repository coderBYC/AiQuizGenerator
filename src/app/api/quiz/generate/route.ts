import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import saveQuizToDb from "./saveToDb";  

export async function POST(req: NextRequest){
  console.log('API Route: /api/quiz/generate called')
  /*const quizexample = {
    name: 'Atoms, Molecules, and Ions Quiz',
    description: "Medium-level assessment based on the summary text covering matter composition, Dalton's atomic theory, atomic structure, and related laws (Conservation of Mass, Definite Proportions, and Multiple Proportions).",
    questions: [
      {
        question: 'What is the smallest particle of an element that retains the chemical properties of that element?',
        options: [ 'Ion', 'Electron', 'Atom', 'Molecule' ],
        correctAnswer: 2
      },
    ]
  }
  const {name, description, questions} = quizexample
  console.log(name, description, questions)
  const quizId = await saveQuizToDb(quizexample)
  console.log(quizId)*/
  const body = await req.formData()
  console.log('Body: '+ body)
  const document = body.get('pdf') as Blob
  console.log(document)
  const config = JSON.parse(body.get('config') as string)
  console.log(config)
  const {quizNumbers, difficulty} = config
  console.log(quizNumbers, difficulty)
  try{
    const pdfLoader = new PDFLoader(document as Blob,{
            parsedItemSeparator: ' ',
            splitPages: true,
        })
    console.log('PDF Loader created')
    const docs = await pdfLoader.load()
    console.log('PDF Loaded, number of pages:', docs.length)
    const selectedDocs = docs.filter((doc)=> doc.pageContent !== undefined)
    console.log('Filtered docs, number of valid pages:', selectedDocs.length);
    const texts = selectedDocs.map((doc)=>doc.pageContent)
    const prompt =
    `given the text which is a summary of the document, generate a ${quizNumbers} question, ${difficulty} level quiz based on the text. Return JSON only that contains a quiz object with fields: name, description and questions. The questions is an array of objects with fields: question, options(no need to include A) B) C) D) tag), and correctAnswer(0-3 index of the option).`;
    console.log('Prompt created', prompt)
    console.log('Texts:', texts)
    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-5-nano",
      })
    const parser = new JsonOutputFunctionsParser();
    const extractionFunctionSchema = {
    name: "extractor",
    description: "Extracts fields from the output",
    parameters: {
        type: "object",
        properties: {
        quiz: {
            type: "object",
            properties: {
            name: { type: "string" },
            description: { type: "string" },
            questions: {
                type: "array",
                items: {
                type: "object",
                properties: {
                    question: { type: "string" },
                    options: {
                    type: "array",
                    items: { type: "string" },
                    minItems: 4,
                    maxItems: 4
                    },
                    correctAnswer: { type: "number" }
                },
                required: ["question", "options", "correctAnswer"]
                }
          }
        },
        required: ["name", "description", "questions"]
      }
    },
    required: ["quiz"]
    }
    }
    console.log('Function schema defined')
    const runnable = model
      .bind({
        functions: [extractionFunctionSchema],
        function_call: { name: "extractor" },
      })
      .pipe(parser);
    console.log('Runnable created')

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: prompt + "\n" + texts.join("\n"),
        },
      ],
    });
    console.log('Invoking model...')

    const result: any = await runnable.invoke([message]);
    console.log(result, result.quiz.questions[0])
    const { quizId } = await saveQuizToDb(result.quiz)
    return NextResponse.json( { quizId }, { status: 200 });
    }
   catch(e:any){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }


}
