'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()

      if (response.ok) {
        // Login erfolgreich
        localStorage.setItem('fe-wiki-token', data.access_token)
        localStorage.setItem('fe-wiki-user', JSON.stringify(data.user))
        
        // Weiterleitung zum Dashboard
        window.location.href = '/dashboard'
      } else {
        setError(data.message || 'Login fehlgeschlagen')
      }
    } catch (err) {
      setError('Verbindungsfehler zum Server')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role: 'admin' | 'editor' | 'customer') => {
    const demoCredentials = {
      admin: { username: 'admin', password: 'admin123' },
      editor: { username: 'editor', password: 'editor123' },
      customer: { username: 'kunde', password: 'kunde123' }
    }

    setCredentials(demoCredentials[role])
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '3rem',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        {/* Logo/Header */}
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>⚡</div>
          <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0}}>
            FE-Wiki
          </h1>
          <p style={{color: '#6b7280', margin: '0.5rem 0 0 0'}}>
            Fockenbrock Elektrotechnik
          </p>
        </div>

        {/* Login-Form */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              ❌ {error}
            </div>
          )}

          <div className="form-field">
            <label className="form-label">Benutzername</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="form-input"
              placeholder="Ihr Benutzername"
              required
              disabled={loading}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Passwort</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="form-input"
              placeholder="Ihr Passwort"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? (
              <>
                <div className="spinner" style={{width: '1rem', height: '1rem'}}></div>
                Anmeldung läuft...
              </>
            ) : (
              <>
                🔓 Anmelden
              </>
            )}
          </button>
        </form>

        {/* Demo-Accounts */}
        <div style={{marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0'}}>
          <h3 style={{fontSize: '1rem', fontWeight: '600', color: '#374151', margin: '0 0 1rem 0'}}>
            🧪 Demo-Accounts
          </h3>
          <div style={{display: 'grid', gap: '0.5rem'}}>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
            >
              👨‍💼 Administrator (admin / admin123)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('editor')}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              ✏️ Editor (editor / editor123)
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('customer')}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#047857'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#059669'}
            >
              👤 Kunde (kunde / kunde123)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          <a 
            href="/"
            style={{
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#374151'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            ← Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  )
}