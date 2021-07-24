import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ICharacter } from "src/app/interfaces/character.interface";
import { DataService } from "src/app/shared/services/data.service";

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.sass']
})

export class HistoricComponent {
  displayedColumns: string[] = ['date', 'dimension'];
  character: ICharacter;

  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) {}

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    this.initialData();
  }

  initialData(): void {
    this.dataService._currentCharacter
    .subscribe(result => {
      result ? this.character = result : this.getAll();
    })
  }

  getAll(): void {
    this.dataService._characters
    .subscribe(result => {
      this.character = result.find(res => res.id === this.id);

      this.dataService.currentCharacter = this.character;
    })
  }
}