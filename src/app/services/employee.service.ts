import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:3000/employees';

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      tap((employees) => this.employeesSubject.next(employees))
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  offboardEmployee(id: string, offboardingData: any, originalEmployee: Employee): Observable<Employee> {
    const updatedEmployee: Employee = {
      ...originalEmployee,
      ...offboardingData,
      status: 'OFFBOARDED'
    };

    return this.http.put<Employee>(`${this.apiUrl}/${id}`, updatedEmployee).pipe(
      tap((updated) => {
        const employees = this.employeesSubject.getValue();
        const index = employees.findIndex(e => e.id === id);
        if (index !== -1) {
          employees[index] = updated;
          this.employeesSubject.next([...employees]);
        }
      })
    );
  }
}
