import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  constructor(
  	private categoryService: CategoryService,
  	private toastr: ToastrService,
  	public dialogRef: MatDialogRef<CategoriesEditComponent>
  ) { }

  ngOnInit() {
  }

  onSave(categoryForm: NgForm){
  	console.log(categoryForm);
  	this.categoryService.updateCategory(categoryForm.value);
  	this.toastr.success('Successful Operation', 'Category has been updated sucessfully ');
  	this.onClose();
  }

  onClose(){
  	this.dialogRef.close();
  }

}
