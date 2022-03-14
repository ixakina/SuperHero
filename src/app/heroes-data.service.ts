import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "./constants";
import {IHero, IResponse} from "./interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesDataService {
  constructor(
    private http: HttpClient
  ) {
  }

  public getByName(name: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${apiUrl}/search/${name}`);
  }

  public getById(id: number): Observable<IHero> {
    return this.http.get<IHero>(`${apiUrl}/${id}`);
  }
}
