// Debug Component to check CSS loading
import { useEffect, useState } from 'react'

export function DebugCSS() {
  const [cssInfo, setCssInfo] = useState({
    stylesheets: [],
    computedStyles: {},
    tailwindLoaded: false,
    customCSSLoaded: false
  })

  useEffect(() => {
    // Check all loaded stylesheets
    const sheets = Array.from(document.styleSheets).map(sheet => ({
      href: sheet.href || 'inline',
      rules: sheet.cssRules ? sheet.cssRules.length : 0,
      disabled: sheet.disabled
    }))

    // Check computed styles
    const bodyStyles = window.getComputedStyle(document.body)
    const rootStyles = window.getComputedStyle(document.documentElement)

    // Check if Tailwind classes work
    const testDiv = document.createElement('div')
    testDiv.className = 'bg-red-500'
    document.body.appendChild(testDiv)
    const testStyles = window.getComputedStyle(testDiv)
    const tailwindWorks = testStyles.backgroundColor === 'rgb(239, 68, 68)' || 
                         testStyles.backgroundColor === 'rgb(220, 38, 38)'
    document.body.removeChild(testDiv)

    setCssInfo({
      stylesheets: sheets,
      computedStyles: {
        bodyBg: bodyStyles.backgroundColor,
        bodyColor: bodyStyles.color,
        rootBg: rootStyles.backgroundColor,
        htmlClass: document.documentElement.className
      },
      tailwindLoaded: tailwindWorks,
      customCSSLoaded: sheets.some(s => s.href && s.href.includes('index'))
    })
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      background: '#1a1a1a',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 9999,
      border: '2px solid #dc2626',
      fontFamily: 'monospace',
      fontSize: '12px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#dc2626' }}>🔍 CSS Debug Info</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Status:</strong>
        <div>✅ Tailwind: {cssInfo.tailwindLoaded ? 'Loaded' : '❌ Not Loaded'}</div>
        <div>✅ Custom CSS: {cssInfo.customCSSLoaded ? 'Loaded' : '❌ Not Loaded'}</div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Computed Styles:</strong>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{JSON.stringify(cssInfo.computedStyles, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Loaded Stylesheets ({cssInfo.stylesheets.length}):</strong>
        {cssInfo.stylesheets.map((sheet, i) => (
          <div key={i} style={{ fontSize: '11px', marginTop: '5px' }}>
            {sheet.href || 'Inline'} ({sheet.rules} rules)
          </div>
        ))}
      </div>

      <button 
        onClick={() => window.location.reload(true)}
        style={{
          background: '#dc2626',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Force Reload
      </button>
    </div>
  )
}