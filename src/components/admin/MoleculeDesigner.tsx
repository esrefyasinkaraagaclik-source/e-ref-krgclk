import { useState } from 'react';
import { MoleculeData, AtomData, BondData } from '../../types/curriculum';
import { MoleculeViewer } from '../MoleculeViewer';

interface Props {
  model: MoleculeData;
  onChange: (model: MoleculeData) => void;
}

export function MoleculeDesigner({ model, onChange }: Props) {
  const [newAtom, setNewAtom] = useState<AtomData>({ element: 'C', position: [0, 0, 0] });
  const [newBond, setNewBond] = useState<{ startIdx: number; endIdx: number }>({ startIdx: 0, endIdx: 1 });

  const handleAddAtom = () => {
    onChange({
      ...model,
      atoms: [...model.atoms, newAtom]
    });
    setNewAtom({ element: 'C', position: [0, 0, 0] });
  };

  const handleAddBond = () => {
    if (newBond.startIdx >= model.atoms.length || newBond.endIdx >= model.atoms.length) return;
    if (newBond.startIdx === newBond.endIdx) return;

    const startAtom = model.atoms[newBond.startIdx];
    const endAtom = model.atoms[newBond.endIdx];

    onChange({
      ...model,
      bonds: [...model.bonds, { start: startAtom.position, end: endAtom.position }]
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Molekül Adı</label>
          <input 
            type="text" 
            value={model.name}
            onChange={(e) => onChange({...model, name: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Formül</label>
          <input 
            type="text" 
            value={model.formula}
            onChange={(e) => onChange({...model, formula: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Atoms */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h5 className="text-white font-medium mb-4">Atomlar</h5>
            <div className="space-y-2 mb-4">
              {model.atoms.map((atom, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                  <span>{idx}: {atom.element} ({atom.position.join(', ')})</span>
                  <button 
                    onClick={() => {
                      const newAtoms = [...model.atoms];
                      newAtoms.splice(idx, 1);
                      onChange({...model, atoms: newAtoms});
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-end">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Element</label>
                <select 
                  value={newAtom.element}
                  onChange={(e) => setNewAtom({...newAtom, element: e.target.value})}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="H">H (Beyaz)</option>
                  <option value="C">C (Siyah)</option>
                  <option value="O">O (Kırmızı)</option>
                  <option value="N">N (Mavi)</option>
                  <option value="Cl">Cl (Yeşil)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">X</label>
                <input type="number" step="0.1" value={newAtom.position[0]} onChange={(e) => setNewAtom({...newAtom, position: [Number(e.target.value), newAtom.position[1], newAtom.position[2]]})} className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Y</label>
                <input type="number" step="0.1" value={newAtom.position[1]} onChange={(e) => setNewAtom({...newAtom, position: [newAtom.position[0], Number(e.target.value), newAtom.position[2]]})} className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Z</label>
                <input type="number" step="0.1" value={newAtom.position[2]} onChange={(e) => setNewAtom({...newAtom, position: [newAtom.position[0], newAtom.position[1], Number(e.target.value)]})} className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <button onClick={handleAddAtom} className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm">Ekle</button>
            </div>
          </div>

          {/* Bonds */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
            <h5 className="text-white font-medium mb-4">Bağlar</h5>
            <div className="space-y-2 mb-4">
              {model.bonds.map((bond, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm text-slate-300 bg-slate-800/50 p-2 rounded">
                  <span>Bağ {idx + 1}</span>
                  <button 
                    onClick={() => {
                      const newBonds = [...model.bonds];
                      newBonds.splice(idx, 1);
                      onChange({...model, bonds: newBonds});
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-end">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Başlangıç Atom (İndeks)</label>
                <input type="number" min="0" value={newBond.startIdx} onChange={(e) => setNewBond({...newBond, startIdx: Number(e.target.value)})} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Bitiş Atom (İndeks)</label>
                <input type="number" min="0" value={newBond.endIdx} onChange={(e) => setNewBond({...newBond, endIdx: Number(e.target.value)})} className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <button onClick={handleAddBond} className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm">Ekle</button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <h5 className="text-white font-medium mb-4">Önizleme</h5>
          <MoleculeViewer model={model} />
        </div>
      </div>
    </div>
  );
}
