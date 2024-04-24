import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, DocumentReference, doc, updateDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public firestore: Firestore) { }

  async getProducto() {
    const querySnapshot = await getDocs(query(collection(this.firestore, 'producto')));

    return querySnapshot.docs.map((producto) => {
      const data = producto.data();
      const id = producto.id;
      return { id, ...data };
    });
  }

  async createProducto(name: string, color: string, cantidad: string, valor: number) {
    const docRef = await addDoc(collection(this.firestore, 'producto'), {
      pro_nombre: name,
      pro_color: color,
      pro_cantidad: cantidad,
      pro_valor: valor
    });
  }

  async updateProducto(id: string, dataToUpdate: Partial<Producto>) {
    const productDocRef = doc(this.firestore, 'producto', id);

    await updateDoc(productDocRef, dataToUpdate);
  }

}
