import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ProductosRoutingModule } from './productos-routing.module';

import { PrincipalComponent } from './principal/principal.component';
import { InicioComponent } from '../shared/inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';

import { MatDialogModule } from '@angular/material/dialog';
import { VentasComponent } from './ventas/ventas.component';
import { CompraComponent } from './compra/compra.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    InicioComponent,
    ProductosComponent,
    VentasComponent,
    CompraComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductosRoutingModule
  ]
})
export class AdminProductosModule { }
