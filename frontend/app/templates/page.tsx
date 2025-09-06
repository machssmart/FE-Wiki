'use client'

import { useState, useEffect } from 'react'

interface Template {
  id: string
  name: string
  category: string
  description: string
  icon: string
  fields: any[]
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/templates')
      .then(r => r.json())
      .then(data => {
        setTemplates(data.templates)
        setLoading(false)
      })
      .catch(err => {
        console.error('Templates API Error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Lade Elektrotechnik-Templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <div className="hero" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)'}}>
        <h1>⚡ Elektrotechnik-Templates</h1>
        <p>Vorgefertigte Formulare für Prüfprotokolle, Verteilungslegenden und mehr</p>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h2 style={{marginBottom: '1.5rem'}}>Verfügbare Templates ({templates.length})</h2>
        
        <div className="card-grid">
          {templates.map(template => (
            <div key={template.id} className="card hover-lift template-card elektro">
              <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{template.icon}</div>
                <h3 className="card-title">{template.name}</h3>
                <span className="badge badge-warning">{template.category}</span>
              </div>

              <p className="card-description" style={{marginBottom: '1.5rem'}}>
                {template.description}
              </p>

              <div style={{marginBottom: '1.5rem'}}>
                <strong>📋 Felder: {template.fields.length}</strong>
                <div style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem'}}>
                  {template.fields.slice(0, 3).map(field => field.label).join(', ')}
                  {template.fields.length > 3 && '...'}
                </div>
              </div>

              <div style={{display: 'flex', gap: '0.5rem'}}>
                <a href={`/templates/${template.id}`} className="btn" style={{flex: 1, fontSize: '0.875rem', textDecoration: 'none', textAlign: 'center'}}>
                  📝 Ausfüllen
                </a>
                <a href={`/templates/${template.id}`} className="btn btn-secondary" style={{fontSize: '0.875rem', textDecoration: 'none'}}>
                  👁️ Vorschau
                </a>
              </div>
            </div>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="card" style={{textAlign: 'center', padding: '3rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📋</div>
            <h3>Keine Templates verfügbar</h3>
            <p style={{color: '#6b7280'}}>
              Überprüfen Sie die Backend-Verbindung oder kontaktieren Sie den Administrator.
            </p>
          </div>
        )}
      </div>

      {/* Template-Kategorien Übersicht */}
      <div className="card" style={{marginTop: '3rem'}}>
        <h3 style={{marginBottom: '1.5rem'}}>📂 Template-Kategorien</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
          <div style={{padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #f59e0b'}}>
            <h4 style={{color: '#92400e', margin: '0 0 0.5rem 0'}}>⚡ Elektrotechnik</h4>
            <p style={{fontSize: '0.875rem', color: '#78350f', margin: 0}}>
              Verteilungslegenden, Klemmpläne, Prüfprotokolle
            </p>
          </div>
          <div style={{padding: '1rem', background: '#dbeafe', borderRadius: '0.5rem', border: '1px solid #3b82f6'}}>
            <h4 style={{color: '#1e40af', margin: '0 0 0.5rem 0'}}>📋 Dokumentation</h4>
            <p style={{fontSize: '0.875rem', color: '#1e3a8a', margin: 0}}>
              Mängelberichte, Projektdokumentation
            </p>
          </div>
          <div style={{padding: '1rem', background: '#f3e8ff', borderRadius: '0.5rem', border: '1px solid #8b5cf6'}}>
            <h4 style={{color: '#7c2d12', margin: '0 0 0.5rem 0'}}>🌐 Netzwerktechnik</h4>
            <p style={{fontSize: '0.875rem', color: '#581c87', margin: 0}}>
              Netzwerklegenden, Patchfeld-Dokumentation
            </p>
          </div>
        </div>
      </div>

      {/* Hilfe-Bereich */}
      <div className="card" style={{marginTop: '2rem', background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)', border: '1px solid #bbf7d0'}}>
        <h3 style={{color: '#065f46', marginBottom: '1rem'}}>💡 Verwendung der Templates</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
          <div>
            <h4 style={{color: '#047857', marginBottom: '0.5rem'}}>1. Template auswählen</h4>
            <p style={{fontSize: '0.875rem', color: '#065f46', margin: 0}}>
              Wählen Sie das passende Template für Ihre Elektrotechnik-Dokumentation aus.
            </p>
          </div>
          <div>
            <h4 style={{color: '#047857', marginBottom: '0.5rem'}}>2. Formular ausfüllen</h4>
            <p style={{fontSize: '0.875rem', color: '#065f46', margin: 0}}>
              Füllen Sie alle erforderlichen Felder aus. Wiederholbare Abschnitte können beliebig erweitert werden.
            </p>
          </div>
          <div>
            <h4 style={{color: '#047857', marginBottom: '0.5rem'}}>3. Speichern & Drucken</h4>
            <p style={{fontSize: '0.875rem', color: '#065f46', margin: 0}}>
              Speichern Sie das ausgefüllte Formular und drucken Sie es als PDF für Ihre Dokumentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}