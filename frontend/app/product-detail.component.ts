import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StockService } from './stock.service';
import { Producto } from './producto.model';

@Component({
    template: `
    <div class="card" style="margin:20px;">
    <div class="card-header">{{producto.nombre}} (Id:{{producto.id}})</div>
    <div class="card-body" *ngIf="producto; then encontrado else noexiste"></div>
        <ng-template #encontrado>
            <h5 class="card-title">Descripción</h5>
            <p class="card-text">{{producto.descripcion}}</p>
            <h5 class="card-title">Cantidad</h5>
            <p class="card-text">{{producto.cantidad}}</p>
        </ng-template>
        <ng-template #noexiste>
            <h5 class="card-title">Producto no encontrado...</h5>
        </ng-template>
    </div>
    <p>
        <button class="btn btn-danger" (click)="removeProduct()">Eliminar</button>&nbsp;
        <button class="btn btn-warning" (click)="editProduct()">Editar</button>&nbsp;
        <button class="btn btn-primary" (click)="gotoProducts()">Listado</button>
    </p>
    `
})
export class ProductDetailComponent {

    producto: Producto = {} as Producto;

    constructor(private router: Router, activatedRoute: ActivatedRoute, private service: StockService) {
        const id = activatedRoute.snapshot.params.id;
        service.getProduct(id).subscribe(
            producto => this.producto = producto,
            error => console.error(error)
        );
    }

    removeProduct() {
        const okResponse = window.confirm('¿Quieres eliminar el producto?');
        if (okResponse) {
            this.service.removeProduct(this.producto.id).subscribe(
                error => console.error(error)
            );
            this.router.navigate(['/productos']);
        }
    }

    editProduct() {
        this.router.navigate(['/productos/edit', this.producto.id ]);
    }

    gotoProducts() {
        this.router.navigate(['/productos']);
    }
}
