import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	categoryList: Category[] = [];
	displayedColumns = ['url_img', 'name', 'description', 'operations'];
	//dataSource: Category[] = [];

  constructor(
  	private categoryService: CategoryService,
  	private toastr: ToastrService
  ) { }

  	ngOnInit() {
	  	//this.dataSource = this.categoryList;
	  	this.categoryService.getCategories()
	  		.snapshotChanges()
	  		.subscribe(item => {
	  			this.categoryList = [];
	  			console.log(item);
	  			item.forEach(el => {
	  				let x = el.payload.toJSON();
	  				x["$key"] = el.key;
	  				this.categoryList.push(x as Category);
	  			});
	  			console.log(this.categoryList);
	  		});
  	}

  	onSubmit(categoryForm: NgForm) {
  		console.log(categoryForm);
  		console.log(categoryForm.value);
  		this.categoryService.insertCategory(categoryForm.value);
  		this.toastr.success('Successful Operation', 'Category added successfully');
  	}

}
