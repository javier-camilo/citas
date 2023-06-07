import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public router: Router) {}

  login() {
    console.log(this.email);
    console.log(this.password);
    this.router.navigateByUrl('/menu');
  }

  ngOnInit(): void {
  }

}
