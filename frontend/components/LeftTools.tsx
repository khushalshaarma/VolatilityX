import React from 'react'

const TOOLS = ['＋','✚','✏','🔍','📏','🖊','📐','⌚','🗑']

export default function LeftTools() {
  return (
    <div className="tv-left-toolbar card p-2">
      {TOOLS.map((t, i) => (
        <button key={i} className="tv-tool-btn" title={`Tool ${i}`}>
          <span className="text-lg">{t}</span>
        </button>
      ))}
    </div>
  )
}
