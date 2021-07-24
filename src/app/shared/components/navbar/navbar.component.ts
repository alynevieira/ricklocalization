import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CharacterService } from "../../services/character.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})

export class NavbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private dataService: DataService,
    private characterService: CharacterService) {}

  ngOnInit() {
    this.initialData();
  }

  initialData(): void {
    this.dataService._characters.subscribe(result => {
      if (!result.length) this.getAll();
    })
  }

  getAll(): void {
    this.characterService.getAll()
    .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.dataService.characters = result;
      }, err => {
        this.dataService.openSnackBar("Algo deu errado! Tente novamente mais tarde.");
        console.log(err);
      })
  }

  ngOnDestroy() { 
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}