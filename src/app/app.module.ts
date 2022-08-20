import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksIssuedComponent } from './components/books-issued/books-issued.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import { BooksIssuedAdminComponent } from './components/books-issued-admin/books-issued-admin.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomepageComponent,
    HeaderComponent,
    SidenavComponent,
    MainComponentComponent,
    BooksIssuedComponent,
    ProfileComponent,
    ManageUsersComponent,
    UserDetailsComponent,
    BooksIssuedAdminComponent,
    StudentsDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
     // * MATERIAL IMPORTS
     MatSidenavModule,
     MatToolbarModule,
     MatMenuModule,
     MatIconModule,
     MatDividerModule,
     MatListModule,
     MatTableModule,
     MatFormFieldModule,MatPaginatorModule,MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
