import { useState } from 'react';
import { ContentBlock, MoleculeData } from '../../types/curriculum';
import { MoleculeDesigner } from './MoleculeDesigner';
import { Image, Type, Atom, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, onChange }: Props) {
  const handleAddBlock = (type: 'text' | 'image' | 'molecule') => {
    const newBlock: ContentBlock = {
      id: crypto.randomUUID(),
      type,
    };
    
    if (type === 'text') newBlock.text = '';
    if (type === 'image') {
      newBlock.imageUrl = '';
      newBlock.imageAlign = 'center';
    }
    if (type === 'molecule') {
      newBlock.molecule = { name: 'Yeni', formula: 'X', atoms: [], bonds: [] };
    }
    
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (idx: number, updated: ContentBlock) => {
    const newBlocks = [...blocks];
    newBlocks[idx] = updated;
    onChange(newBlocks);
  };

  const removeBlock = (idx: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(idx, 1);
    onChange(newBlocks);
  };

  const moveBlock = (idx: number, dir: 1 | -1) => {
    if (idx + dir < 0 || idx + dir >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[idx];
    newBlocks[idx] = newBlocks[idx + dir];
    newBlocks[idx + dir] = temp;
    onChange(newBlocks);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-6">
        <button onClick={() => handleAddBlock('text')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 text-sm">
          <Type className="w-4 h-4" /> Metin Ekle
        </button>
        <button onClick={() => handleAddBlock('image')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 text-sm">
          <Image className="w-4 h-4" /> Resim Ekle
        </button>
        <button onClick={() => handleAddBlock('molecule')} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 text-sm">
          <Atom className="w-4 h-4" /> 3D Molekül Ekle
        </button>
      </div>

      <div className="space-y-6">
        {blocks.map((block, idx) => (
          <div key={block.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative group">
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded disabled:opacity-50">
                <ArrowUp className="w-4 h-4" />
              </button>
              <button onClick={() => moveBlock(idx, 1)} disabled={idx === blocks.length - 1} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded disabled:opacity-50">
                <ArrowDown className="w-4 h-4" />
              </button>
              <button onClick={() => removeBlock(idx)} className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-2 text-xs font-semibold text-slate-500 uppercase">
              {block.type === 'text' ? 'Metin Bloğu' : block.type === 'image' ? 'Resim Bloğu' : '3D Molekül Bloğu'}
            </div>

            {block.type === 'text' && (
              <textarea 
                value={block.text || ''}
                onChange={(e) => updateBlock(idx, { ...block, text: e.target.value })}
                rows={4}
                placeholder="Metin içeriği... (**kalın** yapmak için yıldız kullanın)"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 resize-y"
              />
            )}

            {block.type === 'image' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Resim Yükle veya URL Gir</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={block.imageUrl || ''}
                      onChange={(e) => updateBlock(idx, { ...block, imageUrl: e.target.value })}
                      placeholder="https://... veya Base64"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center whitespace-nowrap">
                      <span>Dosya Seç</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateBlock(idx, { ...block, imageUrl: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Resmi bilgisayarınızdan seçebilir veya web üzerindeki bir resmin bağlantısını yapıştırabilirsiniz.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Hizalama</label>
                  <select 
                    value={block.imageAlign || 'center'}
                    onChange={(e) => updateBlock(idx, { ...block, imageAlign: e.target.value as any })}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="left">Sola Hizala</option>
                    <option value="center">Ortala</option>
                    <option value="right">Sağa Hizala</option>
                  </select>
                </div>
                {block.imageUrl && (
                  <div className={`flex ${block.imageAlign === 'left' ? 'justify-start' : block.imageAlign === 'right' ? 'justify-end' : 'justify-center'}`}>
                    <img src={block.imageUrl} alt="Önizleme" className="max-h-48 rounded-lg border border-slate-700" referrerPolicy="no-referrer" />
                  </div>
                )}
              </div>
            )}

            {block.type === 'molecule' && block.molecule && (
              <MoleculeDesigner 
                model={block.molecule} 
                onChange={(m) => updateBlock(idx, { ...block, molecule: m })} 
              />
            )}
          </div>
        ))}
        {blocks.length === 0 && (
          <div className="text-center py-8 text-slate-500 border border-dashed border-slate-700 rounded-xl">
            Henüz içerik bloğu eklenmemiş. Yukarıdaki butonları kullanarak içerik ekleyin.
          </div>
        )}
      </div>
    </div>
  );
}
