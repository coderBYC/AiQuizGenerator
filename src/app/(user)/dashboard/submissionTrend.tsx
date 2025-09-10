"use client"
import React from 'react';

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

//example data
/*const dailySubmissions = [
    { date: 'Mon', submissions: 45, avgScore: 76.2, passRate: 64.4 },
    { date: 'Tue', submissions: 52, avgScore: 79.1, passRate: 71.2 },
    { date: 'Wed', submissions: 38, avgScore: 81.5, passRate: 76.3 },
    { date: 'Thu', submissions: 61, avgScore: 77.8, passRate: 68.9 },
    { date: 'Fri', submissions: 48, avgScore: 83.2, passRate: 79.2 },
    { date: 'Sat', submissions: 29, avgScore: 80.6, passRate: 72.4 },
    { date: 'Sun', submissions: 34, avgScore: 78.9, passRate: 70.6 }
  ];*/
  type DailySubmission = {
    date: string,
    submissions: number,
    avgScore: number
  }

  type SubmissionTrendProps = {
    props: DailySubmission[]
  }

  
const submissionTrend = ({props}:SubmissionTrendProps) => {
  return (
     <div className="flex flex-cols-1 lg:grid-cols-3 gap-8 mb-8 justify-center">
          {/* Daily Submissions Trend */}
          <div className="w-full max-w-3xl lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">{"Past Week's Submissions & Performance Trend"}</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">Submissions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Avg Score</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={props}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis yAxisId="left" stroke="#666" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

  )
}

export default submissionTrend