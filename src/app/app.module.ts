import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from './modal/modal.module';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { ApiSelectorComponent } from './api-selector/api-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadIndicatorComponent } from './load-indicator/load-indicator.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ApiSelectorComponent,
    LoadIndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
