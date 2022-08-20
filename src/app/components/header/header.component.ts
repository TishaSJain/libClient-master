import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userData: User
  @Output() toogleSidebarEvent: EventEmitter<any>=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
  }
  toggleSidebar(){
    // console.log("Sidebar")
    this.toogleSidebarEvent.emit()
  }
  logout(){
    localStorage.clear()
    location.reload()
  }
}
