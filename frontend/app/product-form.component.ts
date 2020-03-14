import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StockService } from './stock.service';
import { Producto } from './producto.model';

@Component({
  template: `
  <div class="card" style="margin:20px;">
    <div class="card-header">
      <input *ngIf="producto" size="46" [(ngModel)]="producto.nombre" placeholder="producto"/>
      <span *ngIf="producto"> (Id:{{producto.id}})</span>
    </div>
    <div class="card-body">
      <h5 class="card-title">Descripción</h5>
      <p class="card-text">
        <textarea rows="10" cols="41" [(ngModel)]="producto.descripcion" placeholder="descripción"></textarea>
      </p>
      <h5 class="card-title">Cantidad</h5>
      <p class="card-text">
        <input type="number" [(ngModel)]="producto.cantidad" placeholder="cantidad" />
      </p>
    </div>
  </div>
  <button class="btn btn-danger" (click)="cancel()">Cancelar</button>&nbsp;
  <button class="btn btn-warning" (click)="save()">Salvar</button>
  `
})
export class ProductFormComponent {

  newProduct: boolean;
  producto: Producto = {} as Producto;

  constructor(private router: Router, activatedRoute: ActivatedRoute, private service: StockService) {

    const id = activatedRoute.snapshot.params.id;
    if (id) {
      service.getProduct(id).subscribe(
        producto => this.producto = producto,
        error => console.error(error)
      );
      this.newProduct = false;
    } else {
      this.producto = { nombre: '', descripcion: '', cantidad: 0 };
      this.newProduct = true;
    }
  }

  cancel() {
    this.router.navigate(['/productos']);
  }

  save() {
    if (this.newProduct) {
      this.service.addProduct(this.producto).subscribe(
        producto => null,
        error => console.error('Error creando un nuevo producto: ' + error)
      );
    } else {
      this.service.updateProduct(this.producto).subscribe(
        producto => null,
        error => console.error('Error actualizando el producto: ' + error)
      );
    }
    this.router.navigate(['/productos']);
  }
}
