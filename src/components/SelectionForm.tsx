import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Layers, Target, ChevronRight, ArrowLeft } from 'lucide-react';
import { SelectionData } from '../types';
import { mapelOptions, getFaseByKelas } from '../data/kurikulum';

interface Props {
  initialData?: SelectionData;
  onSave: (data: SelectionData) => void;
  onBack: () => void;
}

export default function SelectionForm({ initialData, onSave, onBack }: Props) {
  const [formData, setFormData] = useState<SelectionData>({
    fase: initialData?.fase || 'A',
    kelas: initialData?.kelas || '1',
    mapel: initialData?.mapel || mapelOptions[0],
  });

  // Auto-update Fase based on Kelas selection, though user can still freely select
  useEffect(() => {
    const calculatedFase = getFaseByKelas(formData.kelas);
    if (calculatedFase && calculatedFase !== formData.fase) {
      setFormData(prev => ({ ...prev, fase: calculatedFase }));
    }
  }, [formData.kelas]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Pilih Dokumen</h2>
          <p className="text-indigo-100 mt-1">Tentukan detail kurikulum yang ingin dicetak.</p>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Kembali ke Identitas">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-indigo-500" /> Mata Pelajaran
          </label>
          <select
            name="mapel"
            value={formData.mapel}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50"
          >
            {mapelOptions.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
              <Layers className="w-4 h-4 mr-2 text-indigo-500" /> Kelas
            </label>
            <select
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50"
            >
              {[1, 2, 3, 4, 5, 6].map(k => (
                <option key={k} value={k.toString()}>Kelas {k}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center">
              <Target className="w-4 h-4 mr-2 text-indigo-500" /> Fase
            </label>
            <select
              name="fase"
              value={formData.fase}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50"
            >
              <option value="A">Fase A</option>
              <option value="B">Fase B</option>
              <option value="C">Fase C</option>
            </select>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
          >
            Tampilkan Dokumen
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>

      </form>
    </motion.div>
  );
}
