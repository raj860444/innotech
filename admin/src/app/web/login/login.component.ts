import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { Router } from '@angular/router';
import { AuthService as AuthS } from '../../auth.service';
import { AuthGuard } from '../../auth.guard';

import {
    AuthService,
    FacebookLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserData: any;
  
  loginForm: FormGroup;

  msg: any = '';

  constructor(private socialAuthService: AuthService ,private _fb: FormBuilder,private _auth: AuthS, private _router : Router ) {

   }
  
  /*getter for email*/
  get email(): FormControl {
    return <FormControl>this.loginForm.get("email");
  }
  /*getter for password*/
  get password(): FormControl {
    return <FormControl>this.loginForm.get("password");
  }

  ngOnInit() {
                 
    this.loginForm = this._fb.group({
      email: ["", [Validators.required , Validators.pattern(new RegExp(/^[a-z0-9][a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/))]],
      password: ["", [Validators.required]],
      type:["",""]
    });
    
    this.loginForm.setValue({"type":2 , "password":"" , "email":""});

  }
  
  user: any;

  public socialSignIn() {
      
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
   
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {


        console.log("facebook"+" sign in data : " , userData);
        // Now sign-in with userData
        // ...

        this.user = {"id":userData.id , "name":userData.name , "image":userData.image,"email":userData.email};

        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('type','1')
        this._router.navigate(['/home'])
            
      }
    ).catch(function(e) {
	  console.log('errord',e); // 'worky!'
	});
  }
  
  loginUser () {
      
      this.msg = '';

      this._auth.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          localStorage.setItem('name', res.data.name)
          
          localStorage.setItem('type', res.data.type)
          localStorage.setItem('name', res.data.name)
          localStorage.setItem('profileImageName', res.data.profileImageName)
          this._router.navigate(['/home'])
        },
        err => {
            
             this.msg = err.error.message;
             console.log("wer",err) 

        }
      )
  }
}
