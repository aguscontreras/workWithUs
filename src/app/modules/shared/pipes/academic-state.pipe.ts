import { Pipe, PipeTransform } from '@angular/core';
import { AcademicStates } from '../../../_models';

@Pipe({
  name: 'academicState',
})
export class AcademicStatePipe implements PipeTransform {
  transform(value: AcademicStates): unknown {
    switch (value) {
      case AcademicStates.Aplazado:
        return 'Aplazado/Postergado';
      case AcademicStates.Culminado:
        return 'Culminado';
      case AcademicStates.Cursando:
        return 'Cursando';
      default:
        return '';
    }
  }
}
