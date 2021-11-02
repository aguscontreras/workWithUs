import { AcademicLevel } from './academicLevels';
import { AcademicStates } from './academicStates';
export interface AcademicItem {
  centroEducativo: string;
  nivel: AcademicLevel;
  estado: AcademicStates;
  mesDesde: string;
  anioDesde: string;
  mesHasta: string;
  anioHasta: string;
}
