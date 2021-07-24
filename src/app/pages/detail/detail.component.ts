import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ICharacter } from "src/app/interfaces/character.interface";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { CharacterService } from "src/app/shared/services/character.service";
import { DataService } from "src/app/shared/services/data.service";

export interface IDimensions {
  dimension: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})

export class DetailComponent implements OnInit, OnDestroy {
  characters: ICharacter[] = [];
  dimensions: string[] = [];
  character: ICharacter;

  id: number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService,
    private dataService: DataService) {}

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    this.initialData();
  }

  initialData(): void {
    this.dataService._characters
    .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.characters = result;
        this.character = result.find(res => res.id === this.id);

        this.dataService.currentCharacter = this.character;

        let array = result.map(ch => { return ch.dimension });
        this.dimensions = [...new Set(array)];
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { 
        title: "Viagem entre dimensões",
        subtitle: "Escolha um dimensão",
        label: "Dimensão",
        array: this.dimensions 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.saveTravel(result);
    });
  }

  updateDataService(result: ICharacter) {
    this.characters.forEach((element, index) => {
      if(element.id === result.id) {
        this.characters[index] = result;
      }
    });

    this.dataService.characters = this.characters;
  }

  saveTravel(travel: string): void {
    this.character.historic.push({ createdAt: new Date(), dimensionDestination: travel })

    this.characterService.update(this.character)
    .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.updateDataService(result);
        
        this.dataService.openSnackBar('Viagem adicionada com sucesso!');
      }, err => { 
        this.dataService.openSnackBar('Erro ao adicionar viagem. Tente novamente mais tarde!');
        console.log(err);
      })
  }

  ngOnDestroy() { 
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
