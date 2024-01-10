import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private readonly USERNAME_KEY = 'username';

  constructor() { }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  clearUsername(): void {
    localStorage.removeItem(this.USERNAME_KEY);
  }
}
