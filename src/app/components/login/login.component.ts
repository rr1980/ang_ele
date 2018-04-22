import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "rr1980";
  password: string = "test";

  constructor(private router: Router, private authService: AuthService) { };

  ngOnInit() {
  };

  onClickLogin() {
    this.authService.Login({ username: this.username, password: this.password });
  };
}
