import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class StarshipsService {
  
  private apiUrl = 'https://swapi.dev/api/starships/';

  constructor(private http: HttpClient) { }

  getStarshipsService(page: number): Observable<any> {
    //console.log("Servicio. Estamos en la pagina", page);
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
    
  }

}