import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {

	categoryList: AngularFireList<any>;
	selectedCategory: Category = new Category();
  

  constructor(private firebase: AngularFireDatabase) { }

  getCategories() {
  	return this.categoryList = this.firebase.list('categories');
  }

  insertCategory(category: Category) {
  	this.categoryList.push({
  		url_img: category.url_img,
  		name: category.name,
  		description: category.description
  	});
  }

  updateCategory(category: Category) {
  	this.categoryList.update(category.$key, {
  		url_img: category.url_img,
  		name: category.name,
  		description: category.description
  	});
  }

  deleteCategory($key: string) {
  	this.categoryList.remove($key);
  }

}
