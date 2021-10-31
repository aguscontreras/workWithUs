import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academic-list-item',
  templateUrl: './academic-list-item.component.html',
  styleUrls: ['./academic-list-item.component.scss'],
  styles: [
    '.wrapper{border: 1px solid #d4d4d8; border-radius: 0.375rem; margin-bottom: 1rem;}',
  ],
})
export class AcademicListItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
