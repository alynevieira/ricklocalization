import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { first } from 'rxjs/operators'

import { ICharacter } from "src/app/interfaces/character.interface";
import { CharacterService } from "src/app/shared/services/character.service";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})

export class CharacterComponent implements OnInit {
  characters: ICharacter[] = [];
  pagedList: ICharacter[]= [];
  breakpoint: number = 3;

  length: number = 0;
  pageSize: number = 6;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;

    this.getAll();
  }

  getAll(): void {
    this.characterService.getAll()
    .pipe(first())
      .subscribe(result => {
        this.characters = result;

        this.pagedList = this.characters.slice(0, 6);
        this.length = this.characters.length;
      }, err => {
        alert(err)
      })
  }

  OnPageChange(event: PageEvent) {
    console.log(event)
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if(endIndex > this.length) {
      endIndex = this.length;
    }

    this.pagedList = this.characters.slice(startIndex, endIndex);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 3;
  }
}