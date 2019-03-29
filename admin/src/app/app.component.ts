import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'admin';
  private login = 0;
  constructor(private _router:Router){}
  ngOnInit() {
    //console.log(this._router.url)
    if(!!localStorage.getItem('token') && this._router.url !== "/"){
      this.login=1;
      //this._router.navigate(['/admin/dashboard'])
    }else{
      this.login=0;
      //console.log(localStorage.getItem('token'))
    }
    //console.log('On ng'+ this.login)
  }
  ngDoCheck() {
    //console.log('On ng do check '+ this._router.url)
    if(!!localStorage.getItem('token') && this._router.url !== "/login"){
      this.login=1;
    }else{
      this.login=0;
      //console.log(localStorage.getItem('token'))
    }
    //console.log('On ng do check'+ this.login)
  }
}
