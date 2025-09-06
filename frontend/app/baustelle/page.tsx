export default function BaustellePage() {
  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      <div className="hero" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
        <h1>🏗️ Baustellen-Management</h1>
        <p>Projektdokumentation und Datei-Upload für Elektrotechnik-Projekte</p>
      </div>

      <div className="card" style={{marginTop: '2rem', textAlign: 'center', padding: '3rem'}}>
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🚧</div>
        <h2>In Entwicklung</h2>
        <p style={{color: '#6b7280', marginBottom: '2rem'}}>
          Diese Seite wird bald verfügbar sein mit Upload-Funktionen für Baustellen-Dokumentation.
        </p>
        <button className="btn">Zurück zur Startseite</button>
      </div>
    </div>
  )
}