import { Books } from "./books";
import { User } from "./user";

export interface Issue {
    id : number;
    books : Books;
    returnDate? : string;
    user?:User;
    dueDate : string;
    issueDate : string;
}