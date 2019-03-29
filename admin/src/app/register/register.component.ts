import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService,private _fb: FormBuilder, private _router:Router) { }

  registerForm : FormGroup;
  msg: any='';

  ngOnInit() {

    this.registerForm = this._fb.group({
      email: ["", [Validators.required , Validators.pattern(new RegExp(/^[a-z0-9][a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))]],
      password: ["", [Validators.required]],
      type:["",""]
    });
    
    this.registerForm.setValue({"type":1 , "password":"" , "email":""});
  }

   /*getter for email*/
  get email(): FormControl {
    return <FormControl>this.registerForm.get("email");
  }
  /*getter for password*/
  get password(): FormControl {
    return <FormControl>this.registerForm.get("password");
  }


  registerUser(event){
    this.msg='';
    this._auth.registerUser(this.registerForm.value)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/admin/dashboard'])
      },
      err => {
          this.msg = err.error.message;
          console.log(err)
      }
    )
  }
}
