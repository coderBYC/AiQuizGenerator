import { InferSelectModel } from 'drizzle-orm'
import { quizzes } from '@/db/schema'
import { Card, CardContent} from "@/components/ui/card"
import  SubmissionTrend  from './submissionTrend'
import {
  Calendar,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import getUserData from "@/app/action/getUserData"
import getHeatMapData from "@/app/action/getHeatMapData"
import { roundIfNumber } from "@/lib/utils"
import Quizheatmap from './heatmap'
import getquizdata from "@/app/action/getquizdata"
import getUserDailyTrend from "@/app/action/getUserDailyTrend"
import { Activity , Target} from "lucide-react"
import Link from 'next/link'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipProvider , TooltipTrigger, TooltipContent} from '@radix-ui/react-tooltip'


export type Quiz = InferSelectModel<typeof quizzes>
type Props = {
  quizzes: Quiz[]
}

// If your Quiz type has a questions array or questionCount property, update here accordingly.

const QuizzesBoard = async (props: Props) => {
  
  const userData = await getUserData();
  const heatMapData = await getHeatMapData();
  const quizData = await Promise.all(props.quizzes.map((quiz) => getquizdata(quiz)))
  const dailySubmissions = await getUserDailyTrend();
  
  
  return (
    <div className="dark:bg-gray-900">
      <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Performance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Record your daily submissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {userData && userData?.length > 0 ? (
          <>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.[0].name}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{userData?.[0].value}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.[1].name}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData?.[1].value}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.[2].name}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {userData?.[2].value}
                    </p>
                  </div>
                  <Target className="w-8 h-8  text-red-500 " />
                  
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{userData?.[3].name}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roundIfNumber(userData?.[3].value)} %
                    </p>
                  </div>
                  <Activity className="text-green w-8 h-8 " />
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      {heatMapData ? <Quizheatmap data={heatMapData?.data}/>: null}

      {dailySubmissions && (<SubmissionTrend props={dailySubmissions} />)}
      

  
      

      <div className="divide-y pb-4 divide-gray-200 dark:divide-gray-700">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Quizzes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your quiz collection</p>
          </div>
        </div>
        {quizData.map((quiz) => (
          console.log(quiz), 
          
          <div>
            
              <div
                className="flex items-center justify-between py-5 px-4 h-3xl rounded-md border-2 border-black hover:bg-slate-200 dark:hover:bg-gray-800 transition"
              >
                <div className="flex-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/quiz/${quiz?.id}`} className="hover:underline hover:text-blue-500">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-500 dark:text-white">
                          {quiz?.name}
                          </h3>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="start">
                        <p className='bg-black dark:bg-white rounded-sm p-2 text-sm text-white'>Retake Quiz</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  
                  <p className="text-1xl text-gray-600 dark:text-gray-400 line-clamp-1">
                    {quiz?.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-1xl text-gray-500 dark:text-gray-400">
                    
                    <BookOpen className="w-3 h-3" />
                    {quiz?.questionNumber || 0} questions
                    

                    <TrendingUp className="h-3 w-3" />
                    <span>{quiz?.submissionNumber} submissions</span>
                      
                    
                    <Calendar className="w-3 h-3" />
                    <span>{quiz?.createdAt?.toLocaleDateString() || "Unknown date"}</span>
                  </div>
                </div>
              

              <div className="relative w-32 h-32 ">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-black dark:text-white">{Math.ceil(Number(quiz?.averageScore) || 0)}%</span>
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
                  strokeDasharray={`${Number(roundIfNumber(quiz?.averageScore)) * 2.51} 251`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>

            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizzesBoard