import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	categoryList: Category[] = [];
	displayedColumns = ['url_img', 'name', 'description', 'operations'];

  constructor(
  	private categoryService: CategoryService,
  	private toastr: ToastrService,
  	public dialog: MatDialog
  ) { }

  	ngOnInit() {
	  	this.categoryService.getCategories()
	  		.snapshotChanges()
	  		.subscribe(item => {
	  			this.categoryList = [];
	  			//console.log(item);
	  			item.forEach(el => {
	  				let x = el.payload.toJSON();
	  				x["$key"] = el.key;
	  				this.categoryList.push(x as Category);
	  			});
	  			console.log(this.categoryList);
	  		});
  	}

  	onSubmit(categoryForm: NgForm) {
  		//console.log(categoryForm);
  		//console.log(categoryForm.value);
  		this.categoryService.insertCategory(categoryForm.value);
  		this.toastr.success('Successful Operation', 'Category added successfully');
  	}

  	passDataEdit(category: Category) {
      //console.log(category);
  		this.categoryService.selectedCategory = Object.assign({}, category);
      //console.log(this.categoryService.selectedCategory);
  		let dialogRef = this.dialog.open(CategoriesEditComponent,{disableClose: true, autoFocus: false});
  	}

    passDataNew() {
      let dialogRef = this.dialog.open(CategoriesNewComponent, {disableClose: true, autoFocus: false});
    }

    onDelete($key: string) {
      console.log($key);
      if(confirm('Are you sure you want to delete it?')) {
        this.categoryService.deleteCategory($key);
        this.toastr.success('Successfull operation', 'Category deleted');
      }
    }

  	// onEdit(category: Category) {
  	// 	this.categoryService.updateCategory(category);
  	// }

}
