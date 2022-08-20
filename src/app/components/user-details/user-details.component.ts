import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewUser } from 'src/app/models/newUser';
import { RoleService } from 'src/app/utils/role-data';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userData: NewUser
  // @Output() removeUser: EventEmitter<NewUser> = new EventEmitter();
  @Output() editUser: EventEmitter<NewUser> = new EventEmitter();
  closeResult:string;
  constructor(private modalService: NgbModal,private roleService: RoleService) {   
   }

  ngOnInit(): void {
   console.log("Before",this.userData)
    this.userData.user_type=this.roleService.getRoleName(parseInt(this.userData.user_type))
  }

  openEdit(user : NewUser) {
    this.editUser.emit(user)
  }
}
