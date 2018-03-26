import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CategoryService } from './category.service';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

	productList: AngularFireList<any>;
	selectedProduct: Product = new Product();
  categoryArray: any[] = [];

  constructor(
    private firebase: AngularFireDatabase, 
    private categoryService: CategoryService
  ) { }

  getProducts() {
  	return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product) {
  	this.productList.push({
      url_img: product.url_img,
      name: product.name,
  		description: product.description,
  		price: product.price,
  		stock: product.stock,
  		category_key: product.category_key
  	});
  }

  updateProduct(product: Product) {
  	this.productList.update(product.$key, {
      url_img: product.url_img,
      name: product.name,
  		description: product.description,
  		price: product.price,
  		stock: product.stock,
  		category_key: product.category_key
  	});
  }

  deleteProduct($key: string) {
  	this.productList.remove($key);
  }

  getCategory($key: string) {

    let res = this.categoryArray.find( item => item.$key == $key);
    console.log(res);
    if (res != undefined) {
      return res.name;
    } else {
      return "No especificado";
    }
  }

}
