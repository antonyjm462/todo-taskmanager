import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storage

const STORAGE_KEY = 'local_todolist';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceModuleService {

  currentUser: { access_token: any; name: any; id: any; email: any; image_512: any; teamname: any; teamid: any; };
  memberlist: any;
   constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { } 

   public storeOnLocalStorage(access_token: any,name: any,id: any,email: any,image_512: any,teamname:
     any,teamid: any): 
   void {

    // get array of tasks from local storage
    //const currentUser = this.storage.get(STORAGE_KEY) || []; 
             // push new task to array
    this.currentUser = {
      access_token: access_token,
      name: name,
      id: id,
      email: email,
      image_512: image_512,
      teamname: teamname,
      teamid: teamid,
    };          // insert updated array to local storage
    this.storage.set(STORAGE_KEY, this.currentUser);
    console.log("local storage"); 
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }


  public storeMembers(members: any): void{
    this.memberlist = members;          // insert updated array to local storage
    this.storage.set("members", this.memberlist);
    console.log(this.storage.get("members"));
  }
}
