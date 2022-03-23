import {Injectable} from '@angular/core';
import {User} from "../common/interfaces";

@Injectable()
export class StorageService {

  public getData(key: string): User[] | number {
   return JSON.parse(localStorage.getItem(key));
  }

  public setData(key: string, value: unknown): void {
   localStorage.setItem(key, JSON.stringify(value));
  }
}
