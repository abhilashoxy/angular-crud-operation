import {Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../user';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialoge/delete/delete.component';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { EditComponent } from '../dialoge/edit/edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AddComponent } from '../dialogue/add/add.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
 
  displayedcolumns:  string[] = ['id','userId','firstName','lastName','mobileNo','address','actions'];
  users:User[]=[];
  items:any;
  userModel:User
  isCompleted:boolean
 
  dataSource: MatTableDataSource<User>;
  constructor(private service:UserService,public dialog: MatDialog,private _snackBar: MatSnackBar,translate: TranslateService) 
  { 

    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
this.isCompleted=true;
    this.getUsers();
   
  }
  openDialog(action,obj) {
    obj.action = action;
    obj.actionvalue="";
    if(action=="Edit")
    {
      const dialogRef = this.dialog.open(EditComponent, {
        height: '400px',
        width: '350px',
        data:obj,
        disableClose:true
      });
      dialogRef.afterClosed().subscribe(result => {
       if(result.actionvalue == "save")
       {
        this.service.editUser(result.id,result).subscribe((data)=>{
          this.openSnackBar(result.lastName+result.firstName+" "+"has been update successfully","Update");
          this.getUsers()
        },
        (err)=>{
          console.log(err)
          this.openSnackBar(err,"Error");
        }
        );
       }
       else{
        this.openSnackBar("You have closed the popup","Close");
       }
      });
    }
    else if(action=="Delete")
    {
      const dialogRef = this.dialog.open(DeleteComponent, {
        width: '250px',
        data:obj
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result.actionvalue == "save")
        {
          this.service.deleteUser(result.id).subscribe((res)=>
          {
            this.openSnackBar(result.lastName+result.firstName+" "+"has been deleted successfully","delete");
          
            this.getUsers()
          
        },
        (err)=>{
          this.openSnackBar(err,"Error");
        });
        }
        else{
          this.openSnackBar("The data is not deleted","Close");
        }
      });
    }
    else if(action=="Add"){
      const dialogRef = this.dialog.open(AddComponent, {
        width: '250px',
       
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result .actionvalue == "save")
        {
          this.service.addUser(result).subscribe((res)=>
          {
            this.openSnackBar(result.lastName+result.firstName+" "+"has been Added successfully","Add");
          
            this.getUsers()
           
        },
        (err)=>{
          this.openSnackBar(err,"Error");
        });
        }
        else{
          this.openSnackBar("The data is not Added","Close");
        }
      });
    }
  }
openAddDialog(){
 
  
  const dialogRef = this.dialog.open(AddComponent, {
    width: '250px',
   
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result.actionvalue == "save")
    {
      this.service.addUser(result).subscribe((res)=>
      {
        this.openSnackBar(result.lastName+result.firstName+" "+"has been Added successfully","Add");
      
        this.getUsers()
       
    },
    (err)=>{
      console.log(err);
      this.openSnackBar(err,"Error");
    });
    }
    else{
      this.openSnackBar("The data is not Added","Close");
    }
  });
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  getUsers() {
    this.service.getAllUsers().subscribe(
      data=>{
this.items=data;
this.dataSource.data=this.items;
this.isCompleted=false;
      }
   );
 }

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}
ngAfterViewInit (){
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.matSort;
}

exportXlsx(){

  const ws_name = 'Employee App';
  const wb: WorkBook = { SheetNames: [], Sheets: {} };
  const ws: any = utils.json_to_sheet(this.items);
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
  }

  saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `EmployeeList.xlsx`);
}
}
