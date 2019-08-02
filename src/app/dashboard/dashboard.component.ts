import { Component, OnInit, TemplateRef, ViewChild, Inject, getDebugNode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { SlackserviceService } from '../slackservice.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatePipe } from '@angular/common';

const STORAGE_KEY = 'members';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  AssignedList: any;
  userList: any;
  user: any;
  task: any = [];
  totaltask: any;
  taskList: any;
  today: string;
  duetask: any;
  assgined: any;
  closed: any;

  constructor(private firestore: AngularFirestore, private firebaseService: FirebaseService, public slackservice: SlackserviceService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.taskList = null;
    this.getTask();
    this.userList = this.storage.get(STORAGE_KEY);
    this.user = this.storage.get('local_todolist');
    console.log(this.userList);
  }

  ngOnInit() {
  }

  getTask = () =>
    this.firebaseService
      .getItem("task")
      .subscribe((res: any) => {
      this.taskList = res;
        console.log(this.taskList);
        this.getTaskAssigned();
        this.getAssigned();
        this.getDue();
        this.getclosed();
      });

  getTaskAssigned() {
    this.taskList.forEach(user => {
      if (user.data.uid == this.user.id) {
        this.task.push(user)
      }
      this.totaltask = (this.task.length);
    });
  }
  getAssigned() {
    var i;
    this.assgined = 0;
    for (i = 0; i < this.task.length; i++) {
      if(this.task[i].data.status == 1 ){
        this.assgined = this.assgined +1;
      }
    }
  }
  getDue() {
    var i;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = mm + '/' + dd + '/' + yyyy;
    var day_now = Date.parse(this.today);
    console.log(day_now);
    console.log(this.today);
    this.duetask = 0;
    for (i = 0; i < this.task.length; i++) {
      var date = new Date(this.task[i].data.duedate.toDate())
      var date_task = date.toLocaleDateString();
      var date_next  = Date.parse(date_task);
      console.log(date_next);
      if(day_now <= date_next){
        this.duetask = this.duetask+1;
      }
    }
  }
  getclosed() {
    var i;
    this.closed = 0;
    for (i = 0; i < this.task.length; i++) {
      if(this.task[i].data.status == 4 ){
        this.closed = this.closed +1;
      }
    }
  }

}