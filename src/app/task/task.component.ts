import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: any;
  @ViewChild("modalTemplate", { static: true }) modalTemplate: TemplateRef<any>;
  bottomSheetRef: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private bottomSheet: MatBottomSheet,private formBuilder: FormBuilder) { 
    this.task="task1";
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      description: ['', Validators.required],
      comments: ['', Validators.required],
   });
   this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
   });
  }

  openBottomSheet(): void {
    this.bottomSheetRef = this.bottomSheet.open(this.modalTemplate);
  }

  time: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.time.push(`${event.value}`);
  }
}
