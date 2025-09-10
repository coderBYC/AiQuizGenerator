
import React from 'react'
import {auth, signOut, signIn} from "@/auth";
import { Button } from './button';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, Plus, BadgeDollarSign, Sun, Moon, LogOut, Settings, BookOpen} from "lucide-react"
import { PRICE_ID} from '@/lib/utils';
import SubscribeButton from '@/app/billing/SubscribeButton';


function SignOut() {
  return (
    <form action={async () => {
      'use server';
      await signOut()    
    }}>
      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400">
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
      
    </form>
 )
}

export default async function Navbar() {

  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userId = session?.user?.id
  if (!userId){
    return
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-b fixed top-0 left-0 right-0 z-50 border-gray-200 dark:border-gray-700 shadow-sm sticker">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16 m-auto sm:px-3 lg-px-8">
          {/* Left Section - Logo */}
          <div className="flex items-center justify-start flex-1">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Quiz Generator</span>
            </div>
          </div>

          {/* Center Section - Navigation Icons */}
          <div className="flex items-center gap-2">
            <Link href='/dashboard'>
              <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-4 py-2 text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            
            </Link>
            

            <Link href='/quiz/new'>
              <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">Create Quiz</span>
              </Button>
            </Link>

            <SubscribeButton userId={userId} priceId = {PRICE_ID}/>
            

        
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center gap-3">
            
          

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
            
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
          
              <DropdownMenuTrigger asChild>
                <button className="rounded-full flex items-center justify-center">
                  <Image src={session?.user?.image || ""} alt={session?.user?.name || " "} width={38} height={38} className='rounded-full'/>
                </button>             
              </DropdownMenuTrigger>
              
              <DropdownMenuContent>
              {/* Dropdown Menu */}
              
              
                  {/* User Info */}
              
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full flex items-center justify-center">
                        <Image src={session?.user?.image || ""} alt={session?.user?.name || " "} width={38} height={38} className='rounded-full'/>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
                      </div>
                    </div>
                 </div>
              

              
              
                  {/* Menu Items */}
                  <div className="py-1">
                    <Link href='/billing'>
                    <DropdownMenuItem>
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <BadgeDollarSign className="h-4 w-4" />
                      Billing
                    </button>
                    </DropdownMenuItem>
                    </Link>
                  </div>
                
                  
                <DropdownMenuItem>
                  {/* Sign Out */}
                  <SignOut />
                </DropdownMenuItem>
            
              
              </DropdownMenuContent>
              
            
            </DropdownMenu>
          
          </div>
        </div>
      </div>
    </div>
  )
}

