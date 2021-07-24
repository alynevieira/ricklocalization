import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ICharacter } from "src/app/interfaces/character.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class CharacterService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICharacter[]> {
  return this.http.get<ICharacter[]>(`${environment.apiUrl}/character`);
  }

  getById(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${environment.apiUrl}/character/` + id);
  }

  create(character: ICharacter): Observable<ICharacter> {
    return this.http.post<ICharacter>(`${environment.apiUrl}/character`, character);
  }

  update(character: ICharacter): Observable<ICharacter> {
    return this.http.put<ICharacter>(`${environment.apiUrl}/character/` + character.id, character);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/character` + id);
  }
}