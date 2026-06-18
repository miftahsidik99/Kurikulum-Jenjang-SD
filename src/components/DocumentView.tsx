import { motion } from 'motion/react';
import { Download, ArrowLeft, FileX } from 'lucide-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { IdentityData, SelectionData } from '../types';
import { kurikulumData } from '../data/kurikulum';

interface Props {
  identity: IdentityData;
  selection: SelectionData;
  onBack: () => void;
}

export default function DocumentView({ identity, selection, onBack }: Props) {
  const dataForClass = kurikulumData[selection.kelas];
  const items = dataForClass ? dataForClass[selection.mapel] || [] : [];

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dokumen Kurikulum');

    // Custom headers configuration to match previous layout
    worksheet.getCell('A1').value = 'Instansi SD';
    worksheet.getCell('B1').value = `: ${identity.namaSekolah}`;
    worksheet.getCell('A2').value = 'Nama Guru';
    worksheet.getCell('B2').value = `: ${identity.namaGuru}`;
    worksheet.getCell('A3').value = 'Nip';
    worksheet.getCell('B3').value = `: ${identity.nip}`;
    worksheet.getCell('A4').value = 'Jenis guru';
    worksheet.getCell('B4').value = `: ${identity.jenisGuru}`;
    worksheet.getCell('A5').value = 'Fase';
    worksheet.getCell('B5').value = `: ${selection.fase}`;
    worksheet.getCell('A6').value = 'Kelas';
    worksheet.getCell('B6').value = `: ${selection.kelas}`;
    worksheet.getCell('A7').value = 'Tahun Pelajaran';
    worksheet.getCell('B7').value = `: ${identity.tahunPelajaran}`;
    worksheet.getCell('A8').value = 'Mata Pelajaran';
    worksheet.getCell('B8').value = `: ${selection.mapel}`;

    worksheet.getCell('A10').value = `Kelas ${selection.kelas}`;

    // Table Headers
    const headerRowIdx = 12;
    const headers = ['Mata Pelajaran', 'Elemen', 'Capaian Pembelajaran (CP)', 'Tujuan Pembelajaran (TP)'];
    const headerRow = worksheet.getRow(headerRowIdx);
    
    headers.forEach((headerText, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = headerText;
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF92D050' } // Green header
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Column widths
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 60;
    worksheet.getColumn(4).width = 60;

    let currentRowIdx = 13;
    const startMapelRowIdx = currentRowIdx;

    items.forEach(item => {
      const tpCount = item.tp.length;
      const startItemRowIdx = currentRowIdx;

      item.tp.forEach((tpStr, idx) => {
        const row = worksheet.getRow(currentRowIdx);
        if (idx === 0) {
          row.getCell(1).value = selection.mapel;
          row.getCell(2).value = item.elemen;
          row.getCell(3).value = item.cp;
          row.getCell(4).value = tpStr;
        } else {
          row.getCell(4).value = tpStr;
        }

        // TP Cell border and alignment
        const tpCell = row.getCell(4);
        tpCell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        tpCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

        // Other cells borders and alignment
        [1, 2, 3].forEach(colIdx => {
          const cell = row.getCell(colIdx);
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        });

        currentRowIdx++;
      });

      if (tpCount > 1) {
        worksheet.mergeCells(startItemRowIdx, 2, currentRowIdx - 1, 2);
        worksheet.mergeCells(startItemRowIdx, 3, currentRowIdx - 1, 3);
      }
    });

    if (currentRowIdx > startMapelRowIdx) {
      if (currentRowIdx - startMapelRowIdx > 1) {
        worksheet.mergeCells(startMapelRowIdx, 1, currentRowIdx - 1, 1);
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Kurikulum_${identity.namaGuru.replace(/\s+/g, '_')}_Kls${selection.kelas}_${selection.mapel}.xlsx`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto bg-white rounded-b-lg shadow-sm border border-slate-200"
    >
      <div className="bg-slate-50 border-b border-slate-200 p-4 sticky top-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-t-lg z-10">
        <button onClick={onBack} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali Edit
        </button>
        {items.length > 0 && (
          <button 
            onClick={handleExportExcel}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" /> Export Excel
          </button>
        )}
      </div>

      <div className="p-8">
        {/* Header Preview (Matches Excel output) */}
        <div className="mb-10 text-slate-800 font-sans grid grid-cols-[150px_1fr] gap-y-2 text-sm leading-relaxed max-w-2xl">
          <div className="font-bold">Instansi SD</div><div>: {identity.namaSekolah}</div>
          <div className="font-bold">Nama Guru</div><div>: {identity.namaGuru}</div>
          <div className="font-bold">Nip</div><div>: {identity.nip}</div>
          <div className="font-bold">Jenis guru</div><div>: {identity.jenisGuru}</div>
          <div className="font-bold">Fase</div><div>: {selection.fase}</div>
          <div className="font-bold">Kelas</div><div>: {selection.kelas}</div>
          <div className="font-bold">Tahun Pelajaran</div><div>: {identity.tahunPelajaran}</div>
          <div className="font-bold">Mata Pelajaran</div><div>: {selection.mapel}</div>
        </div>

        <h3 className="text-xl font-bold mb-4">Kelas {selection.kelas}</h3>

        {items.length === 0 ? (
           <div className="py-20 flex flex-col items-center justify-center text-slate-400">
             <FileX className="w-16 h-16 mb-4 text-slate-300" />
             <p>Data dokumen untuk Kelas {selection.kelas} Mapel {selection.mapel} belum tersedia.</p>
           </div>
        ) : (
          <div className="overflow-x-auto border border-blue-200 rounded">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-200">
                  <th className="p-4 border-r border-blue-200 font-semibold w-48 text-slate-800">Mata Pelajaran</th>
                  <th className="p-4 border-r border-blue-200 font-semibold w-48 text-slate-800">Elemen</th>
                  <th className="p-4 border-r border-blue-200 font-semibold text-slate-800">Capaian Pembelajaran (CP)</th>
                  <th className="p-4 font-semibold text-slate-800">Tujuan Pembelajaran (TP)</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {items.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    {idx === 0 ? (
                       <td className="p-4 border-r border-blue-200 text-slate-700 bg-white" rowSpan={items.length}>
                         {selection.mapel}
                       </td>
                    ) : null}
                    <td className="p-4 border-r border-blue-200 text-slate-700 bg-white">
                      {row.elemen}
                    </td>
                    <td className="p-4 border-r border-blue-200 text-slate-700">
                      <p className="leading-relaxed">{row.cp}</p>
                    </td>
                    <td className="p-4 text-slate-700">
                      <ul className="space-y-2">
                        {row.tp.map((tpStr, tid) => (
                          <li key={tid} className="leading-relaxed">{tpStr}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </motion.div>
  );
}
