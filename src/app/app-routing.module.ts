import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DimensionsComponent } from './pages/dimensions/dimensions.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dimensions', component: DimensionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
