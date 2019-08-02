import { Component, OnInit, Inject } from '@angular/core';
import { SlackserviceService } from 'src/app/slackservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceModuleService } from '../storage-service-module.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { DatabaseApiService } from '../database-api.service';

const STORAGE_KEY = 'local_todolist';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})

export class RedirectComponent implements OnInit {
  token: { access_token: any; scope: any; team_id: any; };
  userList: any;
  user: any;
  slack_user: void;

  constructor(public slackservice: SlackserviceService, private route: ActivatedRoute, public localstorageservice: StorageServiceModuleService, public router: Router
    , @Inject(LOCAL_STORAGE) private storage: StorageService, public databaseapi: DatabaseApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.user = this.storage.get(STORAGE_KEY);
      if (this.user == undefined) {
        this.slackservice.setcode(params.code);
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }
}
