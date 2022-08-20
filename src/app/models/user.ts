import { Role } from "./role";

export interface User {
    uid? : number;
    name : string;
    email : string;
    role : Role;
    password : string;
}