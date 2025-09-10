"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample quiz data - replace with your actual data source
const quizData = [
  {
    id: 1,
    question: "What is the primary goal of artificial intelligence?",
    options: [
      "To replace human workers",
      "To simulate human intelligence in machines",
      "To create conscious machines",
      "To develop faster computers",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of these is NOT a type of machine learning?",
    options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Cognitive learning"],
    correctAnswer: 3,
  },
  {
    id: 3,
    question: "What does NLP stand for in AI?",
    options: [
      "Natural Language Processing",
      "Neural Link Protocol",
      "Network Learning Procedure",
      "Non-Linear Programming",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "Which company developed the AI system that defeated the world champion in Go?",
    options: ["Microsoft", "IBM", "Google DeepMind", "OpenAI"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is a neural network modeled after?",
    options: ["Computer circuits", "Human brain structure", "Quantum physics", "Biological evolution"],
    correctAnswer: 1,
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quizData.length).fill(-1))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitted) return

    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    let newScore = 0
    selectedAnswers.forEach((selected, index) => {
      if (selected === quizData[index].correctAnswer) {
        newScore++
      }
    })
    setScore(newScore)
    setIsSubmitted(true)
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100

  const answeredQuestions = selectedAnswers.filter((answer) => answer !== -1).length

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-bold text-center mb-8 text-black dark:text-white">AI Knowledge Quiz</h1>

      {isSubmitted ? (
        <ResultsCard score={score} total={quizData.length} />
      ) : (
        <>
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>
                Question {currentQuestion + 1} of {quizData.length}
              </span>
              <span>
                {answeredQuestions} of {quizData.length} answered
              </span>
            </div>
            <Progress value={progress} className="h-4 bg-gray-200 dark:bg-gray-800" />
          </div>

          <Card className="border-2 border-black dark:border-white shadow-none">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-medium text-black dark:text-white">{quizData[currentQuestion].question}</h2>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {quizData[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 border-2 rounded-md cursor-pointer transition-transform duration-300${
                      selectedAnswers[currentQuestion] === index
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black "
                        : "border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-200 hover:-translate-x-1.5 hover:-translate-y-1.5 hover:bg-slate-700 hover:scale-103"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                          selectedAnswers[currentQuestion] === index
                            ? "border-white bg-white text-black dark:border-black dark:bg-black dark:text-white"
                            : "border-gray-400 dark:border-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-base">{option}</span>
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

              {currentQuestion < quizData.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.includes(-1)}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
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

function ResultsCard({ score, total }: { score: number; total: number }) {
  const percentage = Math.round((score / total) * 100)
  const router = useRouter()

  return (
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
                className=" dark:text-red-600 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              />
              <circle
                className=" dark:text-green-500 stroke-current"
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
          onClick={() => router.push('/dashboard')}
          className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Dashboard
        </Button>
      </CardFooter>
    </Card>
  )
}




 
