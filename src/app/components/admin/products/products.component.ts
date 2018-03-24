import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
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

	productList: Product[] = [];
	displayedColumns = ['name', 'description', 'price', 'stock', 'category'];

  constructor(
  	private productService: ProductService,
  	private toastr: ToastrService,
  	public dialog: MatDialog
  ) { }

	ngOnInit() {
		this.productService.getProducts()
	  		.snapshotChanges()
	  		.subscribe(item => {
	  			this.productList = [];
	  			//console.log(item);
	  			item.forEach(el => {
	  				let x = el.payload.toJSON();
	  				x["$key"] = el.key;
	  				this.productList.push(x as Product);
	  			});
	  			console.log(this.productList);
	  		});
	}

  	passDataNew() {
    	let dialogRef = this.dialog.open(ProductsNewComponent, {disableClose: true, autoFocus: false});
   	}

}
