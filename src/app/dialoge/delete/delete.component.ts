import { Component, OnInit, Inject, Optional  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  action:string;
  data:any;
  formInstance: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public localdata: any) {
      this.formInstance = new FormGroup({ 
        "id":  new FormControl(),
        "firstName": new FormControl('', Validators.required),
        "lastName": new FormControl('', Validators.required),
        "address": new FormControl(),
        "mobileNo": new FormControl(),
        "isActive": new FormControl(),
        "emailId": new FormControl(),
        "createdBy": new FormControl(),
        "createdOn": new FormControl(),
        "modifiedBy": new FormControl(),
        "modifiedOn": new FormControl(),
        "userId": new FormControl(),
        "password": new FormControl(),
        "action": new FormControl(),
        "actionvalue":new FormControl()
        
        
      });
      this.formInstance.controls["actionvalue"].setValue("");
      this.formInstance.setValue(localdata);
    this.data = {localdata};
    this.action = this.data.action;
  }


  ngOnInit(): void {
  }
  save(): void {
    this.formInstance.controls["actionvalue"].setValue("save");
    this.dialogRef.close(Object.assign(new User(), this.formInstance.value,"save"));
  }
  close() {
    this.formInstance.controls["actionvalue"].setValue("close");
    this.dialogRef.close(Object.assign(new User(), this.formInstance.value));
}
}
