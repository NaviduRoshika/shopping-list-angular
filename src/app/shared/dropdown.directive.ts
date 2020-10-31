import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDIrective {
  @HostBinding('className') class: string = 'btn-group';
  @HostBinding('class.open') isOpen: boolean = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  //   @HostListener('click') mouseClicked() {
  //     this.class = 'btn-group open';
  //     this.backgroundColor = 'black';
  //   }

  //   @HostListener('mouseleave') mouseLeave() {
  //     this.class = 'btn-group';
  //   }

  @HostListener('click') mouseLeave() {
    this.isOpen = !this.isOpen;
  }
}
