import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageServiceModuleService } from './storage-service-module.service';
import { DatabaseApiService } from './database-api.service';
import { SlackUser } from './model/slack-user';

export interface Token {
  access_token: any,
  user: any,
  team: any,
}

export interface Member {
  members: any,
}

export interface User {
  id: any,
  name: any,
  color: any,
  title: any,
  is_admin: any,
  is_owner: any,
  profile: {
    title: any,
    phone: any,
    real_name: any,
    display_name: any,
    first_name: any,
    last_name: any,
    image_512: any,
    team: any,
  },
}
@Injectable({
  providedIn: 'root'
})
export class SlackserviceService {
  oauthURL: string;
  client_id: string;
  client_secret: string;
  code: string;
  token: Token;
  endpoint: string;
  userlistURL: string;
  users: any;
  access_token: any;
  date: any;

  constructor(public http: HttpClient, public router: Router, public localstorageservice: StorageServiceModuleService,public databaseapi: DatabaseApiService) {
  }

  setcode(code) {
    this.date =  new Date().getTime()
    console.log(this.date);
    this.code = code;
    this.client_id = "667547175169.708236903284";
    this.client_secret = "fb9a7f1bd5bf8cf61432b3bd8caa9ffc";
    this.oauthURL = "https://slack.com/api/oauth.access?" +
      "client_id=" + this.client_id + "&" +
      "client_secret=" + this.client_secret + "&" +
      "code=" + this.code;
      console.log(this.oauthURL);
    this.http.get(this.oauthURL).subscribe((data: Token) => {
      this.databaseapi.setuser({
          id: 1,
          name: data.user.name,
          username:  data.user.real_name,
          password: "password",
          image: data.user.image_512,
          user_type: 0,
          remember_token: "none",
          slack_user_id: data.user.id,
          token: data.access_token,
          bot_acess_token: "none",
          web_hook_url: "none",
          created_at: "none",
          updated_at: "none",
          workspace_id: data.team.id,
          user_lists: "none",
          mytheme: 2,
        }).subscribe((user: SlackUser)=>{
          console.log("User created, ", user);
        });
      this.localstorageservice.storeOnLocalStorage(data.access_token, data.user.name, data.user.id,
        data.user.email, data.user.image_512, data.team.name, data.team.id);
      if (data != undefined) {
          this.router.navigate(['login']);
      }
    });
  }

  getusers() {
    this.userlistURL = "https://slack.com/api/users.list?token=" +
    "xoxp-667547175169-673428335556-708334579892-3a2090e4031a3d4095a2d60be9d07052";
    return this.http.get(this.userlistURL).pipe(map((docArray: any) => {
      return ({ members: docArray["members"] });
    }))
  }
}