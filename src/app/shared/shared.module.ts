import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavegacionComponent } from './navegacion/navegacion.component';



@NgModule({
  declarations: [
    NavegacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavegacionComponent,
    RouterModule,
  ]
})
export class SharedModule { }
