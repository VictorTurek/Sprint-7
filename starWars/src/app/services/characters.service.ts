import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CharactersService {

  private apiUrl = 'https://swapi.dev/api/people/';

  constructor(private http: HttpClient) { }

  getcharactersService(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);  }

}


