import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { CharacterComponent } from './pages/character/character.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './shared/components/components.module';
import { DataService } from './shared/services/data.service';
import { DetailComponent } from './pages/detail/detail.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { Page404Component } from './pages/404page/404-page.component';
import { CharacterService } from './shared/services/character.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterComponent,
    DetailComponent,
    HistoricComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [
    CharacterService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
