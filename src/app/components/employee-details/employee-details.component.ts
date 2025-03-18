import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { OffboardDialogComponent } from '../offboard-dialog/offboard-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getEmployeeById(id).subscribe({
        next: (emp) => this.employee = emp,
        error: () => {
          this.snackBar.open('Failed to load employee details.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openOffboardDialog(): void {
    const dialogRef = this.dialog.open(OffboardDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      panelClass: 'custom-dialog-container',
      data: this.employee
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.offboardEmployee(this.employee.id, result, this.employee).subscribe({
          next: (updated) => {
            this.employee = updated;
            this.snackBar.open('Employee successfully offboarded!', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Failed to offboard employee. Please try again.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  getEquipmentNames(equipments: any[]): string {
    return equipments.map((e) => e.name).join(', ');
  }
}

