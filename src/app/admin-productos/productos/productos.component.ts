import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ProductosService } from '../services/productos.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  producto: any[] = [];
  productoId: string = '';
  editar: boolean = false;
  formulario!: FormGroup;

  constructor(
    private productosService: ProductosService,
  ) {
    this.formularioProducto();
  }

  private formularioProducto(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required, Validators.min(0)]),
      valor: new FormControl('', [Validators.required, Validators.min(0)]),
      // estado: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.leerProducto()
  }

  async leerProducto() {
    this.producto = await this.productosService.getProducto();
  }

  agregarProducto() {
    if (this.formulario.valid) {
      const nombre = this.formulario.value.nombre;
      const color = this.formulario.value.color;
      const cantidad = this.formulario.value.cantidad;
      const valor = this.formulario.value.valor;

      this.productosService.createProducto(nombre, color, cantidad, valor);
      Swal.fire({
        title: "Exitoso",
        text: "Registro de producto exitoso",
        icon: "success"
      })
      this.leerProducto();
      this.vaciarProducto();
    }
  }

  editarProducto(producto: any) {
    this.editar = true;
    this.productoId = producto.id;

    this.formulario.setValue({
      nombre: producto.pro_nombre,
      color: producto.pro_color,
      cantidad: producto.pro_cantidad,
      valor: producto.pro_valor
    });
  }

  async actualizarProducto() {

    if (this.formulario.valid) {
      const nombre = this.formulario.value.nombre;
      const color = this.formulario.value.color;
      const cantidad = this.formulario.value.cantidad;
      const valor = this.formulario.value.valor;

      const updatedData = {
        pro_nombre: nombre,
        pro_color: color,
        pro_cantidad: cantidad,
        pro_valor: valor
      };

      await this.productosService.updateProducto(this.productoId, updatedData);
      Swal.fire({
        title: "Exitoso",
        text: "Actualización de producto exitosa",
        icon: "success"
      })
      this.leerProducto();
      this.vaciarProducto();
      this.editar = false;
    }
  }

  vaciarProducto(): void {
    this.editar = false;
    this.formulario.reset();
  }
}
