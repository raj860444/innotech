import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AdminService } from './../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any;
  serverError: any;
  constructor(private fb: FormBuilder, private _adminService: AdminService) { }

  ngOnInit() {
    this.fetchData();
  }
  onSubmit(){
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this._adminService.updateProfile(this.profileForm.value)
    .subscribe(result=>{
      console.log(result)
      this.fetchData()
    },
    err=> {
              console.log(err)
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 409) {
                  this.serverError = err.error.message
                }
                if (err.status === 401) {
                  this.serverError = 'Unauthorization Error plz logout and login again'
                }
              }
          })
  }


  fetchData(){
    this._adminService.fetchUserData()
    .subscribe(data=>{
                this.data = data.result;
                console.log(this.data);
                this.profileForm
                .patchValue({
                              name: this.data.name,
                              mobile: this.data.mobile,
                              email: this.data.email
                            });

              },
              err=> { 
                        console.log(err)
                        if( err instanceof HttpErrorResponse ) {
                          if (err.status === 409) {
                            this.serverError = err.error.message
                          }
                          if (err.status === 401) {
                            this.serverError = 'Unauthorization Error plz logout and login again'
                          }
                        }
                    }
                  )
  }
  onFileChange(event){
    if(event.target.files && event.target.files.length) {
      const file: File = event.target.files[0];
      this.profileImageForm.patchValue({profileImage: file});
      let formData = new FormData();
      formData.append('userImage', this.profileImageForm.get('profileImage').value);
      console.log(formData);
      this._adminService.uploadAdminImage(formData)
          .subscribe(result=>{
            console.log(result);
            this.data.profileImageName=result.result;
            localStorage.removeItem('profileImageName');
            localStorage.setItem('profileImageName', result.result);
          },
          err=>{
            console.log(err)
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 409) {
                this.serverError = err.error.message
              }
              if (err.status === 401) {
                this.serverError = 'Unauthorization Error plz logout and login again'
              }
            }
          })
    }
  }
  profileForm = this.fb.group({
          name: [''],
          mobile: [''],
          email: ['']
  });

  profileImageForm = this.fb.group({
    profileImage: ['']
  })

}
