import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiResponse } from 'src/app/models/api-response';
import { NewUser } from 'src/app/models/newUser';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { RoleService } from 'src/app/utils/role-data';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  closeResult:string;
  newUserForm: FormGroup;
  userData:User;
  error:string;
  users: NewUser[];
  usersDisplayed: NewUser[];
  @ViewChild('addUserButton') addUserButton: any
  constructor( private fb: FormBuilder,private modalService: NgbModal,private userService: UserService,private roleService: RoleService) {
    this.userData=JSON.parse(localStorage.getItem('userData')|| 'null') as User
    this.newUserForm = fb.group({});
    this.users=[]
    this.usersDisplayed=this.users
   }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      name:this.fb.control(''),
      email:this.fb.control(''),
      password:this.fb.control(''),
      userType:this.fb.control(''),
    })
     this.userService.getUsers(this.userData.uid!).subscribe(
      (response: ApiResponse<NewUser[]>)=>{
        if(response.success){
          for(let user of response.data){
            this.users.unshift(user);
          }
          this.usersDisplayed=this.users
        }
            }
     );
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

  // deleteUser(user: NewUser){
  //   const data = this.usersDisplayed.indexOf(user)
  //   this.usersDisplayed.splice(data,1)
  // }

  editUser(user: NewUser,content:any){
    this.setForm(user)
    this.open(content)
  }

  setForm(user: NewUser){
    this.Name.setValue(user.name)
    this.Email.setValue(user.email)
    this.UserType.setValue(this.roleService.getRoleId(user.user_type).toString())
  }
  submitUser(){
    let role : Role={
      id: parseInt(this.UserType.value),
      role:''
    }
    let newUser: User ={
      name: this.Name.value,
      email: this.Email.value,
      password: this.Password.value,
      role: role
    }
    this.userService.createUser(newUser).subscribe(
      (response:ApiResponse<NewUser>)=>{
            if(response.success){
              location.reload();
              this.clearForm();
              this.modalService.dismissAll();
            }else{
            this.error=response.errorMessage
            }
      });
  }
  clearForm() {
    this.Name.setValue('');
    this.Email.setValue('');
    this.Password.setValue('');
    this.UserType.setValue('');
  }

  // searchUsers(input: string){
  //   let filteredUsers: NewUser[] = [];
  //   if(input===''){
  //      this.usersDisplayed=this.users
  //   }else{
  //      filteredUsers = this.users.filter((val,index)=>{
  //       let name = val.name.toLowerCase();
  //       let inputName = input.toLowerCase();
  //       return name.includes(inputName);
  //      })
  //      this.usersDisplayed=filteredUsers;
      
  //   }
  // }

  public get Name(): FormControl {
    return this.newUserForm.get('name') as FormControl;
  }
  public get Email(): FormControl {
    return this.newUserForm.get('email') as FormControl;
  }
  public get Password(): FormControl {
    return this.newUserForm.get('password') as FormControl;
  }
  public get UserType(): FormControl {
    return this.newUserForm.get('userType') as FormControl;
  }
}
