export interface Environment {
  production: boolean,
  apiUrl: string
}

export interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  token?: Date | '',
  searchHistory?: string[],
  selectedHeroesIds?: string[],
  buttles?: Buttle[],
  powerups?: {
    shield: PowerUp,
    mjolnir: PowerUp,
    armor: PowerUp,
    cloak: PowerUp,
    ring: PowerUp,
    boots: PowerUp,
  }
}

export interface PowerUp {
  uses: number,
  imgSrc: string,
  name: string
}

export interface Buttle {
  hero: string,
  opponent: string,
  date: string,
  result: string
}

export interface Response {
  results: Hero[];
  response: string
}

export interface Hero {
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
  biography: {
    'full-name': string,
    'alter-egos': string,
    aliases: string[],
    'place-of-birth': string,
    'first-appearance': string,
    publisher: string,
    alignment: string
  },
  work: {
    occupation: string,
    base: string
  },
  appearance: {
    gender: string,
    race: string,
    height: string[],
    weight: string[],
    'eye-color': string,
    'hair-color': string
  },
  connections: {
    'group-affiliation': string,
    relatives: string
  },
  image: {
    url: string;
  }
}


