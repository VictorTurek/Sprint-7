import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/auth';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userDetails: User){
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map(users => users.length > 0)
    );
  }

  login() {
    this.isLoggedInSubject.next(true);
    // Aquí puedes realizar cualquier otra acción relacionada con el inicio de sesión, como redirigir a la página principal
    this.router.navigate(['/']);
    console.log("this.isLoggedIn", this.isLoggedInSubject)
  }

  logout() {
    this.isLoggedInSubject.next(false);

    // Aquí puedes realizar cualquier otra acción relacionada con el cierre de sesión, como limpiar el almacenamiento de sesiones y redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
    console.log("this.isLoggedIn", this.isLoggedInSubject)
  }
  

}
