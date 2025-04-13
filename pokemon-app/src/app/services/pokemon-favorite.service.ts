import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonFavoriteService {
  private apiUrl = 'http://localhost:3000/favorites'; // sua API

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFavorite(pokemon: { name: string, url: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, pokemon);
  }

  removeFavorite(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }
}
