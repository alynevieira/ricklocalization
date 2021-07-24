import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

import { ICharacter } from "src/app/interfaces/character.interface";
import { DataService } from "src/app/shared/services/data.service";

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 3;

    this.initialData();
  }

  initialData(): void {
    this.dataService._characters
      .subscribe(result => {
        this.characters = result;

        this.pagedList = this.characters.slice(0, 6);
        this.length = this.characters.length;
      }, err => {
        this.dataService.openSnackBar('Algo deu errado! Tente novamente mais tarde.')
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