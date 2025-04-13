import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '../../types/pokemon'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-pokemon-detail',
  imports: [CommonModule,   CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatButtonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent {
  pokemon!: PokemonDetail;
  totalStats = 0;

  pokemonService = inject(PokemonService);
  route = inject(ActivatedRoute)

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokemonService.getPokemonDetails(id).subscribe((result) => {
        this.pokemon = result;
        this.totalStats = this.calculateTotalStats(result.stats);
      });
    }
  }

  calculateTotalStats(stats: any[]): number {
    let total = 0;

    for (let i = 0; i < stats.length; i++){
      total += stats[i].base_stat;
    }

    return total;
  }
}
