'use client'

import type { Metadata } from 'next'
import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('fe-wiki-user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        console.error('User data parsing error:', err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('fe-wiki-token')
    localStorage.removeItem('fe-wiki-user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <html lang="de">
      <head>
        <title>FE-Wiki - Fockenbrock Elektrotechnik</title>
        <meta name="description" content="Firmen-Intranet und Wissensplattform für Elektrotechnik" />
      </head>
      <body>
        <nav className="nav">
          <div className="nav-container">
            <h1 className="nav-title">⚡ FE-Wiki - Fockenbrock Elektrotechnik</h1>
            <div className="nav-links">
              <a href="/" className="nav-link">Home</a>
              {user ? (
                <>
                  <a href="/dashboard" className="nav-link">Dashboard</a>
                  <a href="/wiki" className="nav-link">Wiki</a>
                  <a href="/templates" className="nav-link">Templates</a>
                  {(user.role === 'admin' || user.role === 'editor') && (
                    <a href="/baustelle" className="nav-link">Baustellen</a>
                  )}
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{fontSize: '0.875rem', opacity: 0.8}}>
                      👤 {user.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="nav-link"
                      style={{background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer'}}
                    >
                      Abmelden
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <a href="/wiki" className="nav-link">Wiki</a>
                  <a href="/templates" className="nav-link">Templates</a>
                  <a href="/login" className="nav-link" style={{background: 'rgba(255,255,255,0.2)'}}>
                    🔐 Anmelden
                  </a>
                </>
              )}
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}