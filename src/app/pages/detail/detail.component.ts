import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { ICharacter } from "src/app/interfaces/character.interface";
import { AlertComponent } from "src/app/shared/components/alert/alert.component";
import { DialogComponent } from "src/app/shared/components/dialog/dialog.component";
import { CharacterService } from "src/app/shared/services/character.service";

export interface IDimensions {
  dimension: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})

export class DetailComponent implements OnInit {
  character: ICharacter;
  dimensions: string[] = [];

  durationInSeconds = 5;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    this.getAll();
  }

  getAll(): void {
    this.characterService.getAll()
    .pipe(first())
      .subscribe(result => {
        this.character = result.find(res => res.id === this.id);

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

  saveTravel(travel: string): void {
    this.character.historic.push({ createdAt: new Date(), dimensionDestination: travel })

    this.characterService.update(this.character)
    .subscribe(() => {
      this.openSnackBar('Viagem adicionada com sucesso!');
    }, err => { 
      this.openSnackBar('Erro ao adicionar viagem. Tente novamente mais tarde!');
      console.log(err);
    })
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
