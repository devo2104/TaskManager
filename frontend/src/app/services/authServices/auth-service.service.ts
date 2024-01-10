import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authTokenKey = 'authToken'


  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey)
  }

  getSuperUser(): boolean {
    const what = localStorage.getItem('super-user');
    const superUser = what == "true" ? true : false;
    return superUser
  }

  removeSuperUser(): void{
    localStorage.removeItem('super-user')
  }

  setToken(token: string): void{
    localStorage.setItem(this.authTokenKey, token)
  } 

  removeToken(): void{
    localStorage.removeItem(this.authTokenKey)
  }

  isAuthenticated(): boolean{
    const token = this.getToken()
    return token !== null
  }
}
