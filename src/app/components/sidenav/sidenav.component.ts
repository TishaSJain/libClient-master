import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  userData: User
  constructor() { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
  }

}
