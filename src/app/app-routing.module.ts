import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiSelectorComponent } from './api-selector/api-selector.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: 'api-select', component: ApiSelectorComponent },
      { path: 'main', component: MainComponent },
      { path: '**', redirectTo: 'api-select' }
    ])
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
