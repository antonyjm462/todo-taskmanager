import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { SlackserviceService } from '../slackservice.service';
import { StorageServiceModuleService } from '../storage-service-module.service';
import { SlackUser } from '../model/slack-user';
import { DatabaseApiService } from '../database-api.service';

const STORAGE_KEY = 'local_todolist';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userList: any;
  slackuser: SlackUser[];
  error = '';
  success = '';

  constructor(public router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService,public slackservice: SlackserviceService,public localstorageservice: StorageServiceModuleService
  ,public databaseapi: DatabaseApiService) {
    this.user = this.storage.get(STORAGE_KEY);
    this.getuserList();
   }
   
  ngOnInit() {
    console.log(this.storage.get(STORAGE_KEY));
    setTimeout(() => {
      // console.log(this.userList);
      this.localstorageservice.storeMembers(this.userList.members);
      }, 1000);
      this.getslackuser();
  }
  
  dashboard(){
    this.router.navigate(['dashboard']);
  }
  task(){
    this.router.navigate(['task']);
  }
  space(){
    this.router.navigate(['spaces']);
  }
  member(){
    this.router.navigate(['members']);
  }
  logout(){
    this.router.navigate(['logout']);
  }

  getuserList = () =>
  this.slackservice
    .getusers()
    .subscribe((res: any) => {this.userList = res});


  getslackuser(){
    this.databaseapi.getuser().subscribe(
      (res: SlackUser[]) => {
        this.slackuser = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}


