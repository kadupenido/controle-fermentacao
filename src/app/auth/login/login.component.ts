import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.authService.isLoggedIn().subscribe((user) => {
      if (user)
        this.router.navigate(['/fermentacao']);
    });
   }

  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/fermentacao']);
      })
      .catch(() => {
        this.toastr.error('Usuario ou senha invalidos!');
      });
  }

}
