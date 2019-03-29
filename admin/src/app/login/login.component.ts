import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {}
  constructor(private _auth: AuthService, private _router: Router) { }
  loginForm = new FormGroup({
     email: new FormControl(''),
     password: new FormControl(''),
   });
  ngOnInit() {
  }
  loginUser () {
      this._auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('profileImageName', res.data.profileImageName)
          this._router.navigate(['/admin/dashboard'])
        },
        err => console.log(err)
      )
    }
}
