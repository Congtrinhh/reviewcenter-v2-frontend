import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * child component
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() items: any[] = [];

  @Output() openConfirmDeleteViewEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  openConfirmDeleteView() {
    this.openConfirmDeleteViewEvent.emit();
  }
}
