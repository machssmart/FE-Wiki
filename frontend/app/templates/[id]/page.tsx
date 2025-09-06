'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface TemplateField {
  name: string
  type: string
  label: string
  required?: boolean
  placeholder?: string
  options?: string[]
  fields?: TemplateField[]
}

interface Template {
  id: string
  name: string
  category: string
  description: string
  icon: string
  fields: TemplateField[]
}

export default function TemplateDetailPage() {
  const params = useParams()
  const [template, setTemplate] = useState<Template | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3001/api/templates/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setTemplate(data)
        // Initialisiere Formulardaten
        const initialData: any = {}
        data.fields?.forEach((field: TemplateField) => {
          if (field.type === 'array') {
            initialData[field.name] = [{}]
          } else {
            initialData[field.name] = ''
          }
        })
        setFormData(initialData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Template API Error:', err)
        setLoading(false)
      })
  }, [params.id])

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleArrayAdd = (fieldName: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), {}]
    }))
  }

  const handleArrayRemove = (fieldName: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_: any, i: number) => i !== index)
    }))
  }

  const handleArrayItemChange = (fieldName: string, index: number, itemField: string, value: any) => {
    setFormData((prev: any) => {
      const newArray = [...(prev[fieldName] || [])]
      newArray[index] = { ...newArray[index], [itemField]: value }
      return { ...prev, [fieldName]: newArray }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📋 Formulardaten:', formData)
    alert('✅ Formular ausgefüllt! (Daten siehe Browser-Konsole)')
  }

  const handlePrint = () => {
    window.print()
  }

  const renderField = (field: TemplateField) => {
    const value = formData[field.name] || ''

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="form-input"
            required={field.required}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="form-input"
            required={field.required}
          />
        )

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="form-input"
            required={field.required}
          />
        )

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="form-textarea"
            required={field.required}
            rows={3}
          />
        )

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="form-select"
            required={field.required}
          >
            <option value="">Bitte wählen...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )

      case 'array':
        return (
          <div style={{border: '2px dashed #e5e7eb', borderRadius: '0.5rem', padding: '1rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
              <strong>{field.label}</strong>
              <button
                type="button"
                onClick={() => handleArrayAdd(field.name)}
                className="btn"
                style={{fontSize: '0.875rem'}}
              >
                + Hinzufügen
              </button>
            </div>
            
            {(formData[field.name] || []).map((item: any, index: number) => (
              <div key={index} style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem'}}>
                  <strong>Eintrag #{index + 1}</strong>
                  {formData[field.name].length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleArrayRemove(field.name, index)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      ✕ Entfernen
                    </button>
                  )}
                </div>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                  {field.fields?.map(subField => (
                    <div key={subField.name} className="form-field">
                      <label className="form-label">{subField.label}</label>
                      {subField.type === 'select' ? (
                        <select
                          value={item[subField.name] || ''}
                          onChange={(e) => handleArrayItemChange(field.name, index, subField.name, e.target.value)}
                          className="form-select"
                        >
                          <option value="">Wählen...</option>
                          {subField.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={subField.type}
                          value={item[subField.name] || ''}
                          onChange={(e) => handleArrayItemChange(field.name, index, subField.name, e.target.value)}
                          placeholder={subField.placeholder}
                          className="form-input"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return <div>Unbekannter Feldtyp: {field.type}</div>
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div>
          <div className="spinner"></div>
          <p style={{marginTop: '1rem', color: '#6b7280'}}>Lade Template...</p>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="container" style={{padding: '2rem 1rem'}}>
        <div className="card" style={{textAlign: 'center', padding: '3rem'}}>
          <h2>❌ Template nicht gefunden</h2>
          <p style={{color: '#6b7280', marginBottom: '2rem'}}>
            Das angeforderte Template existiert nicht.
          </p>
          <a href="/templates" className="btn">Zurück zu Templates</a>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{padding: '2rem 1rem'}}>
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h1 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0}}>
            {template.icon} {template.name}
          </h1>
          <p style={{color: '#6b7280', margin: '0.5rem 0'}}>
            {template.description}
          </p>
          <span className="badge badge-warning">{template.category}</span>
        </div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <a href="/templates" className="btn btn-secondary">← Zurück</a>
          <button onClick={handlePrint} className="btn btn-secondary no-print">🖨️ Drucken</button>
        </div>
      </div>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="template-form">
        <div style={{display: 'grid', gap: '1.5rem'}}>
          {template.fields.map(field => (
            <div key={field.name} className="form-field">
              <label className="form-label">
                {field.label}
                {field.required && <span style={{color: '#ef4444'}}>*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Submit-Buttons */}
        <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb'}} className="no-print">
          <button type="submit" className="btn" style={{flex: 1}}>
            ✅ Formular speichern
          </button>
          <button type="button" onClick={handlePrint} className="btn btn-secondary">
            🖨️ Als PDF drucken
          </button>
          <button type="button" onClick={() => setFormData({})} className="btn btn-secondary">
            🗑️ Zurücksetzen
          </button>
        </div>
      </form>

      {/* Entwickler-Info */}
      <div className="card no-print" style={{marginTop: '2rem', background: '#f3f4f6'}}>
        <h3>🛠️ Entwickler-Info</h3>
        <p>Formulardaten werden in der Browser-Konsole angezeigt. In der finalen Version würden diese an das Backend gesendet.</p>
        <details>
          <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>📊 Aktuelle Formulardaten anzeigen</summary>
          <pre style={{background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem'}}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  )
}