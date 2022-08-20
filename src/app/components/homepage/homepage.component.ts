import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { BooksService } from 'src/app/service/books.service';
import { ApiResponse } from 'src/app/models/api-response';
import { Books } from 'src/app/models/books';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueService } from 'src/app/service/issueService';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  bookIssued:string
  closeResult:string;
  newBookForm: FormGroup;
  error:string;
  booksData:Books[];
  userData: User;
  editBookData: Books;
  @ViewChild('addBookButton') addBookButton: any
  constructor(private booksSerivce: BooksService,private issueService: IssueService ,private fb: FormBuilder,private modalService: NgbModal) {
    this.userData = JSON.parse(localStorage.getItem('userData') || 'null') as User;
    this.newBookForm = fb.group({});
    this.booksData=[];
   }

  ngOnInit(): void {
    this.newBookForm = this.fb.group({
      bname:this.fb.control(''),
      author:this.fb.control(''),
      publisher:this.fb.control(''),
      image:this.fb.control(''),
      noOfCopies:this.fb.control(''),
    })
    this.booksSerivce.getBooks().subscribe(
      (response: ApiResponse<Books[]>) => {
        if (response.success) {
          for(let book of response.data){
            this.booksData.unshift(book);
          }
        }
        else {  
          alert(response.errorMessage)
        }
      });
  }
  open(content: any,book?: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    if(book!=null){
    this.editBookData=book;
    this.setForm(book);
    }
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
  clearForm() {
    this.Bname.setValue('');
    this.Author.setValue('');
    this.Publisher.setValue('');
    this.NoOfCopies.setValue('');
    this.Image.setValue('');
  }
  

  setForm(book: Books){
    this.Bname.setValue(book.bname)
    this.Author.setValue(book.author)
    this.Publisher.setValue(book.publisher)
    this.Image.setValue(book.image)
    this.NoOfCopies.setValue(book.noOfCopies)
  }

  submitBook(){
    let book: Books;
    if(this.editBookData!=null){
     book ={
        bid:this.editBookData.bid!,
        bname:this.Bname.value,
        author:this.Author.value,
        publisher:this.Publisher.value,
        image:this.Image.value,
        noOfCopies:this.NoOfCopies.value
      }
    }else{
      book ={
        bname:this.Bname.value,
        author:this.Author.value,
        publisher:this.Publisher.value,
        image:this.Image.value,
        noOfCopies:this.NoOfCopies.value
      }
    }
    this.booksSerivce.addBook(book).subscribe(
(response: ApiResponse<Books>)=>{
  if(response.success){
    if(this.editBookData!=null){ this.editBookData.bid=0}
    this.clearForm();
    this.modalService.dismissAll();
    location.reload();
  }else{
  this.error=response.errorMessage
  }
}
    );
  }

  issueBook(uid: number,bid: number){
    this.issueService.addIssue(uid,bid).subscribe(
      (response: ApiResponse<string>)=>{
        if(response.success){
         this.bookIssued=response.data
         setTimeout(this.reloadPage, 1000);
        }else{
          this.bookIssued=response.errorMessage
        }
      }
    );
  }
reloadPage(){
  location.reload()
}
  closedAlert(){
    this.bookIssued=''
  }

  public get Bname(): FormControl {
    return this.newBookForm.get('bname') as FormControl;
  }
  public get Author(): FormControl {
    return this.newBookForm.get('author') as FormControl;
  }
  public get Publisher(): FormControl {
    return this.newBookForm.get('publisher') as FormControl;
  }
  public get Image(): FormControl {
    return this.newBookForm.get('image') as FormControl;
  }
  public get NoOfCopies(): FormControl {
    return this.newBookForm.get('noOfCopies') as FormControl;
  } 
}
