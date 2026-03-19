import React, { useState } from 'react';

const defaultPresets = ['#ff0055', '#7c3aed', '#06b6d4', '#f59e0b', '#10b981'];

export default function ColorPresets({ matrixColor, setMatrixColor }) {
  const [presets, setPresets] = useState(defaultPresets);
  const [newColor, setNewColor] = useState('');

  const savePreset = (color) => {
    if (!color) return;
    setPresets((p) => [color, ...p.slice(0, 8)]);
  };

  return (
    <div className="p-4 border rounded border-[#3b2b5a] bg-transparent">
      <h3 className="font-primary text-sm mb-4">Color Matrix Presets</h3>
      <div className="flex items-center gap-3 mb-3">
        <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="w-12 h-8 p-0 border-0" />
        <button onClick={() => { savePreset(newColor); setNewColor(''); }} className="bg-accent text-white px-3 py-2 rounded">Save Preset</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {presets.map((c) => (
          <button key={c} onClick={() => setMatrixColor({ hex: c })} title={c} className="w-10 h-10 rounded" style={{ backgroundColor: c, boxShadow: matrixColor.hex === c ? `0 0 10px ${c}` : 'none' }} />
        ))}
      </div>
    </div>
  );
}
