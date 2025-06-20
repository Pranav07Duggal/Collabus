"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import NewAgentDialog from './new-agent-dialog'
import { useState } from 'react'
const ListHeader = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
    <NewAgentDialog open = {dialogOpen} onOpenChange={setDialogOpen} />
    <div className='px-4 py-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
            <h5 className='text-xl font-medium'>
                My Agents
            </h5>
            <Button onClick={()=>{setDialogOpen(true)}}>    
                <PlusIcon/>
                New Agent
            </Button>
        </div>
        </div>
     </>
  )
}

export default ListHeader