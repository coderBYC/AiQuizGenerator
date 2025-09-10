import React from 'react'
import FileUploadSection from '@/components/ui/fileUpload'
import ConfigSection from '@/components/ui/ConfigSection'
import {File} from "lucide-react"

const page = () => {
  return (
    <div className="container max-w-4xl mx-auto mt-20 py-12 px-4">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Create New Quiz</h1>
        
      </div>
      
      <ConfigSection />
      
      
    </div>
  )
}

export default page