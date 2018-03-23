import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

	productList: AngularFireList<any>;
	selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts() {
  	return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product) {
  	this.productList.push({
  		description: product.description,
  		price: product.price,
  		stock: product.stock,
  		category_key: product.category_key
  	});
  }

  updateProduct(product: Product) {
  	this.productList.update(product.$key, {
  		description: product.description,
  		price: product.price,
  		stock: product.stock,
  		category_key: product.category_key
  	});
  }

  deleteProduct($key: string) {
  	this.productList.remove($key);
  }

}
