import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { RoleService } from 'src/app/utils/role-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:User;
  error:string;
  closeResult:string;
  constructor(private modalService: NgbModal,private roleService: RoleService,private userService:UserService) {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
   }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submitChange(currentPass: any,newPass:any){
        this.userService.changePassword(this.userData.uid!,newPass,currentPass).subscribe(
          (response:ApiResponse<string>)=>{
                        if(response.success){
                          this.modalService.dismissAll()
                        }else{
                          this.error=response.data;
                        }
          }
        );
  }
}
