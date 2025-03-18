import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-offboard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './offboard-dialog.component.html',
  styleUrls: ['./offboard-dialog.component.scss']
})
export class OffboardDialogComponent {
  offboardForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OffboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.offboardForm = this.fb.group({
      receiver: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      streetLine1: ['', Validators.required],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      notes: ['']
    });
  }

  numbersOnly(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  lettersOnly(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  submit() {
    if (this.offboardForm.valid) {
      this.dialogRef.close(this.offboardForm.value);
    }
  }
}
