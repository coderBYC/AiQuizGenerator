import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI QUIZ GENERATOR',
  description: 'Generated dynamic quizzes by AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <SessionProvider>
        <body className='min-h-screen flex flex-col'>
          <Toaster position="bottom-right" />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="container px-4 text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AI Quiz Generator. All rights reserved.
            </div>
          </footer>
          
        </body>
        
        
      </SessionProvider>
      
    </html>
  )
}
