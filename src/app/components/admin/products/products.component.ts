import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsNewComponent } from './products-new/products-new.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	productList: any[] = [];
	displayedColumns = ['url_img', 'name', 'description', 'price', 'stock', 'category_name', 'operations'];

  constructor(
  	private productService: ProductService,
  	private categoryService: CategoryService,
  	private toastr: ToastrService,
  	public dialog: MatDialog
  ) { }

	ngOnInit() {
		this.categoryService.getCategories()
        .snapshotChanges()
        .subscribe(item => {
          this.productService.categoryArray = [];
          //console.log(item);
          item.forEach(el => {
            let x = el.payload.toJSON();
            x["$key"] = el.key;
            this.productService.categoryArray.push(x as Category);
          });
          //console.log(this.categoryList);
          //this.categoryService.categoryArray = this.categoryList;
        });

		this.productService.getProducts()
	  		.snapshotChanges()
	  		.subscribe(item => {
	  			this.productList = [];
	  			//console.log(item);
	  			item.forEach(el => {
	  				let x = el.payload.toJSON();
	  				x["$key"] = el.key;
	  				let y = {
	  					...x,
	  					category_name: this.productService.getCategory(x["category_key"])
	  				}
	  				//console.log(y);
	  				this.productList.push(y);
	  				//this.productList.push(x as Product);
	  			});
	  			//console.log(this.productList);
	  		});
	}

	// getCategory($key: string) {
	// 	console.log('entro getcategory de product component');
	// 	return this.productService.getCategory($key);
	// }

	passDataEdit(product: Product) {
      //console.log(category);
  		this.productService.selectedProduct = Object.assign({}, product);
      //console.log(this.categoryService.selectedCategory);
  		let dialogRef = this.dialog.open(ProductsEditComponent,{disableClose: true, autoFocus: false});
  	}

  	passDataNew() {
    	let dialogRef = this.dialog.open(ProductsNewComponent, {disableClose: true, autoFocus: false});
   	}

   	onDelete($key: string) {
      console.log($key);
      if(confirm('Are you sure you want to delete it?')) {
        this.productService.deleteProduct($key);
        this.toastr.success('Successfull operation', 'Product deleted');
      }
    }

}
