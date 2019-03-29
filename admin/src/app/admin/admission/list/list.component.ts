import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private class='12';
  private section='A';
  private serverError='';
  classArray: string[]=['Nursary', 'LKG', 'UKG', '1','2','3','4','5','6','7','8','9','10','11','12'];
  sections: string[]=['A', 'B', 'C', 'D'];
  branches: string[]
  admissions: string[]
  constructor(private _router:Router, private _adminservice:AdminService, private toastr:ToastrService, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData() {
    this._adminservice.getAllAdmission(this.class, this.section)
    .subscribe(
      res => {
        this.admissions = res.result.adminssions
        console.log(res)
      },
      err => {  console.log(err)
                if( err instanceof HttpErrorResponse ) {
                  if (err.status === 409) {
                    this.serverError = err.error.message
                  }
                  if (err.status === 401) {
                    this.serverError = 'Unauthorization Error plz logout and login again',
                    this.toastr.error('Unauthorization Error plz logout and login again', 'Error');
                    this._router.navigate(['/login'])
                  }
                }
            }
    )
  }
  // openConfirmationDialog() {
  //   this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
  //   .then((confirmed) => console.log('User confirmed:', confirmed))
  //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }
  deleteAdmisson(admissionId){
    this._adminservice.deleteAdmisson(admissionId)
    .subscribe(data=>{
      this.toastr.success('Admisson Deleted Successfully', 'Success :)');
      this.fetchData();
    },
    err=>{
      if (err.status === 500) {
        console.log(err)
        this.serverError = err.error
        this.toastr.error(err.error, '!Error');
      }else{
        this.toastr.error('Unknown error please check you input and try again', '!Error');
      }
    })
  }
  setClassName(className){
    this.class = className;
    this.fetchData()
  }
  setSectionName(sectionName){
    this.section =sectionName;
    this.fetchData()
  }


}
