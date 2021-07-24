import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent { 

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: any) {}
}