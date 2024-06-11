import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7044/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userType', response.user.userType);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserType(): string | null {
    return localStorage.getItem('userType');
  }
}
