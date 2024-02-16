import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  private isauthentication = false;

  authentication(): boolean {
    return this.isauthentication;
  }

  // login method
  private userEmail = 'email';
  login(email: string, password: string): any {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        localStorage.setItem(this.userEmail, email);
        if (res.user?.emailVerified == true) {
          if (email == 'patelpriyanshuofc@gmail.com') {
            localStorage.setItem(this.userEmail, email);
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', 'true');
            this.isauthentication = true;
          } else {
            this.router.navigate(['userdashboard']);
            localStorage.setItem(this.userEmail, email);
            localStorage.setItem('token', 'true');
            this.isauthentication = true;
          }
        } else {
          alert('first verify your email');
        }
      },
      (err) => {
        alert('something wemt wrong');

        this.router.navigate(['/login']);
      }
    );
  }

  // register method

  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('signup successfully & verify your email first');
        this.SendVerficationEmail(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('something went wrong');

        this.router.navigate(['/signup']);
      }
    );
  }

  // logut method

  logout() {
    this.fireauth.signOut().then(
      () => {
        this.isauthentication = false;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }

  // forget password

  forgetpassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/varify-email']);
      },
      (err) => {
        alert('something went wornge');
      }
    );
  }

  // send email for varification to user

  SendVerficationEmail(user: any) {
    this.fireauth.currentUser
      .then((u) => u?.sendEmailVerification())
      .then(
        (res: any) => {
          this.router.navigate(['/verify-email']);
        },
        (err: any) => {
          alert(
            'Something Went Wrong. Not able to send mail to registered Email.'
          );
        }
      );
  }

  // SIGN IN WITH GOOGLE

  googlesignin() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' }); // Force account selection
    return this.fireauth.signInWithPopup(provider).then(
      (res) => {
        const email = res.user?.email;
        if (email) {
          if (email == 'patelpriyanshuofc@gmail.com') {
            localStorage.setItem(this.userEmail, email);
            this.router.navigate(['/dashboard']);
                      localStorage.setItem('token', 'true');

            this.isauthentication = true;
          } else {
            this.router.navigate(['/userdashboard']);
            localStorage.setItem(this.userEmail, email);
                       localStorage.setItem('token', 'true');

            this.isauthentication = true;
          }

           localStorage.setItem('token', JSON.stringify(res.user?.uid));
        }
      },
      (err) => {
        alert(' error');
      }
    );
  }

  getUserEmail() {
    return localStorage.getItem(this.userEmail) || '';
  }
}
