import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { InicioComponent } from '../shared/inicio/inicio.component';
import { VentasComponent } from './ventas/ventas.component';
import { CompraComponent } from './compra/compra.component';


const routes: Routes = [

  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'producto', component: ProductosComponent },
      { path: 'venta', component: VentasComponent },
      { path: 'compra', component: CompraComponent }

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductosRoutingModule { }
