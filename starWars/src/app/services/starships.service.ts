import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private apiUrl = 'https://swapi.dev/api/'; // Usar solo la URL base aquí

  constructor(private http: HttpClient) { }

  getStarships(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}starships/`); // No incluir 'starships/' aquí
  }
}