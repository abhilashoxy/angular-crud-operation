import { User } from './../../user';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formInstance: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    private service:UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.formInstance = new FormGroup({ 
      "id":  new FormControl(),
      "firstName": new FormControl('', Validators.required),
      "lastName": new FormControl('', Validators.required),
      "address": new FormControl(),
      "mobileNo": new FormControl(),
      "isActive": new FormControl(),
      "emailId": new FormControl('', Validators.required),
      "createdBy": new FormControl(),
      "createdOn": new FormControl(),
      "modifiedBy": new FormControl(),
      "modifiedOn": new FormControl(),
      "userId": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required),
      "action": new FormControl(),
      "actionvalue":new FormControl()
      
      
    });
    this.formInstance.controls["actionvalue"].setValue("");
   
  }

  ngOnInit(): void {
  }
  save(): void {
    this.formInstance.controls["actionvalue"].setValue("save");
    this.dialogRef.close(Object.assign(new User(), this.formInstance.value));
  }
  close() {
    this.formInstance.controls["actionvalue"].setValue("close");
    this.dialogRef.close(Object.assign(new User(), this.formInstance.value));
}

}
