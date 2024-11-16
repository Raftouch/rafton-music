import React from 'react'

interface DetailsProps {
  params: { id: string }
}

export default function UserDetails({ params: { id } }: DetailsProps) {
  return <div>UserDetails</div>
}
