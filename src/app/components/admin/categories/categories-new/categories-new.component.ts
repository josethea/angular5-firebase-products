import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.css']
})
export class CategoriesNewComponent implements OnInit {

  constructor(
  	private categoryService: CategoryService,
  	private toastr: ToastrService,
  	public dialogRef: MatDialogRef<CategoriesNewComponent>
  ) { }

  ngOnInit() {
  }

  onSave(categoryForm: NgForm){
  	console.log(categoryForm);
  	this.categoryService.insertCategory(categoryForm.value);
  	this.toastr.success('Successful Operation', 'Category has been added sucessfully ');
  	this.onClose();
  }

  onClose(){
  	this.dialogRef.close();
  }

}
