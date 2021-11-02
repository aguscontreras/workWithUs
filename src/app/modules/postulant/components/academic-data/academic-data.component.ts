import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmAcademicItemComponent } from '../abm-academic-item/abm-academic-item.component';
import { AcademicItem } from '../../../../_models/academicItem';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-academic-data',
  templateUrl: './academic-data.component.html',
  styleUrls: ['./academic-data.component.scss'],
  providers: [DialogService],
})
export class AcademicDataComponent implements OnInit {
  academicItems: AcademicItem[] = [];
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  openDialogAbmAcademicItem(): void {
    const ref = this.dialogService.open(AbmAcademicItemComponent, {
      header: 'Agregar formación académica',
    });

    ref.onClose.pipe(first()).subscribe({
      next: (item: AcademicItem) => {
        if (item != null) {
          this.academicItems.push(item);
        }
      },
    });
  }
}
