import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private serverError = ''
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router , private toastr: ToastrService) { }

  ngOnInit() {
  }
  forgotPasswordForm = this.fb.group({
    email: ['', Validators.required],
  })

  onSubmit(){
    console.log(this.forgotPasswordForm.value)
    this._auth.forgotPassword(this.forgotPasswordForm.value)
    .subscribe(result=>{
      this.toastr.success('Recovery mail send to you Successfully', 'Success!');
      this._router.navigate(['/login'])
    },
    err=>{
          console.log(err)
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 409) {
              this.serverError = err.error.message
              this.toastr.error(this.serverError, 'Major Error', { timeOut: 3000 });
            }
            if (err.status === 401) {
              this.serverError = 'Unauthorization Error plz logout and login again'
              this.toastr.error(this.serverError,  'Major Error', { timeOut: 3000 });
            }
          }
    })
  }
  get email() { return this.forgotPasswordForm.get('email'); }


}
