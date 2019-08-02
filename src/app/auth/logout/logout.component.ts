import { Component, OnInit, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

const STORAGE_KEY = 'local_todolist';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,public router: Router) { }

  ngOnInit() {
  }


  logout(){
    this.storage.remove(STORAGE_KEY);
    this.router.navigate(['']);
  }

  back(){
    this.router.navigate(['']);
  }


}
