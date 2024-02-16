import { Component, OnInit } from '@angular/core';
import { task } from 'src/app/model/task';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  tasklist: task[] = [];
  id: string = '';
  taskname: string = '';
  taskdiscription: string = '';
  email: string = '';
  taskobj: task = {
    id: '',
    taskname: '',
    taskdiscription: '',
    email: '',
  };

  constructor(
    private auth: AuthService,
    private data: DataService,
    private plateformlocaton: PlatformLocation
  ) {
    // history.pushState(null, '', location.href);
    // this.plateformlocaton.onPopState(() => {
    //   history.pushState(null, '', location.href);
    // });
  }

  userEmail: string = '';

  ngOnInit(): void {
    this.userEmail = this.auth.getUserEmail();
    this.getalltask();
  }
  Logout() {
    this.auth.logout();
  }

  getalltask() {
    this.data.getalltask().subscribe(
      (res) => {
        this.tasklist = res.map((e: any) => {
          const data = e.payload.doc.data();

          data.id = e.payload.doc.id;

          return data;
        });
      },
      (err) => {
        alert('getting error fecting data of task ');
      }
    );
  }

  //add task

  addtask() {
    if (this.taskname == '' || this.taskdiscription == '' || this.email == '') {
      alert('fill all the field ');
    }
    this.taskobj.id = '';
    this.taskobj.email = this.email;
    this.taskobj.taskname = this.taskname;
    this.taskobj.taskdiscription = this.taskdiscription;

    this.data.addtask(this.taskobj);

    this.resetform();
  }

  //update task

  // updatetask() { }

  //delete task

  deletetask(task: task) {
    if (window.confirm('are sure you went to delete task' + task.email))
      this.data.deletetask(task);
  }

  //reset form

  resetform() {
    (this.id = ''),
      (this.taskname = ''),
      (this.taskdiscription = ''),
      (this.email = '');
  }
}
