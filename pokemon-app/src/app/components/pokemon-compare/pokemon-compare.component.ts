import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-compare',
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-compare.component.html',
  styleUrl: './pokemon-compare.component.css'
})
export class PokemonCompareComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);

  pokemon1: any;
  pokemon2: any;
  stats1: number = 0;
  stats2: number = 0;

  ngOnInit() {
    const name1 = this.route.snapshot.queryParamMap.get('first')
    const name2 = this.route.snapshot.queryParamMap.get('second')

    if (name1 && name2) {
      this.pokemonService.getPokemonDetails(name1).subscribe((result) => {
        this.pokemon1 = result;
        this.stats1 = this.calculateTotalStats(result.stats)
        console.log()
      })
      this.pokemonService.getPokemonDetails(name2).subscribe((result) => {
        this.pokemon2 = result;
        this.stats2 = this.calculateTotalStats(result.stats)
        console.log(result);
      })
    }
  }
  calculateTotalStats(stats: any): number {
    let total = 0;

    for (let i = 0; i < stats.length; i++){
      total += stats[i].base_stat;
    }

    return total;
  }
}
