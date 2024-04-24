import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  producto: any[] = [];
  totalPagar: number = 0;
  productosCarrito: any[] = [];
  productoId: string = '';
  nuevacantidad: boolean = false;
  formulario!: FormGroup;

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {
    this.formularioProducto();
  }

  private formularioProducto(): void {
    this.formulario = new FormGroup({
      producto: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
    })
  }

  ngOnInit(): void {
    this.leerProducto()
  }

  async leerProducto() {
    this.producto = await this.productosService.getProducto();
  }

  async agregar() {

    if (this.formulario.valid) {
      const productoComprar = this.formulario.value.producto.trim();
      const cantidadComprar = this.formulario.value.cantidad;

      const productoElegido = this.producto.find((producto) => producto.id == productoComprar);
      const suma = productoElegido.pro_cantidad + cantidadComprar;

      const updatedData = {
        pro_cantidad: suma,
      };

      await this.productosService.updateProducto(productoComprar, updatedData);
      Swal.fire({
        title: "Exitoso",
        text: "Compra realizada exitosamente",
        icon: "success"
      })

      this.nuevacantidad = true;
      this.formulario.reset();
      this.leerProducto();
    }
  }
}
