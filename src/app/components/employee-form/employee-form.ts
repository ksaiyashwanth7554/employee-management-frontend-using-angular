import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css']
})
export class EmployeeForm implements OnInit {

  private service = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee: Employee = {
    id: '',
    name: '',
    email: '',
    role: '',
    salary: 0
  };

  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.service.getEmployeeById(this.id).subscribe(data => {
        this.employee = data;
      });
    }
  }

  saveEmployee() {
    if (this.id) {
      this.service.updateEmployee(this.id, this.employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.service.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}