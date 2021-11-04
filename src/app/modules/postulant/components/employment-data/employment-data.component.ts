import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AbmEmploymentItemComponent } from '../abm-employment-item/abm-employment-item.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employment-data',
  templateUrl: './employment-data.component.html',
  styleUrls: ['./employment-data.component.scss'],
  providers: [DialogService],
})
export class EmploymentDataComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {}

  handleClickBtnNewItem(): void {
    const ref = this.dialogService.open(AbmEmploymentItemComponent, {
      header: 'Agregar experiencia laboral',
    });

    ref.onClose
      .pipe(first())
      .subscribe({ next: (result) => console.log(result) });
  }
}
