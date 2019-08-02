import { Component, OnInit, Inject } from '@angular/core';
import { SlackserviceService } from 'src/app/slackservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { StorageServiceModuleService } from 'src/app/storage-service-module.service';

const STORAGE_KEY = 'local_todolist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any;

  constructor(public slackservice: SlackserviceService,private route: ActivatedRoute,public localstorageservice: StorageServiceModuleService,public router: Router
    ,@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.user = this.storage.get(STORAGE_KEY);
      if(this.user != undefined){
        this.router.navigate(['login']);
      }
  });

  }
  
  }
