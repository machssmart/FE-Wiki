'use client'

import { useState, useEffect } from 'react'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { useAuth } from '../hooks/useAuth'

function DashboardContent() {
  const { user, logout } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lade Dashboard-Daten
    fetch('http://localhost:3001/api/stats')
      .then(r => r.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Dashboard API Error:', err)
        setLoading(false)
      })
  }, [])

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return '#dc2626'
      case 'editor': return '#2563eb'
      case 'customer': return '#059669'
      default: return '#6b7280'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return '👨‍💼'
      case 'editor': return '✏️'
      case 'customer': return '👤'
      default: return '👤'
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Lade Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      {/* Header mit Benutzer-Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        borderRadius: '1rem',
        color: 'white'
      }}>
        <div>
          <h1 style={{fontSize: '2.5rem', margin: '0 0 0.5rem 0'}}>
            🏠 Dashboard
          </h1>
          <p style={{margin: 0, opacity: 0.9}}>
            Willkommen zurück, <strong>{user?.name}</strong>!
          </p>
        </div>
        <div style={{textAlign: 'right'}}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{fontSize: '1.5rem'}}>{getRoleIcon(user?.role || '')}</span>
            <div>
              <div style={{fontWeight: 'bold'}}>{user?.name}</div>
              <div style={{fontSize: '0.875rem', opacity: 0.8}}>
                <span style={{
                  background: getRoleColor(user?.role || ''),
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem'
                }}>
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            🚪 Abmelden
          </button>
        </div>
      </div>

      {/* Statistiken */}
      <div className="stats-grid" style={{marginBottom: '3rem'}}>
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937'}}>
                {stats?.totalArticles || 0}
              </div>
              <div style={{color: '#6b7280'}}>Wiki-Artikel</div>
            </div>
            <div style={{fontSize: '2rem', color: '#3b82f6'}}>📚</div>
          </div>
        </div>

        <div className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937'}}>
                {stats?.totalTemplates || 0}
              </div>
              <div style={{color: '#6b7280'}}>Elektro-Templates</div>
            </div>
            <div style={{fontSize: '2rem', color: '#f59e0b'}}>⚡</div>
          </div>
        </div>

        <div className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937'}}>
                {stats?.totalViews || 0}
              </div>
              <div style={{color: '#6b7280'}}>Gesamt-Aufrufe</div>
            </div>
            <div style={{fontSize: '2rem', color: '#10b981'}}>👁️</div>
          </div>
        </div>

        <div className="card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937'}}>
                Online
              </div>
              <div style={{color: '#6b7280'}}>System-Status</div>
            </div>
            <div style={{fontSize: '2rem', color: '#10b981'}}>✅</div>
          </div>
        </div>
      </div>

      {/* Quick Actions basierend auf Rolle */}
      <div className="card">
        <h2 style={{marginBottom: '1.5rem'}}>🚀 Schnellzugriffe</h2>
        <div className="card-grid">
          <a href="/wiki" className="card hover-lift" style={{textDecoration: 'none', color: 'inherit'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>📚</div>
              <h3>Wiki durchsuchen</h3>
              <p style={{color: '#6b7280'}}>Elektrotechnik-Artikel lesen</p>
            </div>
          </a>

          <a href="/templates" className="card hover-lift" style={{textDecoration: 'none', color: 'inherit'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', marginBottom: '1rem'}}>⚡</div>
              <h3>Templates nutzen</h3>
              <p style={{color: '#6b7280'}}>Formulare ausfüllen</p>
            </div>
          </a>

          {(user?.role === 'admin' || user?.role === 'editor') && (
            <a href="/baustelle" className="card hover-lift" style={{textDecoration: 'none', color: 'inherit'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem'}}>🏗️</div>
                <h3>Baustellen</h3>
                <p style={{color: '#6b7280'}}>Projektdokumentation</p>
              </div>
            </a>
          )}

          {user?.role === 'admin' && (
            <div className="card" style={{background: '#fef3c7', border: '1px solid #f59e0b'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2rem', marginBottom: '1rem'}}>👨‍💼</div>
                <h3 style={{color: '#92400e'}}>Admin-Bereich</h3>
                <p style={{color: '#78350f'}}>Benutzerverwaltung</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}