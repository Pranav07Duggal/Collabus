"use client";
import { ErrorState } from "@/components/error-state"


const ErrorPage = () => {
  return (
    <ErrorState title="Error loading your meeting" description="Something Went Wrong!"/>
  )
}

export default ErrorPage