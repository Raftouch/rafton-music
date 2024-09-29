'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define the shape of the user data
interface User {
  username: string
}

// Define the shape of the context data
interface UserContextType {
  user: User | undefined
  isAuthenticated: boolean
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context with the initial value of `null`
const UserContext = createContext<UserContextType | null>(null)

// Create a provider component to wrap around the app
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined) // user can be undefined initially
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Function to check authentication
  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check-auth`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )

      if (response.ok) {
        const data = await response.json()
        setUser({ username: data.username })
        setIsAuthenticated(true)
      } else {
        setUser(undefined) // Use `undefined` instead of `null`
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      setUser(undefined) // Use `undefined` on error as well
      setIsAuthenticated(false)
    }
  }

  // Run the checkAuth when the component mounts
  useEffect(() => {
    checkAuth()
  }, [])

  // Provide the user context value to children components
  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to access user data
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
