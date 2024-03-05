import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="py-1 px-2 border rounded-md shadow-md" onClick={onClick}>
      {children}
    </button>
  )
}
