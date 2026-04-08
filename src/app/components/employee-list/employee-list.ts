import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  private service = inject(EmployeeService);
  private router = inject(Router);
  employees: Employee[] = [];
  ngOnInit(): void {
    this.loadEmployee();
  }
  loadEmployee(){
    this.service.getEmployees().subscribe((data : any[]) =>{
      this.employees=data;
    })
  }
  updateEmployee(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: string) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.loadEmployee();
    });
  
  
}
}
