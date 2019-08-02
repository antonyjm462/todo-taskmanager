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


export interface User {
  userid: string;
  name: string;
}

export interface priority{
  priority: any;
  priority_id: any;
}
export interface UserAssigned{
  tid:any;
  uid:any;
}
export interface Status{
  status: any;
  sid: any;
}

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.css']
})
export class SpacesComponent implements OnInit {

  // @ViewChild("modalTemplate", { static: true }) modalTemplate: TemplateRef<any>;
  @ViewChild("spaceTemplate", { static: true }) spaceTemplate: TemplateRef<any>;
  @ViewChild("listTemplate", { static: true }) listTemplate: TemplateRef<any>;
  @ViewChild("taskTemplate", { static: true }) taskTemplate: TemplateRef<any>;
  @ViewChild("descriptionTemplate", { static: true }) descriptionTemplate: TemplateRef<any>;
  @ViewChild("spaceEditTemplate", { static: true }) spaceEditTemplate: TemplateRef<any>;
  @ViewChild("listEditTemplate", { static: true }) listEditTemplate: TemplateRef<any>;
  @ViewChild("taskEditTemplate", { static: true }) taskEditTemplate: TemplateRef<any>;
  bottomSheetRef: any;
  task: FormGroup;
  spaceForm: FormGroup;
  formGroup: FormGroup;
  dialogRef: any;
  ProjectList: any;
  List: any;
  ListRef: any;
  lname: any;
  Tasks: any;
  pid: any;
  lid: any;
  tname: any;
  taskRef: any;
  description: any;
  comments: any;
  date: any;
  tid: any;
  new_task: any;
  prioritylist: priority[] = [
    {priority_id:"1",priority: "Low"},
    {priority_id:"2",priority: "Medium"},
    {priority_id:"3",priority: "High"}
  ]
  StatusList: Status[] = [
    
  ]
  task_assigned:any;
  uid: any;
  project: any;
  list: any;
  Task: any;
  dialogEditRef: any;
  ListEditRef: any;
  taskEditRef: any;
  priority_id: any;
  status: any;
  userList: any;

  

  constructor(private bottomSheet: MatBottomSheet,public dialog: MatDialog, private formBuilder: FormBuilder, 
    private firestore: AngularFirestore, private firebaseService: FirebaseService,public slackservice: SlackserviceService,
    @Inject(LOCAL_STORAGE) private storage: StorageService) { 
      this.ProjectList = null;
      this.getProjectList();
      this.getList()
      this.getTask()
      this.userList = this.storage.get(STORAGE_KEY);
      console.log(this.userList);
  }

  ngOnInit() {
    this.task = this.formBuilder.group({
      description: ['', Validators.required],
      comments: ['', Validators.required],
      priority: ['', Validators.required],
      duedate: ['', Validators.required],
   });
   this.spaceForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
   });
   this.formGroup = this.formBuilder.group({
    status: ['', Validators.required]
   })
  }

  getProjectList = () =>
  this.firebaseService
    .getItem("project")
    .subscribe((res: any) => (this.ProjectList = res));

  getList = () =>
    this.firebaseService
      .getItem("list")
      .subscribe((res: any) => (this.List = res));

  getTask = () =>
      this.firebaseService
        .getItem("task")
        .subscribe((res: any) => (this.Tasks = res));

  newSpace(): void {
    var space = new Project();
    space.name = this.spaceForm.get('name').value;
    space.description = this.spaceForm.get('description').value;
    this.firebaseService.createProject(space);
    this.spaceForm.patchValue({
      name: ' ',
      description: ' '
    });
  }

  newlist(): void{
    var list = new List()
    list.lname = this.lname;
    list.pid = this.pid;
    this.firebaseService.createList(list);
  }
  
  openDialog() {
    this.dialogRef = this.dialog.open(this.spaceTemplate, {
      width: '600px',
      height: '280px'
    });
  }

  opentask(lid) {
    this.lid = lid;
    this.taskRef = this.dialog.open(this.taskTemplate, {
      width: '900px',
      height: '100px'
    });
  }

  openList(pid) {
    this.pid = pid;
    this.ListRef = this.dialog.open(this.listTemplate, {
      width: '900px',
      height: '100px'
    });
  }

  onDelProject(val) {
    this.firebaseService.deleteProject(val);
  }

  onDelList(val) {
    this.firebaseService.deleteList(val);
  }

  onDelTask(val) {
    this.firebaseService.deleteTask(val);
  }

  // openBottomSheet(pid): void {
  //   this.pid = pid;
  //   this.bottomSheetRef = this.bottomSheet.open(this.modalTemplate);
  // }


  openDescription(task): void {
    this.new_task  = task;
    this.bottomSheetRef = this.bottomSheet.open(this.descriptionTemplate);
  }


  time: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event);
    this.time.push(`${event.value}`);
  }

  newtask(){
    var task = new Task()
    task.tname = this.tname;
    task.lid = this.lid;
    task.status = 1;
    this.firebaseService.createTask(task);
  }

  onSubmit(){
    this.description = this.task.get('description').value ;
    this.comments = this.task.get('comments').value ;
    var task_desc  = new Task();
    task_desc = this.new_task.data;
    task_desc.description = this.description;
    task_desc.comments = this.comments;
    this.firebaseService.updatetask(this.new_task.id,task_desc);
  }

  selectionChange(stepper){
    console.log(stepper.selectedIndex);
    this.status = stepper.selectedIndex + 1;
    this.Updatetask();
  }
  Updatetask(){
    var task_desc  = new Task();
    task_desc = this.new_task.data;
    if(this.description != undefined){
      task_desc.description = this.description;
    }
    if(this.comments != undefined){
      task_desc.comments = this.comments;
    }
    if(this.priority_id != undefined){
      task_desc.priority = this.priority_id;
    }
    if(this.date!= undefined){
      task_desc.duedate = this.date;
    }
    if(status != undefined){
      task_desc.status = this.status;
    }
    if(this.uid != undefined){
      task_desc.uid = this.uid;
    }
    if(this.pid != undefined){
      task_desc.pid = this.pid;
    }
    this.firebaseService.updatetask(this.new_task.id,task_desc);
}

onKeydown(event) {
  if (event.key === "Enter") {
    console.log(event);
    this.updatetask();
  }
}

EditProject(pid){
  this.project = pid;
  this.dialogEditRef = this.dialog.open(this.spaceEditTemplate, {
    width: '450px',
    height: '280px'
  });
}

EditList(lid){
  this.list = lid;
    this.ListEditRef = this.dialog.open(this.listEditTemplate, {
      width: '900px',
      height: '100px'
    });
}

EditTask(tid){
  this.Task = tid;
    this.taskEditRef = this.dialog.open(this.taskEditTemplate, {
      width: '900px',
      height: '100px'
    });
}
updatespace(){
  var space = new Project();
    space = this.project.data;
    space.name = this.spaceForm.get('name').value;
    space.description = this.spaceForm.get('description').value;
    this.firebaseService.updatespace(this.project.id,space);
    this.spaceForm.patchValue({
      name: ' ',
      description: ' '
    });
}
updatelist(){
  var list = new List();
    list = this.list.data;
    list.lname = this.lname;
    this.firebaseService.updatelist(this.list.id,list);
}
updatetask(){
  var task = new Task();
  task = this.Task.data;
  task.tname = this.tname;
  this.firebaseService.updatetask(this.Task.id,task);
}



}

