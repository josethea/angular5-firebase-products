import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';

//angular material
import { 
  MatButtonModule, 
  MatCheckboxModule, 
  MatToolbarModule, 
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';

//firebase
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

//services
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';

//components
import { AdminComponent } from './components/admin/admin/admin.component';
import { LayoutComponent } from './components/portal/layout/layout.component';

import { CategoriesComponent } from './components/admin/categories/categories.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { HomeComponent } from './components/admin/home/home.component';


const appRoutes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent, 
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    component: LayoutComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LayoutComponent,
    CategoriesComponent,
    ProductsComponent,
    HomeComponent
  ],
  imports: [
  	RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    BrowserModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

