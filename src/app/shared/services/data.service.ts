import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Observable, pipe } from "rxjs";
import { filter } from "rxjs/operators";

import { ICharacter } from "src/app/interfaces/character.interface";
import { AlertComponent } from "../components/alert/alert.component";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private durationInSeconds = 5; 
  private $characters = new BehaviorSubject<ICharacter[]>([]);
  private $currentCharacter = new BehaviorSubject<ICharacter>(null);

  constructor(private _snackBar: MatSnackBar) {}

  get _characters(): Observable<ICharacter[]> {
    return this.$characters.asObservable().pipe(filter(res => !!res));
  }

  set characters(char: ICharacter[]) {
    this.$characters.next(char)
  }

  get _currentCharacter(): Observable<ICharacter> {
    return this.$currentCharacter.asObservable().pipe(filter(res => !!res));
  }

  set currentCharacter(char: ICharacter) {
    this.$currentCharacter.next(char)
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "right",
      verticalPosition: "top",
      data: message
    });
  }
}