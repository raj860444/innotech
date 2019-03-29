import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private serverError ='';
  public token: string;
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router , private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  resetPasswordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {validator: PasswordValidation.MatchPassword})
  get password() { return this.resetPasswordForm.get('password'); }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword'); }

  onSubmit(){
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    this._auth.resetPassword(this.token, this.resetPasswordForm.value)
    .subscribe(result=>{
      this.toastr.success('Password changed Successfully', 'Success!');
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
}
