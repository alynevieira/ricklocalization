import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface IData {
  title: string,
  subtitle: string,
  label: string,
  array: Array<any>
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})

export class DialogComponent implements OnInit {
  selectedValue = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IData) {}

  ngOnInit() {
    this.filteredOptions = this.selectedValue.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.data.array.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}