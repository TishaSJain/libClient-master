import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksIssuedAdminComponent } from './components/books-issued-admin/books-issued-admin.component';
import { BooksIssuedComponent } from './components/books-issued/books-issued.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent },
  {path:'',redirectTo:'/dashboard/home',pathMatch:'full'},
  {path: 'dashboard', component: MainComponentComponent,
    children: [
      //common
      { path: 'home', component: HomepageComponent },
         //user
      { path: 'issues', component: BooksIssuedComponent },
      //common
      { path: 'profile', component: ProfileComponent },
        //admin
      { path: 'users', component: ManageUsersComponent },
        //admin
      { path: 'books-issued/all', component: BooksIssuedAdminComponent },
      { path: 'students-books', component: StudentsDetailsComponent },
      {path:'',redirectTo:'/dashboard/home',pathMatch:'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
