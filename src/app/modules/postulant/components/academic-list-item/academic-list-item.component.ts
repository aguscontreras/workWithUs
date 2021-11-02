import { Component, Input, OnInit } from '@angular/core';
import { AcademicItem } from '../../../../_models';

@Component({
  selector: 'app-academic-list-item',
  templateUrl: './academic-list-item.component.html',
  styleUrls: ['./academic-list-item.component.scss'],
  styles: [
    '.wrapper{border: 1px solid #d4d4d8; border-radius: 0.375rem; margin-bottom: 1rem;}',
  ],
})
export class AcademicListItemComponent implements OnInit {
  @Input() academicItem: AcademicItem;

  constructor() {}

  ngOnInit(): void {}
}
