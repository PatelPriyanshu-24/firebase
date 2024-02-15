import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Redirect to dashboard if user is already logged in
    if (this.auth.authentication()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.email == '') {
      alert('enter email Id');
      return;
    }
    if (this.password == '') {
      alert('enter email password');
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
  signInWithGoogle() {
    this.auth.googlesignin();
  }
}
