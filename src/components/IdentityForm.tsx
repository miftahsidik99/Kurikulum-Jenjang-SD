import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Building2, MapPin, Hash, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { IdentityData } from '../types';

interface Props {
  initialData?: IdentityData;
  onSave: (data: IdentityData) => void;
}

export default function IdentityForm({ initialData, onSave }: Props) {
  const [formData, setFormData] = useState<IdentityData>({
    namaGuru: initialData?.namaGuru || '',
    nip: initialData?.nip || '',
    jenisGuru: initialData?.jenisGuru || '',
    namaSekolah: initialData?.namaSekolah || '',
    npsn: initialData?.npsn || '',
    tahunPelajaran: initialData?.tahunPelajaran || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div className="bg-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold">Identitas Pegawai & Instansi</h2>
        <p className="text-blue-100 mt-1">Silakan lengkapi data berikut sebelum melanjutkan.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" /> Data Guru
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
              <input
                required
                type="text"
                name="namaGuru"
                value={formData.namaGuru}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Misal: Budi Santoso, S.Pd."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">NIP</label>
              <input
                type="text"
                name="nip"
                value={formData.nip}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Kosongkan jika tidak ada"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Jenis Guru</label>
              <input
                required
                type="text"
                name="jenisGuru"
                value={formData.jenisGuru}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Misal: Guru Kelas, Guru PAI, dll"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-500" /> Data Instansi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Sekolah</label>
              <input
                required
                type="text"
                name="namaSekolah"
                value={formData.namaSekolah}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Misal: SDN 1 Nusantara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">NPSN</label>
              <input
                required
                type="text"
                name="npsn"
                value={formData.npsn}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Nomor Pokok Sekolah Nasional"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tahun Pelajaran</label>
              <input
                required
                type="text"
                name="tahunPelajaran"
                value={formData.tahunPelajaran}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Misal: 2024/2025"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            Simpan & Lanjutkan
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
