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
  buttles?: IButtle[],
  powerups?: {
    shield: IPowerUp,
    mjolnir: IPowerUp,
    armor: IPowerUp,
    cloak: IPowerUp,
    ring: IPowerUp,
    boots: IPowerUp,
  }
}

export interface IPowerUp {
  uses: number,
  imgSrc: string,
  name: string
}

export interface IButtle {
  hero: string,
  opponent: string,
  date: string,
  result: string
}

export interface IResponse {
  results: IHero[];
  response: string
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


