export interface Environment {
  production: boolean,
  apiKey: string
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  password: string,
  token?: Date | '',
  searchHistory?: string[],
  selectedHeroesIds?: string[],
}

export interface IResponse {
  results: IHero[];
}

export interface IHero {
  id: string,
  name: string,
  powerstats: {
    intelligence: string,
    strength: string,
    speed: string,
    durability: string,
    power: string,
    combat: string
  },
  image: {
    url: string;
  }
}
