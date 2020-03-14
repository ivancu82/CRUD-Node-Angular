import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, concat, of } from 'rxjs';

import { Producto } from './producto.model';

const BASE_URL = 'http://localhost:8080/productos/';

@Injectable({
	providedIn: 'root',
})
export class StockService {

	constructor(private http: HttpClient) { }

	getProducts() {
		return this.http.get<Producto[]>(BASE_URL);
	}

	getProduct(id: number | string) {
		return this.http.get<Producto>(BASE_URL + id);
	}

	addProduct(producto: Producto) {
		return this.http.post<Producto>(BASE_URL, producto);
	}

	removeProduct(id: number | string) {
		return this.http.delete<Producto>(BASE_URL + id);
	}

	updateProduct(producto: Producto) {
		return this.http.put<Producto>(BASE_URL + producto.id, producto);
	}

	private handleError(error: any) {
		console.error(error);
		return concat(of(error), throwError(new Error('Server error (' + error.status + '): ' + error.text())));
	}
}
