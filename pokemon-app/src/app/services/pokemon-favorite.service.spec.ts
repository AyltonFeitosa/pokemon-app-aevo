import { TestBed } from '@angular/core/testing';

import { PokemonFavoriteService } from './pokemon-favorite.service';

describe('PokemonFavoriteService', () => {
  let service: PokemonFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
