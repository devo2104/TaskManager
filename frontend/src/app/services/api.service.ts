import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';  // Replace with your Django backend URL

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/`);
  }

  fetchTaskDetail(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}/`);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/create/`, taskData);
  }

  updateTask(taskId: number , taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/update/${taskId}/`, taskData)
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/delete/${taskId}/`)
  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/employees/`)
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/register/`, user)
  } 

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/login/`, user)
  }
  
  checkSuperUser(username: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/checkSuperUser/${username}`)
  }

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/createEmployee/`, employee)
  }

  getAllTasksForThisUser(username: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/user/${username}/`)
  }

  updateTaskByRegularUser(taskId: number, taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/updateRegularUser/${taskId}/`, taskData)
  }
}
