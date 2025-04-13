import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonCompareComponent } from './components/pokemon-compare/pokemon-compare.component';

export const routes: Routes = [
    {
        path:"",
        component:PokemonListComponent
    },
    {
      path:"compare",
      component:PokemonCompareComponent
    },
    {
      path:"pokemon-detail/:id",
      component:PokemonDetailComponent
    },  
    {
      path: "**",
      redirectTo: ""
    }
];
