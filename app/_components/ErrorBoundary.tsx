'use client'
 
import { catchError, type ErrorInfo } from 'next/error'
 
function ErrorFallback(props: { title: string }, { error, retry, reset }: ErrorInfo) {
  return (
    <div className='text-red-600'>
      <h2>{props.title}</h2>
      <p>{(error as Error).message}</p>
      <button onClick={() => retry()}>Try again</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}
 
export default catchError(ErrorFallback)
