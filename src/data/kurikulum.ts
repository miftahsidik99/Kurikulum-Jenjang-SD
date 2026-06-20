import { KurikulumData } from '../types';
import { dataKelas1 } from './kelas1';
import { dataKelas2 } from './kelas2';
import { dataKelas3 } from './kelas3';
import { dataKelas4 } from './kelas4';
import { dataKelas5 } from './kelas5';
import { dataKelas6 } from './kelas6';

export const kurikulumData: KurikulumData = {
  "1": dataKelas1,
  "2": dataKelas2,
  "3": dataKelas3,
  "4": dataKelas4,
  "5": dataKelas5,
  "6": dataKelas6
};

export const getFaseByKelas = (kelas: string): string => {
  if (['1', '2'].includes(kelas)) return 'A';
  if (['3', '4'].includes(kelas)) return 'B';
  if (['5', '6'].includes(kelas)) return 'C';
  return '';
};

export const mapelOptions = [
  "PAIBP",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Matematika",
  "IPAS",
  "PJOK",
  "Seni Rupa",
  "Bahasa Inggris",
  "Mulok Bahasa Sunda",
  "KKA (Koding dan Kecerdasan Artifisial)"
];
