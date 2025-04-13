export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
    stats: Stat[];
    types: {
      type: {
        name: string;
      };
    }[];
  }
  
  export interface Stat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  