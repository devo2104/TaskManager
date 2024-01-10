import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent{
  task: any = {}
  employeeName: string | null = ''

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.params['id']
    this.apiService.fetchTaskDetail(taskId).subscribe(data => {
      this.task = data.task
      this.employeeName = data.emp
      console.log(data)
    })
  }
  
}
