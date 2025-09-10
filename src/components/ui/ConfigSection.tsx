"use client"
import React, { useState } from 'react';
import { Settings, BookOpen, Target, Clock, CheckCircle, AlertCircle, RotateCcw} from 'lucide-react';
import toast from 'react-hot-toast';
import FileUploadSection from '@/components/ui/fileUpload';
import { File } from "lucide-react";

const ConfigSection = () => {
  const [config, setConfig] = useState({
    quizNumbers: 10,
    difficulty: 'medium'
  });


  const quizNumberOptions = [
    { value: 5, label: 'Questions', description: 'Quick assessment' },
    { value: 10, label: 'Questions', description: 'Standard quiz' },
    { value: 15, label: 'Questions', description: 'Comprehensive test' },
    { value: 20, label: 'Questions', description: 'Full examination' }
  ];

  const difficultyOptions = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: 'Basic concepts and definitions',
      color: 0,
      icon: '😊'
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: 'Moderate complexity and application',
      color: 1,
      icon: '🤔'
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: 'Advanced topics and critical thinking',
      color: 2,
      icon: '🧠'
    }
  ];

  type ConfigKey = 'quizNumbers' | 'difficulty' | 'timeLimitMinutes'| 'timeLimit';

  const updateConfig = (key:ConfigKey, value:undefined | string| number| boolean) => {
    const configkeys = ['quizNumbers','difficulty','timeLimitMinutes', 'timeLimit']
    if (!configkeys.includes(key)) return;
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    
    <div className="min-h-screen bg-gray-50 py-8 rounded-md shadow-sky-600 shadow-2xl transition-shadow">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Configuration</h1>
          <p className="text-gray-600">Set up your quiz parameters and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Quiz Numbers Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Number of Questions</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Choose how many questions to include in your quiz</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quizNumberOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    config.quizNumbers === option.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="quizNumbers"
                    value={option.value}
                    checked={config.quizNumbers === option.value}
                    onChange={(e) => updateConfig('quizNumbers', parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{option.value}</div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{option.label}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                  {config.quizNumbers === option.value && (
                    <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-blue-600" />
                  )}
                </label>
              ))}
            </div>
            
          </div>

          {/* Difficulty Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Difficulty Level</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Select the complexity level for your quiz questions</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficultyOptions.map((option) => {
                const colorClasses = [
                  config.difficulty === option.value 
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-20' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50',
                  config.difficulty === option.value 
                    ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-500 ring-opacity-20' 
                    : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50',
                  config.difficulty === option.value 
                    ? 'border-red-500 bg-red-50 ring-2 ring-red-500 ring-opacity-20' 
                    : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                ]
                


                return (
                  <label
                    key={option.value}
                    className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${colorClasses[option.color]}`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={config.difficulty === option.value}
                      onChange={(e) => updateConfig('difficulty', e.target.value)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="text-lg font-bold text-gray-900 mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    {config.difficulty === option.value && (
                      <CheckCircle className={`absolute top-2 right-2 w-5 h-5 text-blue-600`} />
                    )}
                  </label>
                );
              })}
            </div>           
          </div>
        </div>

       
      <div className='mb-8 mt-10 flex flex-col items-center'>
        <div className="p-3 bg-blue-600 rounded-full">
          <File className="w-8 h-8 text-white" />
        </div>
        <p className="text-black mt-4 mb-4 font-bold text-3xl dark:text-white">Upload Your Quiz Files</p>
        <p className="text-gray-600 mb-5">Support PDF only</p>
        <FileUploadSection uploadConfig={config}/>
      </div>
  </div>
  </div>

  );
  }



export default ConfigSection