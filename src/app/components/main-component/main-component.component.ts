import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router'
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css']
})
export class MainComponentComponent implements OnInit {
  userData: User
  sidebarStatus:boolean=true
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
    console.log(this.userData)
    if(this.userData==null){
      this.router.navigate(['/login'])}
  }
  sidebarToggle(){
    console.log("Sidebar")
    this.sidebarStatus=!this.sidebarStatus
  }

}
