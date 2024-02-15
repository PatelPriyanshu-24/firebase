import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
})
export class UserdashboardComponent {
  tasks?: any[];
  userData: any[] = [];
  userEmail: string = '';
  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail();
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('/user', (ref) => ref.where('email', '==', user.email))
          .valueChanges()
          .subscribe((tasks) => {
            this.tasks = tasks;
          });
      }
    });
  }
  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  Logout() {
    this.auth.logout();
  }
}
