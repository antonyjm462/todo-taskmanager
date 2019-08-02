import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stop-parent]'
})
export class StopParentDirective {

  constructor() { }

  @HostListener("click",['$event'])
  @HostListener("mousedown",['$event'])
  public onClick(event: any) :void{
    event.stopPropagation();
  }
  public onMousedown(event: any) :void{
    event.stopPropagation();
  }


}
