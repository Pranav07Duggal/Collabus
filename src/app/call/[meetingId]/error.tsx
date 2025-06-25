"use client";
import { ErrorState } from '@/components/error-state';
import React from 'react'

const Error = () => {
  return (
    <ErrorState title='Error loading your call' description='Something went wrong with video API'/>
  )
}

export default Error