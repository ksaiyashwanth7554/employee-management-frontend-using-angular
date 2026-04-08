import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private baseurl = "http://localhost:8080/api/employees";
  private http = inject(HttpClient);

  getEmployees() {
    return this.http.get<Employee[]>(this.baseurl);
  }

  getEmployeeById(id: string) {
    return this.http.get<Employee>(`${this.baseurl}/${id}`); // ✅ FIXED
  }

  addEmployee(emp: Employee) {
    return this.http.post(this.baseurl, emp);
  }

  updateEmployee(id: string, emp: Employee) {
    return this.http.put(`${this.baseurl}/${id}`, emp);
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseurl}/${id}`);
  }
}