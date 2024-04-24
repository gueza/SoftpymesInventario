import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  producto: any[] = [];
  totalPagar: number = 0;
  productosCarrito: any[] = [];
  productoId: string = '';
  editar: boolean = false;
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

  agregar(): void {
    if (this.formulario.valid) {
      const productoRequerido = this.formulario.value.producto.trim();
      const cantidadRequerida = this.formulario.value.cantidad;

      const productoAlmacenar = this.producto.find((producto) => producto.id == productoRequerido);

      if (parseInt(productoAlmacenar.pro_cantidad) >= parseInt(cantidadRequerida)) {

        const validarProductoDosVeces = this.productosCarrito.find((producto) => producto.id == productoRequerido);

        if (!validarProductoDosVeces) {

          const total = productoAlmacenar.pro_valor * cantidadRequerida;
          this.totalPagar = this.totalPagar + total;

          productoAlmacenar.cantidad_requerida = cantidadRequerida;
          productoAlmacenar.valor_total = total;

          this.productosCarrito.push(productoAlmacenar);

          this.formulario.reset();

        } else {

          Swal.fire({
            title: "Observación",
            text: "Ya agregaste este producto al carrito, no puedes agregar más",
            icon: "info"
          })
        }

      } else {

        Swal.fire({
          title: "Sin stock",
          text: "Por el momento no existe toda esa cantidad de producto",
          icon: "info"
        })
      }
    }
  }

  async facturar() {

    for (let i = 0; i < this.productosCarrito.length; i++) {
      const producto = this.productosCarrito[i];
      const id = producto.id;
      const resta = producto.pro_cantidad - producto.cantidad_requerida;

      const updatedData = {
        pro_cantidad: resta,
      };

      await this.productosService.updateProducto(id, updatedData);
    }

    Swal.fire({
      title: "Facturado",
      text: "Tu compra ha sido facturada con éxito",
      icon: "success"
    });

    this.router.navigate(['/adminproductos/producto']);
  }
}
