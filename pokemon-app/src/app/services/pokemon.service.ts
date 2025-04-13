import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonDetail } from '../types/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  http = inject(HttpClient)

  constructor() {}
  
   getAllPokemons(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
   }

   getPokemonDetails(id: string | number): Observable<PokemonDetail>{
    return this.http.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`)
   }

  }
