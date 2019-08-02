import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { MatDialog } from '@angular/material';
import { Project } from '../model/project';
import { List } from '../model/list';
import { Task } from '../model/task';
import { SlackserviceService } from '../slackservice.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'members';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  userList: any;
  user: any;

  constructor(private firestore: AngularFirestore, private firebaseService: FirebaseService,public slackservice: SlackserviceService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { 
      this.userList = this.storage.get(STORAGE_KEY);
      this.user = this.storage.get('local_todolist');
      console.log(this.userList);
    }

  ngOnInit() {
  }

}
