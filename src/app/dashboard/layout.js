'use client'
import { SideBarDashboard, TopBarDashboard } from '@/components'
import React from 'react'

export default function Layout({children}) {  
 
  return (
    <div className='w-full min-h-screen flex flex-row '>
      <SideBarDashboard />
      <div className='w-full h-screen flex flex-col overflow-y-hidden'>
        <TopBarDashboard/>
        {children}
      </div>
    </div>
  )
}
