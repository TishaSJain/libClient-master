import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email : string
  password : string
  userData: User
  constructor(private userService : UserService,private router: Router) { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
    if(this.userData!=null){
      this.router.navigate(['/dashboard/home'])
  }
  }

  onSubmit(){
   this.userService.userLogin(this.email,this.password).subscribe(
      (response: ApiResponse<User>) =>{
        if(response.success){
          if(response.data.role.id==4){
            alert("You have been Marked InActive by Admin");
            location.reload()
          }else{
          localStorage.setItem("userData",JSON.stringify(response.data))
          alert("Success");
this.router.navigate(['/dashboard']);
}
        }else{
          alert(response.errorMessage);
        }
      });
  }
}
