import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ICharacter } from "src/app/interfaces/character.interface";
import { CharacterService } from "src/app/shared/services/character.service";

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
    private characterService: CharacterService) {}

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);

    this.getById();
  }

  getById() {
    this.characterService.getById(this.id)
    .subscribe(result => {
      this.character = result;
      console.log(this.character)
    })
  }
}