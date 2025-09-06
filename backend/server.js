const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 FE-Wiki Backend für Fockenbrock Elektrotechnik wird gestartet...');

// Demo-Daten für Wiki-Artikel
const wikiArticles = [
  {
    id: '1',
    title: 'KNX Grundlagen',
    category: 'Gebäudeautomation',
    content: `# KNX Grundlagen

## Was ist KNX?
KNX ist ein offener Standard für die Gebäudeautomation, der eine intelligente Vernetzung von Gebäudetechnik ermöglicht.

## Wichtige Komponenten
- **Busleitung**: 2-adriges Kabel für Datenübertragung und Spannungsversorgung
- **Busteilnehmer**: Sensoren, Aktoren und Systemgeräte
- **Topologie**: Linie, Bereich und Hauptlinie

## Installation
1. Planung der Bustopologie
2. Verlegung der Busleitung
3. Konfiguration der Teilnehmer
4. Inbetriebnahme mit ETS Software

## Tipps für die Praxis
- Immer mit ETS arbeiten
- Busleitung getrennt von 230V verlegen
- Abschlusswiderstände nicht vergessen`,
    author: 'Admin',
    created: '2024-01-15',
    tags: ['knx', 'grundlagen', 'gebäudeautomation'],
    views: 156
  },
  {
    id: '2',
    title: 'Photovoltaik Installation',
    category: 'Erneuerbare Energien', 
    content: `# Photovoltaik Installation

## Planungsschritte
1. Dachstatik prüfen
2. Verschattungsanalyse
3. Modulauswahl und Layout
4. Wechselrichter dimensionieren

## Installation
- Montagesystem befestigen
- Module verkabeln (Reihenschaltung)
- DC-Verkabelung zum Wechselrichter
- AC-seitige Anbindung

## Wichtige Normen
- DIN VDE 0100-712
- DIN EN 62446-1`,
    author: 'Editor',
    created: '2024-01-20',
    tags: ['photovoltaik', 'installation', 'solar'],
    views: 89
  },
  {
    id: '3',
    title: 'Loxone Miniserver Konfiguration',
    category: 'Gebäudeautomation',
    content: `# Loxone Miniserver Setup

## Erste Schritte
1. Loxone Config herunterladen
2. Miniserver im Netzwerk finden
3. Grundkonfiguration erstellen

## Wichtige Funktionsblöcke
- Beleuchtungssteuerung
- Jalousiesteuerung
- Heizungsregelung
- Sicherheitsfunktionen`,
    author: 'Editor', 
    created: '2024-01-25',
    tags: ['loxone', 'smart-home', 'konfiguration'],
    views: 203
  }
];

// Demo-Benutzer für Login
const users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrator',
    email: 'admin@fockenbrock.de',
    role: 'admin',
    active: true,
    avatar: null
  },
  {
    id: '2',
    username: 'editor',
    password: 'editor123', 
    name: 'Editor User',
    email: 'editor@fockenbrock.de',
    role: 'editor',
    active: true,
    avatar: null
  },
  {
    id: '3',
    username: 'kunde',
    password: 'kunde123',
    name: 'Kunde Mustermann',
    email: 'kunde@example.com',
    role: 'customer',
    active: true,
    avatar: null
  }
];

// Elektrotechnik-Templates
const elektroTemplates = [
  {
    id: 'verteilungslegende',
    name: 'Verteilungslegende',
    category: 'Elektrotechnik',
    description: 'Dokumentation von Anlagenkomponenten in Verteilerschränken',
    icon: '⚡',
    fields: [
      { name: 'projekt', type: 'text', label: 'Projektname', required: true, placeholder: 'z.B. Neubau Bürogebäude' },
      { name: 'anlage', type: 'text', label: 'Anlage/Verteiler', required: true, placeholder: 'z.B. UV-EG-01' },
      { name: 'stand', type: 'date', label: 'Stand (Datum)', required: true },
      { name: 'seite', type: 'text', label: 'Seite', placeholder: '1 von 3' },
      { 
        name: 'komponenten', 
        type: 'array', 
        label: 'Komponenten',
        fields: [
          { name: 'bezeichnung', type: 'text', label: 'Bezeichnung', placeholder: 'z.B. Hauptschalter' },
          { name: 'typ', type: 'text', label: 'Typ', placeholder: 'z.B. Hager HIM306' },
          { name: 'polig', type: 'number', label: 'Polig', placeholder: '3' },
          { name: 'ampere', type: 'number', label: 'Ampere', placeholder: '63' },
          { name: 'bemerkung', type: 'text', label: 'Bemerkung', placeholder: 'Optional' }
        ]
      }
    ]
  },
  {
    id: 'pruefprotokoll',
    name: 'Prüfprotokoll',
    category: 'Elektrotechnik',
    description: 'Elektrische Messungen und Abnahmeprüfungen dokumentieren',
    icon: '📋',
    fields: [
      { name: 'objekt', type: 'text', label: 'Objekt', required: true, placeholder: 'Gebäude/Anlage' },
      { name: 'auftraggeber', type: 'text', label: 'Auftraggeber', required: true },
      { name: 'pruefdatum', type: 'date', label: 'Prüfdatum', required: true },
      { name: 'pruefer', type: 'text', label: 'Prüfer', required: true, placeholder: 'Name des Elektrofachkraft' },
      { 
        name: 'messungen', 
        type: 'array', 
        label: 'Messungen',
        fields: [
          { name: 'messpunkt', type: 'text', label: 'Messpunkt', placeholder: 'z.B. L1-N' },
          { name: 'messwert', type: 'number', label: 'Messwert', step: '0.01' },
          { name: 'sollwert', type: 'number', label: 'Sollwert', step: '0.01' },
          { name: 'einheit', type: 'text', label: 'Einheit', placeholder: 'V, A, Ω, kΩ' },
          { name: 'ergebnis', type: 'select', label: 'Ergebnis', options: ['OK', 'NOK', 'Grenzwertig'] }
        ]
      }
    ]
  },
  {
    id: 'maengelbericht',
    name: 'Mängelbericht',
    category: 'Dokumentation',
    description: 'Dokumentation von Fehlern und erforderlichen Nacharbeiten',
    icon: '⚠️',
    fields: [
      { name: 'datum', type: 'date', label: 'Datum', required: true },
      { name: 'kunde', type: 'text', label: 'Kunde', required: true },
      { name: 'objekt', type: 'text', label: 'Objekt', required: true },
      { name: 'pruefer', type: 'text', label: 'Prüfer', required: true },
      { 
        name: 'maengel', 
        type: 'array', 
        label: 'Mängel',
        fields: [
          { name: 'was', type: 'text', label: 'Was', placeholder: 'Art des Mangels' },
          { name: 'wo', type: 'text', label: 'Wo', placeholder: 'Ort/Position' },
          { name: 'mangel', type: 'textarea', label: 'Mangelbeschreibung', rows: 3 },
          { name: 'material', type: 'text', label: 'Benötigtes Material' },
          { name: 'prioritaet', type: 'select', label: 'Priorität', options: ['niedrig', 'mittel', 'hoch'] }
        ]
      }
    ]
  }
];

// Baustellen-Demo-Daten
const baustellenEntries = [
  {
    id: '1',
    title: 'Neubau Bürogebäude Musterstraße',
    customer: 'Mustermann GmbH',
    address: 'Musterstraße 456, 48149 Münster',
    gps: '51.9607,7.6261',
    description: 'Komplette Elektroinstallation für Neubau mit KNX-System und Photovoltaikanlage',
    createdBy: 'Admin',
    createdAt: '2024-01-10',
    files: []
  }
];

// API Routes

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 FE-Wiki API für Fockenbrock Elektrotechnik',
    version: '1.0.0',
    status: 'online',
    endpoints: [
      'GET /api/wiki - Alle Wiki-Artikel',
      'GET /api/wiki/:id - Einzelner Artikel',
      'GET /api/templates - Elektrotechnik-Templates',
      'GET /api/templates/:id - Einzelnes Template',
      'GET /api/stats - Statistiken',
      'POST /api/auth/login - Benutzer-Anmeldung',
      'GET /api/baustelle - Baustellen-Übersicht'
    ],
    company: 'Fockenbrock Elektrotechnik',
    lastUpdated: new Date().toISOString()
  });
});

// Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log(`🔐 Login-Versuch: ${username}`);
  
  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Benutzername und Passwort sind erforderlich' 
    });
  }

  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    if (!user.active) {
      return res.status(401).json({ 
        message: 'Benutzer ist deaktiviert' 
      });
    }

    const { password, ...userWithoutPassword } = user;
    
    console.log(`✅ Login erfolgreich: ${user.name} (${user.role})`);
    
    res.json({
      access_token: `demo-token-${user.id}-${Date.now()}`,
      user: userWithoutPassword,
      message: 'Anmeldung erfolgreich'
    });
  } else {
    console.log(`❌ Login fehlgeschlagen: ${username}`);
    res.status(401).json({ 
      message: 'Ungültige Anmeldedaten' 
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Erfolgreich abgemeldet' });
});

// Wiki Routes
app.get('/api/wiki', (req, res) => {
  res.json({
    message: 'Wiki-Artikel für Fockenbrock Elektrotechnik',
    articles: wikiArticles,
    count: wikiArticles.length,
    categories: [...new Set(wikiArticles.map(a => a.category))]
  });
});

app.get('/api/wiki/:id', (req, res) => {
  const article = wikiArticles.find(a => a.id === req.params.id);
  if (article) {
    // Views erhöhen
    article.views++;
    res.json(article);
  } else {
    res.status(404).json({ error: 'Artikel nicht gefunden' });
  }
});

app.post('/api/wiki', (req, res) => {
  const newArticle = {
    id: (wikiArticles.length + 1).toString(),
    ...req.body,
    created: new Date().toISOString(),
    author: 'Current User',
    views: 0
  };
  wikiArticles.push(newArticle);
  res.status(201).json({ 
    message: 'Artikel erfolgreich erstellt', 
    article: newArticle 
  });
});

// Template Routes
app.get('/api/templates', (req, res) => {
  res.json({
    message: 'Elektrotechnik-Templates für Fockenbrock Elektrotechnik',
    templates: elektroTemplates,
    count: elektroTemplates.length
  });
});

app.get('/api/templates/:id', (req, res) => {
  const template = elektroTemplates.find(t => t.id === req.params.id);
  res.json(template || { error: 'Template nicht gefunden' });
});

// Baustelle Routes
app.get('/api/baustelle', (req, res) => {
  res.json({
    message: 'Baustellen für Fockenbrock Elektrotechnik',
    entries: baustellenEntries,
    count: baustellenEntries.length
  });
});

app.get('/api/baustelle/:id', (req, res) => {
  const entry = baustellenEntries.find(b => b.id === req.params.id);
  res.json(entry || { error: 'Baustelle nicht gefunden' });
});

app.post('/api/baustelle', (req, res) => {
  const newEntry = {
    id: (baustellenEntries.length + 1).toString(),
    ...req.body,
    createdBy: 'Current User',
    createdAt: new Date().toISOString(),
    files: []
  };
  baustellenEntries.push(newEntry);
  res.status(201).json({ 
    message: 'Baustelle erfolgreich erstellt', 
    entry: newEntry 
  });
});

// Stats Route
app.get('/api/stats', (req, res) => {
  res.json({
    totalArticles: wikiArticles.length,
    totalTemplates: elektroTemplates.length,
    totalViews: wikiArticles.reduce((sum, a) => sum + a.views, 0),
    categories: [...new Set(wikiArticles.map(a => a.category))].length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.active).length,
    totalBaustellen: baustellenEntries.length,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    company: 'Fockenbrock Elektrotechnik'
  });
});

// User Routes (für Admin)
app.get('/api/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({
    message: 'Benutzer-Übersicht',
    users: usersWithoutPasswords,
    count: users.length
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});


// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({
    error: 'Interner Server-Fehler',
    message: err.message
  });
});

// 404 Handler 
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint nicht gefunden',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/wiki',
      'GET /api/templates', 
      'GET /api/stats',
      'POST /api/auth/login',
      'GET /api/baustelle'
    ]
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('✅ FE-Wiki API läuft erfolgreich!');
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📚 Wiki: http://localhost:${PORT}/api/wiki`);
  console.log(`🔧 Templates: http://localhost:${PORT}/api/templates`);
  console.log(`📊 Stats: http://localhost:${PORT}/api/stats`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log('');
  console.log('👥 Demo-Accounts:');
  console.log('   👨‍💼 Admin: admin / admin123');
  console.log('   ✏️ Editor: editor / editor123');
  console.log('   👤 Kunde: kunde / kunde123');
  console.log('');
  console.log('🎯 Ready für Frontend-Verbindung!');
});