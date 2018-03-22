import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

//firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//components
import { AdminComponent } from './components/admin/admin/admin.component';
import { LayoutComponent } from './components/portal/layout/layout.component';

import { CategoriesComponent } from './components/admin/categories/categories.component';
import { ProductsComponent } from './components/admin/products/products.component';


const appRoutes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent
  },
  { 
    path: '', 
    component: LayoutComponent, 
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LayoutComponent,
    CategoriesComponent,
    ProductsComponent
  ],
  imports: [
  	RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

