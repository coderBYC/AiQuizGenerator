"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { InferSelectModel } from "drizzle-orm"
import {quizzes, questions as dbquestions, questionOptions} from '@/db/schema'
import { useRouter } from "next/navigation"
import saveSubmission from "@/app/action/saveSubmission"

type Option = InferSelectModel<typeof questionOptions>
type Question = InferSelectModel<typeof dbquestions> & {options: Option[]}
type Quiz = InferSelectModel<typeof quizzes> & {questions: Question[]}



type Props = {
    quizData:Quiz
}



export default function QuizQuestion(props:Props) {
  const { questions, name, id } = props.quizData
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [score, setScore] = useState(0)
  

  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitted) return

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    let newScore = 0
    selectedAnswers.forEach((selected, index) => {
      if (selected === questions[index].correctAnswer) {
        newScore++
      }
    })
    setScore(newScore)
    try{
      console.log(newScore)
      const subId = await saveSubmission((newScore/questions.length)*100,props.quizData.id)

    } catch(e){
      console.log(e)
    }
    
    
    
    setIsSubmitted(true)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const answeredQuestions = selectedAnswers.filter((answer) => answer !== -1).length

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 mt-8 text-black dark:text-white">{name}</h1>

      {isSubmitted ? (
        <ResultsCard score={score} total={questions.length} questions={questions} selectedAnswers={selectedAnswers} quizId={id}/>
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                {answeredQuestions} of {questions.length} answered
              </span>
            </div>
            <Progress value={progress} className="h-4 bg-gray-200 dark:bg-gray-800" />
          </div>

          <Card className="border-2 border-black dark:border-white shadow-none">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-medium text-black dark:text-white">{questions[currentQuestion].question}</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option:Option, index:number) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 border-2 rounded-md cursor-pointer transition-transform duration-300 ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-50 dark:border-white dark:bg-white dark:text-black "
                        : "border-gray-300 hover:border-gray-400  dark:border-gray-700 dark:hover:border-gray-200 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:scale-103 hover:bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-blue-500 bg-blue-500 text-white dark:border-black dark:bg-black dark:text-white"
                            : "border-gray-400 text-gray-600 dark:border-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800">{option.optionText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 bg-transparent"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentQuestion < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 text-white hover:bg-blue-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.includes(-1)}
                  className="bg-blue-600 text-white hover:bg-blue-400 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Submit Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  )
}

function ResultsCard({
  score,
  total,
  questions,
  selectedAnswers,
  quizId
  }: {
  score: number;
  total: number;
  questions: Question[];
  selectedAnswers: number[];
  quizId:number
}) {
  const percentage = Math.round((score / total) * 100);
  const router = useRouter();

  return (
    <>
      <Card className="border-2 border-black dark:border-white shadow-none text-center">
        <CardHeader>
          <h2 className="text-2xl font-bold text-black dark:text-white">Quiz Results</h2>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-black dark:text-white">{percentage}%</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-red-600 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-green-500 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${percentage * 2.51} 251`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <p className="text-xl font-medium text-black dark:text-white">
              You scored {score} out of {total} questions correctly
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-800 pt-6">
          <Button
            onClick={() => window.location.reload()}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
      {questions.map((question, qIndex) => (
        <Card
          key={qIndex}
          className={`mt-3 border-2 shadow-none ${
            selectedAnswers[qIndex] === question.correctAnswer
              ? "border-green-500"
              : "border-red-600"
          }`}
        >
          <CardHeader className="border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-medium text-black dark:text-white">
              {question.question}
            </h2>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {question.options.map((option: Option, oIndex: number) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = question.correctAnswer === oIndex;

                return (
                  <div
                    key={oIndex}
                    className={`p-4 border-2 rounded-md transition-transform duration-300 ${
                      isSelected
                        ? isCorrect
                          ? "border-green-500 bg-green-500 dark:text-white"
                          : "border-red-500 bg-red-500 dark:text-white"
                        : isCorrect
                        ? "border-green-500 border-4"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                          isSelected
                            ? "border-white bg-white text-black dark:border-black dark:bg-black dark:text-white"
                            : "border-gray-400 dark:border-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + oIndex)}
                      </div>
                      <span className="text-base">{option.optionText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
