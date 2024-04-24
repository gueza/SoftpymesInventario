import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/login.services';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'inventario-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formulario();
  }

  private formulario(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.formLogin.valid) {
    this.userService.login(this.formLogin.value)
      .then(response => {
        Swal.fire({
          title: "Inicio de sesión exitoso",
          icon: "success"
        });
        this.router.navigate(['/adminproductos']);
      })
      .catch(error =>
        Swal.fire({
          title: "Error en el inicio de sesión",
          text: "Credenciales incorrectas",
          icon: "error"
        })
      );
    }
  }
}
