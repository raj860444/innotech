import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  name = localStorage.getItem('name');
  profileImageName = localStorage.getItem('profileImageName');
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

}
