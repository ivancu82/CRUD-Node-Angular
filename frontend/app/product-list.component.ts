import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StockService } from './stock.service';
import { Producto } from './producto.model';

@Component({
  template: `
    <table class="table table-hover"
           style="width:80%; margin: 0px auto;">
      <caption>Listado de productos en almacén</caption>
      <thead class="thead-light">
        <tr><th>Id</th><th>Nombre</th><th>Descripción</th><th>Cantidad</th></tr>
      </thead>
      <tr *ngFor="let producto of productos">
        <td class="table-primary">{{producto.id}}</td>
        <td><a [routerLink]="['/productos', producto.id]">{{producto.nombre}}</a></td>
        <td>{{producto.descripcion}}</td>
        <td>{{producto.cantidad}}</td>
      </tr>
    </table>
    <button class="btn btn-primary" (click)="newProduct()">Nuevo Producto</button>
  `
})
export class ProductListComponent implements OnInit {

    productos: Producto[];

    constructor(private router: Router, private service: StockService) {}

    ngOnInit() {
      this.service.getProducts().subscribe(
        productos => this.productos = productos,
        error => console.log(error)
      );
    }

    newProduct() {
      this.router.navigate(['/productos/new']);
    }
}
