'use client'

import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, hasAnyRole } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        window.location.href = redirectTo
        return
      }

      if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
        window.location.href = '/unauthorized'
        return
      }
    }
  }, [loading, isAuthenticated, hasAnyRole, requiredRoles, redirectTo])

  if (loading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Überprüfe Berechtigung...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated()) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Weiterleitung zur Anmeldung...</p>
        </div>
      </div>
    )
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return (
      <div className="container" style={{padding: '2rem 1rem'}}>
        <div className="card" style={{textAlign: 'center', padding: '3rem'}}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🚫</div>
          <h2>Keine Berechtigung</h2>
          <p style={{color: '#6b7280', marginBottom: '2rem'}}>
            Sie haben keine Berechtigung für diese Seite.
          </p>
          <p style={{color: '#6b7280', marginBottom: '2rem'}}>
            <strong>Erforderliche Rolle:</strong> {requiredRoles.join(' oder ')}
            <br />
            <strong>Ihre Rolle:</strong> {user?.role}
          </p>
          <button onClick={() => window.history.back()} className="btn">
            ← Zurück
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}