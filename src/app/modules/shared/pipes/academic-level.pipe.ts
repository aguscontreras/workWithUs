import { Pipe, PipeTransform } from '@angular/core';
import { AcademicLevel } from '../../../_models/academicLevels';

@Pipe({
  name: 'academicLevel',
})
export class AcademicLevelPipe implements PipeTransform {
  transform(value: AcademicLevel): string {
    console.log(value);
    switch (value) {
      case AcademicLevel.Primaria:
        return 'Primaria';
      case AcademicLevel.Secundaria:
        return 'Secundaria';
      case AcademicLevel.Terciario:
        return 'Terciario';
      case AcademicLevel.Universitario:
        return 'Universitario';
      case AcademicLevel.Posgrado:
        return 'Posgrado';
      case AcademicLevel.Master:
        return 'Master';
      case AcademicLevel.Doctorado:
        return 'Doctorado';

      default:
        return '';
    }
  }
}
