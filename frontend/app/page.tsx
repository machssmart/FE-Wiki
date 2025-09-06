'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Nur öffentliche Statistiken laden
    fetch('http://localhost:3001/api/stats')
      .then(r => r.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('API Error:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      {/* Öffentlicher Hero-Bereich */}
      <div className="hero" style={{background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #dc2626 100%)', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '20px', right: '20px', opacity: 0.1, fontSize: '8rem'}}>⚡</div>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
          FE-Wiki
        </h1>
        <h2 style={{fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9}}>
          Fockenbrock Elektrotechnik
        </h2>
        <p style={{fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95}}>
          Zentrale Plattform für Elektrotechnik-Wissen und Projektdokumentation
        </p>
        
        {/* Call-to-Action */}
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="/login" className="btn" style={{
            background: 'rgba(255,255,255,0.2)', 
            color: 'white', 
            textDecoration: 'none',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            🔐 Anmelden
          </a>
          <a href="/wiki" className="btn btn-secondary" style={{
            background: 'rgba(255,255,255,0.9)', 
            color: '#1f2937', 
            textDecoration: 'none'
          }}>
            📚 Wiki durchsuchen
          </a>
        </div>
      </div>

      {/* Öffentliche Informationen */}
      <div className="card-grid" style={{marginTop: '3rem'}}>
        <div className="card">
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem', color: '#3b82f6'}}>📚</div>
            <h3>Wissensdatenbank</h3>
            <p style={{color: '#6b7280'}}>
              Umfassende Elektrotechnik-Artikel von KNX bis Photovoltaik
            </p>
            <div style={{marginTop: '1rem'}}>
              <span className="badge badge-info">
                {stats?.totalArticles || 0} Artikel verfügbar
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem', color: '#f59e0b'}}>⚡</div>
            <h3>Elektro-Templates</h3>
            <p style={{color: '#6b7280'}}>
              Vorgefertigte Formulare für Prüfprotokolle und Dokumentation
            </p>
            <div style={{marginTop: '1rem'}}>
              <span className="badge badge-warning">
                {stats?.totalTemplates || 0} Templates
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem', color: '#10b981'}}>🏗️</div>
            <h3>Projektmanagement</h3>
            <p style={{color: '#6b7280'}}>
              Baustellen-Dokumentation und Datei-Upload für Elektrofachkräfte
            </p>
            <div style={{marginTop: '1rem'}}>
              <span className="badge badge-success">Verfügbar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login-Hinweis */}
      <div className="card" style={{marginTop: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', border: '1px solid #bbf7d0'}}>
        <h3 style={{color: '#065f46', marginBottom: '1rem'}}>🔐 Anmeldung erforderlich</h3>
        <p style={{color: '#047857', marginBottom: '1.5rem'}}>
          Für den Vollzugriff auf alle Funktionen ist eine Anmeldung erforderlich.
        </p>
        <a href="/login" className="btn" style={{background: '#059669', color: 'white', textDecoration: 'none'}}>
          Jetzt anmelden
        </a>
      </div>
    </div>
  )
}