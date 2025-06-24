"use client"
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useRouter } from 'next/navigation'
import React from 'react'
import MeetingForm from './meeting-form'

interface newMeetingDialogProps {
    open: boolean,
    onOpenChange: (open:boolean) => void,
}

const NewMeetingDialog = ({open,onOpenChange}:newMeetingDialogProps) => {
  const router  = useRouter();
  return (
    <ResponsiveDialog title='New Meeting' description=' Create a new meeeting'
    open={open}
    onOnpenChange={onOpenChange} >
        <MeetingForm
        onSuccess={(id) =>{
          onOpenChange(false)
          router.push(`/meetings/${id}`)
        }}
        onCancel={() => onOpenChange(false)}
        />
        </ResponsiveDialog>
  )
}

export default NewMeetingDialog