import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth,  } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environments';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { AdminProductosModule } from './admin-productos/admin-productos.module';
import { ProductosComponent } from './admin-productos/productos/productos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    // ProductosComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    SharedModule,
    AdminProductosModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap:
  [AppComponent]
})
export class AppModule { }



