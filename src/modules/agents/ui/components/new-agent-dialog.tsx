"use client"
import { ResponsiveDialog } from '@/components/responsive-dialog'
import React from 'react'
import AgentForm from './agentform'

interface newAgentDialogProps {
    open: boolean,
    onOpenChange: (open:boolean) => void,
}

const NewAgentDialog = ({open,onOpenChange}:newAgentDialogProps) => {
  return (
    <ResponsiveDialog title='New Agent' description=' Create a new agent'
    open={open}
    onOnpenChange={onOpenChange} >
        <AgentForm
        onSuccess={()=>onOpenChange(false)}
        onCancel={()=>{onOpenChange(false)}}
        />
        </ResponsiveDialog>
  )
}

export default NewAgentDialog