import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskDescription: string = '';
  taskStatus: boolean = false;
  employees: any[] = []
  selectedEmployee: any

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void{
    this.apiService.getEmployees().subscribe(data => {
      this.employees = data.employees
      console.log(this.employees)
    })
  }


  createTask(): void {
    const taskData = {
      description: this.taskDescription,
      status: this.taskStatus,
      employee: this.selectedEmployee
    };
    console.log(taskData)
    this.apiService.createTask(taskData).subscribe(response => {
      console.log('Task created successfully:', response);
      // Optionally, you can navigate to a different page or perform other actions.
      this.router.navigate(['/'])
    });
  }

}
