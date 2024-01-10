import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})


export class CreateEmployeeComponent {
  employeeForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  createEmployee() {
    // Check if the form is valid before proceeding
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      // call the apiService to get the user associated with this employee
      this.apiService.createEmployee(formData).subscribe(response => {
        console.log(response)
      })
    }
  }
}
