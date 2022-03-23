import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Hero, Response} from "../common/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesDataService {

  constructor(
    private http: HttpClient
  ) {}

  public getByName(name: string): Observable<Response> {
    return this.http.get<Response>(`${environment.apiUrl}/search/${name}`);
  }

  public getById(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${environment.apiUrl}/${id}`);
  }
}
