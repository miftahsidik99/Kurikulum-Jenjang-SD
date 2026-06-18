export interface IdentityData {
  namaGuru: string;
  nip: string;
  jenisGuru: string;
  namaSekolah: string;
  npsn: string;
  tahunPelajaran: string;
}

export interface SelectionData {
  fase: string;
  kelas: string;
  mapel: string;
}

export interface KurikulumRow {
  elemen: string;
  cp: string;
  tp: string[];
}

export interface KurikulumMapel {
  [mapelName: string]: KurikulumRow[];
}

export interface KurikulumData {
  [kelasNumber: string]: KurikulumMapel;
}
