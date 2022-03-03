import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss'],
})
export class DeleteConfirmModalComponent implements OnInit {
  @Input() show!: boolean;
  @Output() confirmToDeleteEvent = new EventEmitter();
  @Output() cancelToDeleteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  raiseConfirmToDeleteEvent() {
    this.confirmToDeleteEvent.emit();
  }

  raiseCancelToConfirmDeleteEvent() {
    this.cancelToDeleteEvent.emit();
  }
}
