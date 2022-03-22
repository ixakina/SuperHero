import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IHero, IResponse} from "../common/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesDataService {

  constructor(
    private http: HttpClient
  ) {}

  public getByName(name: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.apiUrl}/search/${name}`);
  }

  public getById(id: number): Observable<IHero> {
    return this.http.get<IHero>(`${environment.apiUrl}/${id}`);
  }
}
