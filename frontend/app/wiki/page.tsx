'use client'

import { useState, useEffect } from 'react'

interface WikiArticle {
  id: string
  title: string
  category: string
  author: string
  created: string
  views: number
  tags: string[]
  content: string
}

export default function WikiPage() {
  const [articles, setArticles] = useState<WikiArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api/wiki')
      .then(r => r.json())
      .then(data => {
        setArticles(data.articles)
        setLoading(false)
      })
      .catch(err => {
        console.error('Wiki API Error:', err)
        setLoading(false)
      })
  }, [])

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Lade Wiki-Artikel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <div className="hero" style={{background: 'linear-gradient(135deg, #1e40af 0%, #10b981 100%)'}}>
        <h1>📚 FE-Wiki Artikel</h1>
        <p>Alle Elektrotechnik-Artikel und Anleitungen für Fockenbrock Elektrotechnik</p>
        
        {/* Suchfeld */}
        <div style={{marginTop: '2rem'}}>
          <input
            type="text"
            placeholder="🔍 Artikel, Kategorien oder Tags durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
      </div>

      {/* Kategorien-Filter */}
      <div className="card" style={{marginTop: '2rem'}}>
        <h3 style={{marginBottom: '1rem'}}>📂 Kategorien</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
          {[...new Set(articles.map(a => a.category))].map(category => (
            <button
              key={category}
              onClick={() => setSearchTerm(category)}
              className="btn"
              style={{
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                background: searchTerm === category ? '#1e40af' : '#e5e7eb',
                color: searchTerm === category ? 'white' : '#374151'
              }}
            >
              {category} ({articles.filter(a => a.category === category).length})
            </button>
          ))}
          <button
            onClick={() => setSearchTerm('')}
            className="btn btn-secondary"
            style={{fontSize: '0.875rem', padding: '0.5rem 1rem'}}
          >
            Alle anzeigen
          </button>
        </div>
      </div>

      {/* Artikel-Liste */}
      <div style={{marginTop: '2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h2>Gefundene Artikel: {filteredArticles.length}</h2>
          <button className="btn" style={{fontSize: '0.875rem'}}>
            + Neuer Artikel
          </button>
        </div>

        <div style={{display: 'grid', gap: '1.5rem'}}>
          {filteredArticles.map(article => (
            <div key={article.id} className="card hover-lift" style={{cursor: 'pointer'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0}}>
                  {article.title}
                </h3>
                <span className="badge badge-info">
                  👁️ {article.views} Aufrufe
                </span>
              </div>

              <div style={{marginBottom: '1rem'}}>
                <span style={{
                  background: getCategoryColor(article.category),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {article.category}
                </span>
              </div>

              <div style={{color: '#4b5563', marginBottom: '1rem', lineHeight: '1.6'}}>
                {article.content.substring(0, 200)}...
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem'}}>
                {article.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div style={{fontSize: '0.875rem', color: '#6b7280', display: 'flex', justifyContent: 'space-between'}}>
                <span>📝 Von <strong>{article.author}</strong></span>
                <span>📅 {new Date(article.created).toLocaleDateString('de-DE')}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="card" style={{textAlign: 'center', padding: '3rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔍</div>
            <h3>Keine Artikel gefunden</h3>
            <p style={{color: '#6b7280'}}>
              Versuchen Sie andere Suchbegriffe oder <button onClick={() => setSearchTerm('')} style={{color: '#2563eb', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer'}}>alle Artikel anzeigen</button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Gebäudeautomation': return '#3b82f6'
    case 'Erneuerbare Energien': return '#10b981'
    case 'Elektrotechnik': return '#f59e0b'
    case 'Cloud & Netzwerktechnik': return '#8b5cf6'
    default: return '#6b7280'
  }
}