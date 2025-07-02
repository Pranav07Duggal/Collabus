import { CircleAlertIcon } from 'lucide-react'
import React from 'react'

const NoProjects = () => {
  return (
    <div className="bg-red-200 w-auto  h-auto flex flex-col flex-1 rounded-lg items-center justify-center p-3 gap-y-3">
        <CircleAlertIcon className="text-red-500"/>
        <p className="text-black font-normal">No projects added yet</p>
        </div>
  )
}

export default NoProjects