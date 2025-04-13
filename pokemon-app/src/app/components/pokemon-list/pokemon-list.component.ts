import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonFavoriteService } from '../../services/pokemon-favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PokemonListComponent implements OnInit {
  allPokemons: any[] = [];
  filteredPokemons: any[] = [];
  compareList: any[] = [];
  favoriteList: any[] = [];
  searchTerm: string = '';

  router = inject(Router);
  pokemonService = inject(PokemonService);
  favoriteService = inject(PokemonFavoriteService);

  ngOnInit() {
    this.getPokemons();
    this.loadFavorites();
  }

  getPokemons() {
    this.pokemonService.getAllPokemons().subscribe((result) => {
      this.allPokemons = result.results;
      this.filteredPokemons = this.allPokemons;
    });
  }

  filterPokemons() {
    this.filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getPokemonId(url: string): number {
    const segments = url.split('/');
    return Number(segments[segments.length - 2]);
  }

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe((res) => {
      this.favoriteList = res;
    });
  }

  isFavorited(pokemon: any): boolean {
    return this.favoriteList.some(fav => fav.name === pokemon.name);
  }

  toggleFavorite(pokemon: any) {
    if (this.isFavorited(pokemon)) {
      this.favoriteService.removeFavorite(pokemon.name).subscribe(() => {
        this.loadFavorites();
      });
    } else {
      this.favoriteService.addFavorite(pokemon).subscribe(() => {
        this.loadFavorites();
      });
    }
  }

  isInCompareList(pokemon: any): boolean {
    return this.compareList.some((x: any) => x.name === pokemon.name);
  }

  Compare(pokemon: any) {
    const exists = this.compareList.find((x) => x.name === pokemon.name);

    if (exists) {
      this.compareList = this.compareList.filter((x) => x.name !== pokemon.name);
    } else if (this.compareList.length < 2) {
      this.compareList.push(pokemon);
    }

    if (this.compareList.length === 2) {
      this.router.navigate(['/compare'], {
        queryParams: {
          first: this.compareList[0].name,
          second: this.compareList[1].name,
        }
      });
    }
  }
}
