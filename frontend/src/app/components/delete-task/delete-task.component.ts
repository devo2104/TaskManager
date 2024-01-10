import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})

export class DeleteTaskComponent {

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void{
    const taskId = +this.route.snapshot.params['id']
    this.apiService.deleteTask(taskId).subscribe(response => {
      console.log(response)
    })
  }

  redirectToTaskListPage(): void{
    this.router.navigate(['/'])
  } 
  
}
