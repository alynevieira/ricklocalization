import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './pages/404page/404-page.component';
import { CharacterComponent } from './pages/character/character.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: 'character', component: CharacterComponent },
      { path: 'character/:id', component: DetailComponent },
      { path: 'historic/:id', component: HistoricComponent },
      { path: '', redirectTo: 'character', pathMatch: 'full' },
      { path: '**', component: Page404Component }
    ] 
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
