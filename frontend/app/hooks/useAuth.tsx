'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  username: string
  email: string
  role: string
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('fe-wiki-token')
    const userData = localStorage.getItem('fe-wiki-user')

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (err) {
        console.error('User data parsing error:', err)
        logout()
      }
    }
    setLoading(false)
  }

  const login = (token: string, userData: User) => {
    localStorage.setItem('fe-wiki-token', token)
    localStorage.setItem('fe-wiki-user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('fe-wiki-token')
    localStorage.removeItem('fe-wiki-user')
    setUser(null)
    window.location.href = '/login'
  }

  const isAuthenticated = () => {
    return !!user
  }

  const hasRole = (role: string) => {
    return user?.role === role
  }

  const hasAnyRole = (roles: string[]) => {
    return user ? roles.includes(user.role) : false
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    checkAuth
  }
}