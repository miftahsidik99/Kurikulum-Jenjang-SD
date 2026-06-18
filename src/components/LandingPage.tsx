import { motion } from 'motion/react';
import { FileText, ChevronRight } from 'lucide-react';

interface Props {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full text-center space-y-8 bg-white p-12 rounded-3xl shadow-xl border border-slate-100"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
            <FileText className="text-white w-10 h-10" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Krurikulum Merdeka <br className="hidden md:block" />
            <span className="text-blue-600">Jenjang SD</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Berdasarkan BSKAP NOMOR 046/HKR/2025 Dan Permendikdasmen nomor 13 Tahun 2025
          </p>
        </div>

        <div className="pt-8 pb-4">
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 ease-in-out shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            Masuk Aplikasi
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-left md:text-sm text-xs text-slate-500 space-y-2 max-w-sm mx-auto">
          <p><span className="font-semibold text-slate-700">Pengembang Aplikasi:</span> Miftah Sidik</p>
          <p><span className="font-semibold text-slate-700">Penyusun:</span> Miftah Sidik</p>
          <p><span className="font-semibold text-slate-700">Instansi:</span> SDN Sukatinggal</p>
          <p><span className="font-semibold text-slate-700">NPSN:</span> 20206022</p>
          <p className="mt-4"><span className="font-semibold text-slate-700">Catatan:</span> Kode taksonomi Bloom dan ranah afektif/psikomotorik dipertahankan sesuai dokumen sumber.</p>
          <p className="mt-4 text-blue-600 font-medium tracking-wide">Sosial Media FB,TIKTOK,IG,YT : MIFTAHSIDIK99</p>
        </div>
      </motion.div>
    </div>
  );
}
