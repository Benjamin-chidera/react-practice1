import React from 'react'

export const Alert = ({message, type}) => {
  return (
    <div>
      <p className={`alert alert-${type}`}>{message}</p>
    </div>
  )
}
