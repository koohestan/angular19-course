import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  // تعریف سیگنال‌ها
  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = signal<boolean>(false);

  // computed signals
  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => this._isAuthenticated());

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) { // لاگین موفق آمیز
            this._currentUser.set(users[0]);
            this._isAuthenticated.set(true);
            localStorage.setItem('user', JSON.stringify(users[0]));
            return true;
          }
          return false;
        })
      );
  }

  logout(): void {
    // ریست کردن سیگنال‌ها
    this._currentUser.set(null);
    this._isAuthenticated.set(false);

    // پاک کردن localStorage
    localStorage.removeItem('user');
    this.router.navigate(['/login']);//انتقال به صفحه لاگین
  }

  getUserName(): string | null {
    return this._currentUser()?.name ?? null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated() || !!localStorage.getItem('user');
  }
}
