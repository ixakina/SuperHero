export interface Environment {
  production: boolean,
  apiKey: string
}

export interface IUser {
  id: number,
  username: string,
  email: string,
  password: string,
  expDate?: Date | null,
  token?: string
}
