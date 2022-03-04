import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ReviewBoxService } from '../_services/review-box.service';

@Component({
  selector: 'app-review-box',
  templateUrl: './review-box.component.html',
  styleUrls: ['./review-box.component.scss'],
})
export class ReviewBoxComponent implements OnInit {
  @Input() open = false;
  @Input() centerId: any;
  reviewForm!: FormGroup;

  showLoader = false;

  @Output() closeViewEvent = new EventEmitter();

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenStorageService,
    private reviewService: ReviewBoxService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.reviewForm = this.fb.group({
      rate: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  handleSubmit() {
    this.reviewForm.addControl(
      'centerId',
      new FormControl(this.centerId, Validators.required)
    );
    let currentUser = this.tokenService.getUser();
    if (!currentUser) {
      this.errorMessage = 'please login';
      return;
    }
    this.reviewForm.addControl(
      'userId',
      new FormControl(currentUser.id, Validators.required)
    );
    if (this.reviewForm.valid) {
      this.showLoader = true;
      this.reviewService
        .createOne('review', this.reviewForm.value)
        .subscribe(
          (data) => {
            window.location.reload();
          },
          (error) => {
            this.errorMessage = error.error;
          }
        )
        .add(() => {
          this.showLoader = false;
        });
    }
  }

  raiseCloseViewEvent() {
    this.closeViewEvent.emit();
    this.reviewForm.patchValue({
      rate: '',
      comment: '',
    });
    this.errorMessage = '';
  }
}
