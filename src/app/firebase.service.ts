import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { Project } from './model/project';
import { List } from './model/list';
import { Task } from './model/task';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface UserAssigned{
  tid:any;
  uid:any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: any;
  id: any;
  name: any;
  number: any;
  dataList: { name: any; number: any; }[];

  constructor(private firestore: AngularFirestore, public db: AngularFireDatabase) {
    AngularFireModule.initializeApp(environment.firebase)
   }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
}

  getItem(item: string) {
    return this.firestore.collection(item).snapshotChanges().pipe(map( docArray => {
      return docArray.map( doc => {
        return(
          {
            id: doc.payload.doc.id,
            data: doc.payload.doc.data()
          }
        );
      });
    }));
  }


  createProject(space: Project) {
    return this.firestore.collection('project').add((JSON.parse(JSON.stringify(space))));
  }

  createList(list: List) {
    return this.firestore.collection('list').add((JSON.parse(JSON.stringify(list))));
  }

  createTask(task: Task) {
    return this.firestore.collection('task').add((JSON.parse(JSON.stringify(task))));
  }
  createAssign(Assign: UserAssigned){
    return this.firestore.collection('taskassigned').add((JSON.parse(JSON.stringify(Assign))));
  }

  updatespace(pid, value){
    return this.firestore.collection('project').doc(pid).update(value);
  }

  updatelist(lid, value){
    return this.firestore.collection('list').doc(lid).update(value);
  }

  updatetask(tid, value){
    return this.firestore.collection('task').doc(tid).update(value);
  }
// Deletes a single User
  deleteUser(username: string) {
    return this.firestore.collection('users').doc(username).delete();
  }

  deleteProject(pid: string)
    {
      return this.firestore.collection('project').doc(pid).delete();
    }
  deleteList(lid: string){
    return this.firestore.collection('list').doc(lid).delete();
  }
  deleteTask(tid: string){
    return this.firestore.collection('task').doc(tid).delete();
  }
}
