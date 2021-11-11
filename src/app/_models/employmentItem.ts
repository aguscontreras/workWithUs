export interface EmploymentItem {
  cargo: string;
  nombreEmpresa: string;
  sectorEmpresa: string;
  ubicacion: string;
  mesDesde: string;
  anioDesde: string;
  trabajaActualmente: boolean;
  mesHasta?: string;
  anioHasta?: string;
}
