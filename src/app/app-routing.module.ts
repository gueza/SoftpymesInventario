import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'adminproductos',
    loadChildren: () =>
      import('./admin-productos/productos-routing.module').then(
        (m) => m.ProductosRoutingModule
      ),
  },


  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
