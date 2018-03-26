import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { Product } from '../../../../models/product';
import { Category } from '../../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
	categoryList: any[] = [];

  constructor(
  	private productService: ProductService,
  	private categoryService: CategoryService,
  	private toastr: ToastrService,
  	public dialogRef: MatDialogRef<ProductsEditComponent>
  ) { }

  ngOnInit() {
  	this.categoryService.getCategories()
  		.snapshotChanges()
  		.subscribe(item => {
  			this.categoryList = [];
  			item.forEach(el => {
  				let x = el.payload.toJSON();
  				x["$key"] = el.key;
  				this.categoryList.push(x as Category);
  			});
  			console.log(this.categoryList);
  		});
  }

  onSave(productForm: NgForm) {
  	console.log(productForm.value);
  	this.productService.updateProduct(productForm.value);
  	this.toastr.success('Successful Operation', 'Product has been updated successfully');
  	this.onClose();
  }

  onClose(){
  	this.dialogRef.close();
  }

}
