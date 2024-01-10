import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { LocalstorageService } from 'src/app/services/locaStorage-service/localstorage.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  taskDescription: any
  taskStatus: any
  employees: any[] = []
  selectedEmployee: any
  isSuperuser: boolean = this.authService.getSuperUser();

  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void{
    this.apiService.getEmployees().subscribe(data => {
      this.employees = data.employees
      console.log(this.employees)
    })
  }

  redirectToHomePage(): void{
    this.router.navigate(['/'])
  }

  updateTask(): void{
    const taskId = +this.route.snapshot.params['id']
    console.log(taskId)
    if(this.isSuperuser){
      const taskData = {
        'description': this.taskDescription,
        'status': this.taskStatus,
        'employee': this.selectedEmployee
      }
      console.log(taskData)
      this.apiService.updateTask(taskId, taskData).subscribe(response => {
        console.log(response)
      })
    }
    else{
      const taskData = {
        'status': this.taskStatus
      }
      console.log(taskData)
      this.apiService.updateTaskByRegularUser(taskId, taskData).subscribe(response => {
        console.log(response)
      })
    }
  }
}
