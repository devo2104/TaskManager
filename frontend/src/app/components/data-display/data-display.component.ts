import { ChangeDetectorRef, Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { LocalstorageService } from 'src/app/services/locaStorage-service/localstorage.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})

export class DataDisplayComponent implements OnInit {
  tasks: any[] = [];
  employees: any[] = []
  isAuthenticated: boolean = false;
  isSuperuser: boolean = this.authService.getSuperUser();
  showOperationsFlag: boolean = false;
  TaskCompletionPercentage: number = 0.00

  showOperations() {
    this.showOperationsFlag = true;
  }

  constructor(private apiService: ApiService, private router: Router, private authService: AuthServiceService, private storageService: LocalstorageService) {
    this.isSuperuser = authService.getSuperUser();
   }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if(this.isSuperuser){
      this.apiService.fetchData().subscribe((response) => {
        this.tasks = response.tasks || [];
        console.log(response)
      }); 
    }
    else{
      // get all task for this user
      const username = this.storageService.getUsername()
      this.apiService.getAllTasksForThisUser(username).subscribe(response => {
        this.tasks = response.tasks
      })
    }
  }

  redirectToTaskDetailPage(id: number): void {
    this.router.navigate(['/task-detail', id])
  } 
  
  redirectToCreateTaskPage(): void{
    this.router.navigate(['/create-task']) // no problem even if you put / at end
  }

  redirectToUpdateTaskPage(id: number): void{
    this.router.navigate(['/update-task', id])
  }
  
  redirectToDeleteTaskPage(id: number): void{
    this.router.navigate(['/delete-task', id])
  }

  redirectToCreateEmployeePage(): void{
    this.router.navigate(['/create-employee'])
  }

  showAnalytics() : void{
    this.apiService.getAnalytics().subscribe(response => {
      this.TaskCompletionPercentage = response.completion_rate
      console.log(response)
    })
  }

  showAllEmployees() :void{
    this.apiService.getAllEmployees().subscribe(response => {
      this.employees = response
      console.log(response);
    })
  }

  logout() {
    this.authService.removeToken();
    this.authService.removeSuperUser();
    this.storageService.clearUsername();
    // Redirect to the login page or another page
    this.router.navigate(['/login'])
  }
}
