import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  data:any;
  serverError: any;
  constructor(private fb: FormBuilder, private _adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  profileForm = this.fb.group({
          oldPassword: ['', Validators.required],
          newPassword: ['', Validators.required],
          confirmPassword: ['']
  }, {validator: PasswordValidation.MatchPassword});



  onSubmit(){
    console.warn(this.profileForm.value);
    this._adminService.changePassword(this.profileForm.value)
                  .subscribe(result=>{
                      this.toastr.success('Password updated', 'Success!');
                  },
                  err=>{
                    console.log(err)
                              if( err instanceof HttpErrorResponse ) {
                                if (err.status === 409) {
                                  this.serverError = err.error.message
                                  this.toastr.error(this.serverError);
                                }
                                if (err.status === 401) {
                                  this.serverError = 'Unauthorization Error plz logout and login again'
                                  this.toastr.error('Unauthorization Error plz logout and login again');
                                }
                              }

                  })
  }
  get oldPassword() { return this.profileForm.get('oldPassword'); }
  get newPassword() { return this.profileForm.get('newPassword'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }
}
