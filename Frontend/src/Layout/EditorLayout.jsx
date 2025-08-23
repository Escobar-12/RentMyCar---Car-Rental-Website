import React from 'react'
import { Outlet } from 'react-router-dom'
import EditorSideBar from '../components/EditorSideBar'

const EditorLayout = () => {
  return (
    <div className="flex flex-row min-h-screen">
        <EditorSideBar className="hidden"/>
        <div className="flex-1">
            <Outlet />
        </div>
    </div>
  )
}

export default EditorLayout