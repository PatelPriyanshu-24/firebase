import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  Signup() {
    if (this.email == '') {
      alert('enter email Id');
      return;
    }
    if (this.password == '') {
      alert('enter email password');
      return;
    }

    this.auth.signup(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googlesignin();
  }
}
