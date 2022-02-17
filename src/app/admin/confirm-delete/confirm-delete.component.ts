import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() closeConfirmDeleteViewEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onCloseConfirmDeleteView() {
    this.closeConfirmDeleteViewEvent.emit();
  }
}
