import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { task } from '../model/task';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  addtask(task: task) {
    task.id = this.afs.createId();
    return this.afs.collection('/user').add(task);
  }

  // all task

  getalltask() {
    return this.afs.collection('/user').snapshotChanges();
  }

  // delete task

  deletetask(task: task) {
    return this.afs.doc('/user/' + task.id).delete();
  }
}
