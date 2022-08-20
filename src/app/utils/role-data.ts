import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
    roles: Role[]
  constructor() {
    this.roles=[]
    this.roles.push({id:1,role:"Super Admin"});
    this.roles.push({id:2,role:"Admin"});
    this.roles.push({id:3,role:"Student"});
    this.roles.push({id:4,role:"In-Active"});
   }
  
  getRoleName(id:number){
     return this.roles[id-1].role
  }
  getRoleId(role:string):number{
    let id=0
     this.roles.forEach((val)=>{
          if(val.role==role)
          { id=val.id;
          }
     });
     return id
  }
}