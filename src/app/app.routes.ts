import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'employee/:id', component: EmployeeDetailsComponent },
    { path: '**', redirectTo: '' }
];
